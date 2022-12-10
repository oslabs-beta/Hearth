import { APIGatewayClient, CreateApiKeyCommand, GetRestApisCommand } from "@aws-sdk/client-api-gateway";
import { LambdaClient, GetFunctionUrlConfigCommand, AddLayerVersionPermissionCommand, ListFunctionsCommand } from "@aws-sdk/client-lambda";
import * as AWS from "@aws-sdk/client-api-gateway";
import * as React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {STSClient, AssumeRoleCommand} from "@aws-sdk/client-sts";
import {defaultProvider} from "@aws-sdk/credential-provider-node";
// import {stsClient} from "./libs/stsClient.js";
// import {fromEnv} from "@aws-sdk/credential-provider-env";
import * as dotenv from 'dotenv'
// dotenv.config();
// fromEnv()

const Main = () => {
  const [funcs, setFuncs] = useState([]);
  // const [arn, setArn] = useState('');
  const [externalId, setExternalId] = useState(`${uuidv4()}`)
  let arn;

  const creds = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  }

  const stsClient = new STSClient(creds)

  const getCreds = async () => {
    const params = {
      RoleArn: arn,
      RoleSessionName: "Hearth_Session",
      ExternalId: '975eec8a-f162-4a63-93aa-f5383dac386c'
    }
    console.log(params)
    const command3 = new AssumeRoleCommand(params);
    const data = await stsClient.send(command3);
    return data.Credentials
    const roleCreds = {
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
    }
    console.log(roleCreds)
  }

  // connecting lambda
  const client = new LambdaClient({ region: "us-west-1" });

  const input = {
    /** input parameters */
    FunctionName: 'arn:aws:lambda:us-west-1:927652195238:function:Example3'
  };
  
  const command = new GetFunctionUrlConfigCommand(input);
  const command2 = new ListFunctionsCommand({});
  
  const gateway = () => {
    client.send(command)
      .then((data) => {
        // process data.
        fetch(data.FunctionUrl)
        .then(data => data.json())
        .then(data => console.log(data));
      })
      .catch((error) => {
        // error handling.
        console.log('error');
      });
  }

  const getFuncs = () => {
    client.send(command2) 
      .then((data) => {
        const newFunc = data.Functions.map(obj => {
          const funcs: { Name: string, Arn: string } = { Name: obj.FunctionName, Arn : obj.FunctionArn }
          return funcs
        })
        setFuncs(newFunc)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const render = [];
  funcs.forEach(el => {
    render.push(<div>{el.Arn}</div>)
  })

  function handleSubmit (event) {
    event.preventDefault();
    console.log(event.target[0].value);
    arn = event.target[0].value
    // setArn(event.target[0].value)
  }


  return (
    <div>
      <a href={`https://us-west-1.console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/create/review?templateURL=https://s3-us-west-1.amazonaws.com/cf-templates-29uosuh8qcp6-us-west-1/202234320s-HearthDelegationRolexy3errkxv8q&stackName=Hearth-Stack&param_ExternalId=${externalId}`} >
      {/* <button onClick={getFuncs}></button> */}
      <button>Open Link</button>
      </a>
      <form onSubmit={(e) => {handleSubmit(e); getCreds()}}>
        <input type="text" name='arn' placeholder= "insert ARN here"></input>
        <button type="submit">Submit</button>
      </form>
      {render}
    </div>

  )
}

  
export default Main;