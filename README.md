# nextjs-aws-poc

Having fun with serverless!

Based on this very helpful medium article:
- https://medium.com/@LinusU/deploying-a-next-js-app-to-aws-lambda-4dcdd233f876

## How to use this project

### Credentials
You need two type of credentials to make it work:
- an aws key
- a blizzard api key

You can create your account here:
- aws - https://aws.amazon.com/
- blizzard - https://dev.battle.net/

An get a key
- aws - https://console.aws.amazon.com/iam/home#/security_credential - Create New Access Key
- blizzard - https://dev.battle.net/apps/myapps

### Dependencies

The core of the project is build with Nextjs (https://nextjs.org/learn/basics/getting-started).

This project use scandium (https://www.npmjs.com/package/scandium) to package and deploy on aws.
Note that scandium requires docker (https://docs.docker.com/install/) to be installed.

### Deploy

Before deploying make sure your aws credential are correctly set on your machine (https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html).

Then execute:

````
scandium update --name=nextjs-aws-poc
````