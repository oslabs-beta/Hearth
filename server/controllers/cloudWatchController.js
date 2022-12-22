const { CloudWatchClient, GetMetricStatisticsCommand, CloudWatch } = require("@aws-sdk/client-cloudwatch");
const { CloudWatchLogs } = require("@aws-sdk/client-cloudwatch-logs");
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
    logGroupName: currentGroup, /* required */
    limit: 5
  };
  try {
  const response = await client.describeLogStreams(searchParams);
  const streams = response.logStreams;
  for(let j = 0; j < streams.length; j++) {
    const currentStream = streams[j].logStreamName;
    const params = {
      logGroupName: currentGroup, /* required */
      logStreamName: currentStream /* required */
    };
    try {
      const logs = await client.getLogEvents(params);
      const events = logs.events;
      events.forEach(event =>{
        allLogs.push(event.message);
      });
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
  try{
  const formattedLogs = [];
  let rawLogs = res.locals.logs;
  let currentFormattedLog;
  for(let i = 0; i < rawLogs.length; i++) {
    if(/^\d$/.test(rawLogs[i][0])) {
      let splitLog = rawLogs[i].split(' ');
      currentFormattedLog = {};      
      //const before_ = str.substring(0, str.indexOf('_'));
      //take up to the T as the date
      let date = splitLog[0].substring(0, splitLog[0].indexOf('T'));
      //take after the T as the time
      let time = splitLog[0].substring(splitLog[0].indexOf('T') + 1, splitLog[0].indexOf('.'));
      //current log equals currentFormattedLog
      currentFormattedLog.Time = date + " " + time;
    } else if(rawLogs[i][0] === 'R') {
      //current log set everything
      //duration, billed duration, init duration
      //[REPORT RequestId: 46f43b92-21ac-40c7-a52d-885561fc0e2b, Duration: 10.42 ms, Billed Duration: 11 ms, Memory Size: 128 MB, Max Memory Used: 65 MB, Init Duration: 221.49 ms, \n],
      let splitReport = rawLogs[i].split('\t');
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