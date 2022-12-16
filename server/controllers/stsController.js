const {STSClient, AssumeRoleCommand} = require("@aws-sdk/client-sts");
const dotenv = require('dotenv');
dotenv.config();

const stsController = {};

stsController.getCreds = async (req, res, next) => {
  const creds = {
      region: 'us-west-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    }
    
  const stsClient = new STSClient(creds)

  const params = {
      RoleArn: req.query.arn,
      RoleSessionName:"Hearth_Session",
      ExternalId: req.query.externalId
  }
    // console.log(params)
  try {          

    const command = new AssumeRoleCommand(params);
    const data = await stsClient.send(command);
    // console.log(data.Credentials);
    roleCreds = {
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken
    };
    // console.log(roleCreds)
    res.locals.creds = roleCreds;
    return next();
  } catch (err) {
      return next({
          log: `error occurred in stsController.getCreds: ${err}`,
          message: 'An error occurred while attemping to get credentials in stsController'
      })
  }
}


module.exports = stsController;