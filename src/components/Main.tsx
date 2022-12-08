import { APIGatewayClient, CreateApiKeyCommand, GetRestApisCommand } from "@aws-sdk/client-api-gateway";
import { LambdaClient, GetFunctionUrlConfigCommand, AddLayerVersionPermissionCommand  } from "@aws-sdk/client-lambda";
import * as AWS from "@aws-sdk/client-api-gateway";
import * as React from 'react';

const Main = () => {
    const client = new LambdaClient({ credentials: { accessKeyId: "AKIA5P7DBFOTL575L7BC" , secretAccessKey: "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"}, region: "us-west-1" });

    const input = {
      /** input parameters */
      FunctionName: 'arn:aws:lambda:us-west-1:927652195238:function:Example3'
    };
    
    const command = new GetFunctionUrlConfigCommand(input);
    
    const gateway = () => {
      client.send(command)
      //   .createApiKey(params)
        .then((data) => {
          // process data.
          console.log(data.FunctionUrl);
          fetch(data.FunctionUrl)
          .then(data => data.json())
          .then(data => console.log(data));
        })
        .catch((error) => {
          // error handling.
          console.log('error');
        });
    }
    return (
      <button onClick={gateway}>hi</button>
    )
}

  
export default Main;