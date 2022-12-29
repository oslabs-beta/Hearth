const { CloudWatchClient, GetMetricStatisticsCommand, CloudWatch } = require("@aws-sdk/client-cloudwatch");
const { CloudWatchLogs } = require("@aws-sdk/client-cloudwatch-logs");
const { ControlPointSharp } = require("@mui/icons-material");
const { raw } = require("express");
const fetch = require('node-fetch');
const { format } = require("path");
const cloudWatchController = {};

cloudWatchController.getLogs = async (req, res, next) => {
  const client = new CloudWatchLogs({ region: req.query.region,
  credentials: res.locals.creds });
  const currentGroup = '/aws/lambda/'+ req.query.funcName;
  const allLogs = [];
  const searchParams = {
    logGroupName: currentGroup /* required */
  };
  try {
  const response = await client.describeLogStreams(searchParams);
  const streams = response.logStreams;
  for(let j = streams.length - 1; j >= streams.length - 6 && j >= 0; j--) {
    const currentStream = streams[j].logStreamName;
    console.log('Current Stream', currentStream);
    const params = {
      logGroupName: currentGroup, /* required */
      logStreamName: currentStream, /* required */
      startFromHead: true
    };
    try {
      const logs = await client.getLogEvents(params);
      console.log('Logs', logs)
      const events = logs.events;
      //reverse the events to put it from newest to oldest
      for(let i = events.length - 1; i >= 0; i--) {
        if(events[i].message.split(' ')[0] === 'REPORT') {
          allLogs.push(events[i]);
        }
      }
    } catch(err) {
      return next({
        log: `Error caught in cloudWatchController.getLogs: ${err}`,
        message: {err: 'An error occured while attempting to get logs'}
      })
    }
  }
  } catch(err) {
    return next({
      log: `Error caught in cloudWatchController.getLogs: ${err}`,
      message: {err: 'An error occured while attempting to get logs'}
    })
  }
  res.locals.logs = allLogs;
  return next();
};

cloudWatchController.formatLogs = (req, res, next) => {
  try {
    /*
  const dateObject = new Date(timestamp); //declare new data object
  const humanDataFormat = dateObject.toLocaleString('en-US', { timeZone: 'UTC' }); //convert to human-readable string
  return humanDataFormat
    */
  const formattedLogs = [];
  let rawLogs = res.locals.logs;
  for(let i = 0; i < rawLogs.length; i++) {
    const currentFormattedLog = {};
    const dateObject = new Date(rawLogs[i].timestamp); //declare new data object
    const formattedDate = dateObject.toLocaleString('en-US', { timeZone: 'UTC' }); //convert to human-readable string
    const splitDate = formattedDate.split(', ');
    currentFormattedLog.Time = splitDate[1];
    currentFormattedLog.Date = splitDate[0];
    //current log set everything
    //duration, billed duration, init duration
    //[REPORT RequestId: 46f43b92-21ac-40c7-a52d-885561fc0e2b, Duration: 10.42 ms, Billed Duration: 11 ms, Memory Size: 128 MB, Max Memory Used: 65 MB, Init Duration: 221.49 ms, \n],
    let splitReport = rawLogs[i].message.split('\t');
    splitReport.forEach(str => {
      if(str[0] === 'D') {
        let splitDuration = str.split(' ');
        currentFormattedLog.Duration = splitDuration[1];
      } else if(str[0] === 'B') {
        let splitBilled = str.split(' ');
        currentFormattedLog.BilledDuration = splitBilled[2];
      } else if(str[0] === 'I') {
        let splitInit = str.split(' ');
        currentFormattedLog.InitDuration = splitInit[2];
      } else if (str.split(' ')[0] === 'Max') {
        let splitMemUsed = str.split(' ')
        currentFormattedLog.MaxMemUsed = splitMemUsed[3];
      }
    });
    formattedLogs.push(currentFormattedLog);
  }
  res.locals.formattedLogs = formattedLogs;
  return next();
} catch(err) {
  return next({
    log: `Error caught in cloudWatchController.formatLogs: ${err}`,
    message: {err: 'An error occured while attempting to format logs'}
  })
}
}

cloudWatchController.getMetrics = async (req, res, next) => {
  const client = new CloudWatchClient({ region: process.env.AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    } });
    //const metricNames = ['Errors', 'ConcurrentExecutions', 'Invocations', 'Duration', 'Throttles', 'UrlRequestCount', 'ColdStarts'];
    //const datapointTypeNames = ['Average', 'Sum', 'Minimum', 'Maximum'];
  //this gets the daily invocations of function Example2 from 12/10 to current
  const input = {
    "StartTime": new Date('December 10, 2022 03:24:00'), // "10/27/2022, 12:00:00 AM"
    "EndTime": new Date(),
    "MetricName": "Invocations",
    "Namespace": "AWS/Lambda",
    "Period": 3600, //req.body.period (60, 300, 3600) ?
    "Statistics": ["Sum", "Maximum", "Minimum", "Average"], //req.body.statistics (should be an array)
    "Dimensions": [
      {
        "Name": "FunctionName",
        "Value": "Example2"
      }
    ]
  };

  const command = new GetMetricStatisticsCommand(input);
  try {
    const response = await client.send(command);
    res.locals.metrics = response;
    return next();
  } catch(err) {
    return next({
      log: `Error caught in cloudWatchController.getLogs: ${err}`,
      message: {err: 'An error occured while attempting to get logs'}
    })
  }
};

/*
cloudWatchController.getLogGroups = async (req, res, next) => {
  const client = new CloudWatch({ region: process.env.AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    } });

    const params = {
      Dimensions: [
        {
          Name: 'LogGroupName', //required
        },
      ],
      MetricName: 'IncomingLogEvents',
      Namespace: 'AWS/Logs'
    };
    try {
      const response = await client.listMetrics(params);
      let groupNames = [];
      const metrics = response.Metrics;
      metrics.forEach(metric => {
        current = metric.Dimensions;
        groupNames.push(current[0].Value);
      });
      res.locals.groups = groupNames;
      return next();
    } catch(err) {
      return next({
        log: `Error caught in cloudWatchController.getLogGroups: ${err}`,
        message: {err: 'An error occured while attempting to get log groups'}
      })
    }
};
*/

module.exports = cloudWatchController;