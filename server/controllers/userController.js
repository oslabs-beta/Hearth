const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

//DATABASE

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  } 
});

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

let dbClient = DynamoDBDocument.from(ddbClient, translateConfig);

const TABLE_NAME = 'hearthUsers';


// CONTROLLER
const userController = {};

// SIGNUP CONTROLLER
userController.signUp = async (req, res, next) => {
  const { username, password, arn, region, externalId } = req.body;

  try {
    // query to db
    const encryptedPass =  await bcrypt.hash(password, SALT_WORK_FACTOR);

    const data = await dbClient.get({
      TableName: TABLE_NAME,
      Key: {
        username: req.body.username
      }
    });

    if (data.Item){
      throw new Error('Username already exists');
    }
    const result = await dbClient.put({
    Item: {
      username: req.body.username,
      password: encryptedPass,
      arn: req.body.arn,
      region: req.body.region,
      externalId: req.body.externalId
    },
    TableName: TABLE_NAME,
  });
    return next();
  } catch (err) {
      return next({
        log: `Error caught in userController.signUp: ${err}`,
        message: {err: 'An error occured while attempting to register a new user'}
      })
  }
}

// LOGIN CONTROLLER
userController.login = async (req, res, next) => {
   
  const { username, password } = req.body;

  try {
    // find by checking username
    const data = await dbClient.get({
      TableName: TABLE_NAME,
      Key: {
        username: req.body.username
      }
    });
    if (!data.Item) throw new Error('Username or Password is incorrect');
    // compare password given and in db
    const verified = await bcrypt.compare(password, data.Item.password);
    // if verified returns false throw error
    if (!verified) throw new Error('Username or Password is incorrect');
    const { arn, region, externalId } = data.Item;
    res.locals.data = {arn, region, externalId};
    return next();
  } catch (err) {
    return next({
      log: `Error caught in userController.login: ${err}`,
      message: {err: 'An error occured while attempting to login'}
    })
  }
}

module.exports = userController