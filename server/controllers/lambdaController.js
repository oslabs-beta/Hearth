const { LambdaClient, GetFunctionUrlConfigCommand, AddLayerVersionPermissionCommand, ListFunctionsCommand } = require("@aws-sdk/client-lambda");

const lambdaController = {};

lambdaController.getFuncs = (req, res, next) => {
  // console.log(res.locals.creds, 'getFuncs');
  const client = new LambdaClient({ credentials: res.locals.creds, region: "us-west-1" });
  
  const command2 = new ListFunctionsCommand({});

  client.send(command2) 
    .then((data) => {
      const newFunc = data.Functions.map(obj => {
        const funcs = { Name: obj.FunctionName, Arn : obj.FunctionArn }
        return funcs
      })
      res.locals.funcs = newFunc;
      return next();
    })
    .catch((error) => {
        return next({
            log: `error occurred in lambdaController.getFuncs: ${error}`,
            message: 'An error occurred while attemping to get functions in lambdaController.getFuncs'
        })
    })
}

lambdaController.invokeFuncs = (req, res, next) => {
  res.locals.funcs.forEach((el) => {
    if (el.Name === req.body.name) {
      const input = {
        /** input parameters */
        FunctionName: `${el.Arn}`
      };
      const command = new GetFunctionUrlConfigCommand(input);
      client.send(command)
        .then((data) => {
          // process data.
          //grab functionURL to obtain function name and ARN
          fetch(data.FunctionUrl)
          .then(data => data.json())
          .then(data => console.log(data));
          return next();
        })
        .catch((error) => {
          // error handling.
          return next({
            log: `error occurred in lambdaController.invokeFuncs: ${error}`,
            message: 'An error occurred while attemping to invoke function in lambdaController.invokeFuncs'
        })
        });
    }
  })
  
}


module.exports = lambdaController;