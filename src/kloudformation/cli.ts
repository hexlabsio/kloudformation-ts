#!/usr/bin/env node
import { CloudFormation, S3 } from "aws-sdk";
import * as fs from 'fs';
const archiver = require('archiver');
const chalk = require('chalk');
require('ts-node').register();

const { Command } = require('commander');

const program = new Command();

function deleteCommand(): any {
  return program.command('delete <stackName>')
    .option('-r, --region <region>', 'The region to delete stack from', 'eu-west-1')
    .action(deleteStack)
}

function deployCommand(): any {
  return program.command('deploy <stackName> <templateLocation> [fileLocation]')
    .option('-r, --region <region>', 'The region to delete stack from', 'eu-west-1')
    .option('-c, --capabilities <capability...>', 'A space separated list of any of CAPABILITY_IAM, CAPABILITY_NAMED_IAM or CAPABILITY_AUTO_EXPAND', ["CAPABILITY_NAMED_IAM"])
    .option( '-f, --file <files...>', 'A space separated list of files to upload to s3')
    .option( '-b, --bucket <bucket>', 'The s3 bucket in which to upload files')
    .option( '-p, --prefix <prefix>', 'The s3 object key prefix in which to upload files')
    .option('-s, --stack-info <stacks...>', 'A space separated list of stacks to get outputs as environment variables')
    .action(deployStack)
}

function translateCommand(): any {
  return program.command('translate <templateLocation>')
  .option('-r, --region <region>', 'The region to delete stack from', 'eu-west-1')
  .option('-s, --stack-info <stacks...>', 'A space separated list of stacks to get outputs as environment variables')
  .action(generateStack)
}

(async () => {
  try {
    translateCommand();
    deployCommand();
    deleteCommand();
    await program.parseAsync(process.argv);
  } catch(e) {
    process.exit(1)
  }
})();


const terminalStatuses = ['CREATE_COMPLETE', 'CREATE_FAILED', 'DELETE_COMPLETE', 'DELETE_FAILED', 'ROLLBACK_COMPLETE', 'ROLLBACK_FAILED', 'UPDATE_COMPLETE', 'UPDATE_ROLLBACK_COMPLETE', 'UPDATE_ROLLBACK_FAILED'];
const badStatuses = ['CREATE_FAILED', 'DELETE_FAILED', 'ROLLBACK_COMPLETE', 'ROLLBACK_FAILED', 'UPDATE_ROLLBACK_COMPLETE', 'UPDATE_ROLLBACK_FAILED', 'UPDATE_ROLLBACK_IN_PROGRESS', 'DELETE_COMPLETE'];
const successStatuses = ['CREATE_COMPLETE', 'UPDATE_COMPLETE'];
const deleteSuccessStatuses = ['DELETE_COMPLETE'];

async function stackExists(cf: CloudFormation, name: string): Promise<CloudFormation.Stack | undefined> {
  const stacks = await cf.describeStacks().promise();
  if(stacks.Stacks) {
    return stacks.Stacks.find(it => it.StackName === name);
  }
}

async function deleteStack(stackName: string, command: any) {
  const region = command.region;
  const cf = new CloudFormation({region});
  let start = new Date().toISOString();
  
  try {
    const stack = await stackExists(cf, stackName);
     if(stack) {
       const deletion = cf.deleteStack({StackName: stackName.toString()}).promise();
       console.log(chalk.green(`Deleting stack named ${stackName} from ${region}`));
       const result = await deletion;
       if (result.$response.error) {
         console.log(chalk.red(result.$response.error));
       } else {
         if(!await followStackEvents(cf, stackName, deleteSuccessStatuses, start)) {
           process.exit(1);
         }
       }
    }
    console.log(chalk.yellow(`No stacks named ${stackName} in ${region} to delete`));
  } catch(e) {
    if(e.message.includes("does not exist")){
      console.log(chalk.green('Delete Complete'));
    } else {
      console.error(chalk.red('Delete failed due to the following error: ' + e.message));
    }
  }
}


async function setEnvsForStacks(stacks: string[], region: string) {
  const client = new CloudFormation({region});
  const cfStacks = await client.describeStacks().promise();
  const envs = stacks.reduce((envs, stack) => {
    console.log(chalk.green('Searching for stacks matching ' + stack));
    const matchedStack = (cfStacks.Stacks ?? []).find(it => !!it.StackName.match(stack) || !!it.StackId?.match(stack));
    if(matchedStack) {
      console.log(chalk.green('Matched ' + matchedStack.StackId));
      return (matchedStack.Outputs ?? []).reduce((envsWithOutputs, output) => ({
        ...envsWithOutputs,
        [output.OutputKey!]: output.OutputValue
      }), envs);
    } else {
      console.log(chalk.red('No stacks matched pattern ' + stack));
    }
    return envs;
  }, {})
  process.env = {...process.env, ...envs};
}

async function generateStack(templateLocation: string, command: any) {
  if (templateLocation.endsWith(".ts")) {
    console.log(chalk.green(`Translating template at ${templateLocation}`))
    const stacks: string[] = command.stackInfo ?? [];
    await setEnvsForStacks(stacks, command.region);
    require(templateLocation);
  }
}

async function deployStack(stackName: string, templateLocation: string, fileLocation: string, command: any) {
  try {
    if (templateLocation.endsWith(".ts")) {
      await generateStack(templateLocation, command)
      await deploy(command.region, stackName, fileLocation, command.capabilities, command.file, command.prefix, command.bucket);
    } else {
      await deploy(command.region, stackName, templateLocation, command.capabilities, command.file, command.prefix, command.bucket);
    }
  } catch(e) {
    console.error(chalk.red(e));
  }
}

function zipDirectory(source: string, target: string): Promise<void> {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(target);
  return new Promise((resolve, reject) => {
    archive
    .directory(source, false)
    .on('error', err => reject(err))
    .pipe(stream);
    stream.on('close', () => resolve());
    archive.finalize();
  });
}

async function upload(files: string[], prefix: string, bucket: string): Promise<string[]> {
  console.log(chalk.green('Uploading to S3'))
  const client = new S3();
  const dateTime = new Date().toISOString();
  const randomPart =  Math.floor(Math.random()*10000000);
  const key = `${prefix}${randomPart}-${dateTime}/`;
  return await Promise.all(files.map(async file => {
    const fileName = file.includes('/') ? file.substring(file.lastIndexOf('/') + 1): file;
    const keyName = `${key}${fileName}`;
    if(fs.lstatSync(fileName).isDirectory()) {
      console.log(chalk.green(`Zipping directory ${fileName}`));
      await zipDirectory(file, `${fileName}.zip`);
      console.log(chalk.green(`Uploading ${keyName}.zip to S3 bucket named ${bucket}`));
      await client.upload({
        ContentType: 'application/zip',
        Bucket: bucket,
        Key: keyName + '.zip',
        Body: fs.readFileSync(`${fileName}.zip`),
        ServerSideEncryption: 'AES256',
      }).promise();
      return keyName + '.zip';
    } else {
      console.log(chalk.green(`Uploading ${keyName} to S3 bucket named ${bucket}`));
      await client.upload({Bucket: bucket, Key: keyName, Body: fs.readFileSync(file)}).promise();
      return keyName;
    }
  }));
}

async function deploy(region: string, stackName: string, template: string, capabilities: string[], files: string[], prefix: string, bucket: string) {
  validateCapabilities(capabilities);
  const locations = (files && bucket) ? await upload(files, prefix ?? '', bucket) : [];
  const templateContent = fs.readFileSync(template ?? 'template.json');
  const cf = new CloudFormation({region});
  const stack = await stackExists(cf, stackName);
  let start = new Date().toISOString();
  console.log(chalk.green(`Deploying ${stackName}`))
  const parameters: CloudFormation.Parameter[] = (files && bucket) ? [
    { ParameterKey: 'CodeBucket', ParameterValue: bucket },
    ...locations.map((location, index) => ({ ParameterKey: 'CodeLocation' + (index > 0 ? index : ''), ParameterValue: location } ))
  ] : []
  console.log(chalk.green(`Passing the following parameters ${parameters.map(it => `${it.ParameterKey}:${it.ParameterValue}`).join(', ')}`))
  if(stack) {
    if(successStatuses.includes(stack.StackStatus)) {
      try {
        console.log(chalk.green(`Updating existing stack in region ${region} named ${stackName}`));
        const result = await cf.updateStack({ StackName: stackName, Capabilities: capabilities, TemplateBody: templateContent.toString(), Parameters: parameters }).promise();
        if (result.$response.error) {
          console.log(chalk.red(result.$response.error));
          process.exit(1);
        }
      } catch(e) {
        if(e.message.includes('No updates are to be performed')){
          console.log(chalk.yellow('No updates are to be performed'));
          return;
        } else {
          console.log(chalk.red(e.message))
          process.exit(1);
        }
      }
    } else {
      console.log(chalk.yellow(`The stack named ${stackName} is in state ${stack.StackStatus} and cannot be updated at this time. You may need to delete it before continuing.`));
      process.exit(1);
    }
  } else {
    console.log(chalk.green(`Creating stack in region ${region} named ${stackName}`));
    const result = await cf.createStack({ StackName: stackName, Capabilities: capabilities, TemplateBody: templateContent.toString(), Parameters: parameters }).promise();
    if (result.$response.error) {
      console.log(chalk.red(result.$response.error));
      process.exit(1);
    }
  }
  if(!await followStackEvents(cf, stackName, successStatuses, start)) {
    process.exit(1);
  }
}

async function wait(milliseconds: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function stackEvents(cf: CloudFormation, name: string, start: string): Promise<CloudFormation.StackEvent[]> {
  const events = (await cf.describeStackEvents({ StackName: name}).promise()).StackEvents;
  return events?.sort((a,b) => a.Timestamp.toString().localeCompare(b.Timestamp.toString())).filter(e => e.Timestamp.toISOString() > start) || [];
}

async function getInitialEvents(cf: CloudFormation, name: string, start: string) {
  let events: CloudFormation.StackEvent[] = [];
  while(events.length === 0) {
    await wait();
    let next = await stackEvents(cf, name, start);events.forEach(ev => console.log(ev));
    let startingPoint = next.reverse().find(ev => ev.ResourceType === 'AWS::CloudFormation::Stack' && !terminalStatuses.includes(ev.ResourceStatus!));
    if(startingPoint) {
      events = next.slice(events.findIndex(ev => ev.EventId === startingPoint!.EventId));
    }
  }
  return events;
}

async function followStackEvents(cf: CloudFormation, name: string, success: string[], start: string): Promise<boolean> {
  let events = await getInitialEvents(cf, name, start);
  while(true) {
    events.forEach(display);
    if(events.find(it => it.ResourceType === 'AWS::CloudFormation::Stack' && terminalStatuses.includes(it.ResourceStatus!))){
      return !!events.find(it => it.ResourceType === 'AWS::CloudFormation::Stack' && success.includes(it.ResourceStatus!));
    }
    await wait(5000);
    if(events.length > 0) start = events.pop()!.Timestamp.toISOString();
    events = await stackEvents(cf, name, start);
  }
}

function display(e: CloudFormation.StackEvent) {
  let color = badStatuses.includes(e.ResourceStatus!) ? chalk.red : (successStatuses.includes(e.ResourceStatus!) ? chalk.green : chalk.black);
  
  console.log(color(`${e.ResourceStatus?.padEnd(27)} ${e.LogicalResourceId} ${e.ResourceType} ${e.PhysicalResourceId} ${e.ResourceStatusReason || ''}`));
}

function validateCapabilities(capabilities: string[]) {
  const valid = ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"];
  if(!capabilities || capabilities.length === 0) {
    console.error(chalk.red("At least one capability must be provided"));
    process.exit(1);
  }
  const errors = [...valid.map(it => {
    if(capabilities.filter(c => c === it).length > 1) {
      return `${it} can only appear once`;
    }
    return null;
  }).filter(it => !!it),
  ...capabilities.filter(it => !valid.includes(it)).map(it => `${it} is not a valid capability`)
  ];
  if(errors.length > 0) {
    errors.forEach(it => console.error(chalk.red(it)));
    process.exit(1);
  }
}
