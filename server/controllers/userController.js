import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
require('dotenv').config();
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//DATABASE
let dbClient = new DynamoDBDocumentClient({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})
const TABLE_NAME = 'hearthUsers';

// CONTROLLER
const userController = {};

// SIGNUP CONTROLLER
userController.signUp = async (req, res, next) => {
  const { username, password, arn, region, externalId } = req.body;

  try {
    // query to db
    const result = await dbClient.put({
    Item: {
      username: req.body.username,
      //ENCRYPT PASSWORD FIRST THEN ADD PASSWORD,
      //ADD EXTERNAL ID,
      //ADD REGION
      arn: req.body.arn
    },
    TableName: TABLE_NAME,
  }).promise();
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
    }).promise();

    //ADD CODE TO check if the req.body.password is the same after encrypting as the stored password
    
    if (!data) throw new Error('Username or Password is incorrect');
    // compare password given and in db
    const verified = await bcrypt.compare(password, data.password);
    // if verified returns false throw error
    if (!verified) throw new Error('Username or Password is incorrect');
    const { arn, region, externalId } = data
    res.locals.info = {arn, region, externalId};
    return next();
  } catch (err) {
    return next({
      log: `Error caught in userController.login: ${err}`,
      message: {err: 'An error occured while attempting to login'}
    })
  }
}

module.exports = userController