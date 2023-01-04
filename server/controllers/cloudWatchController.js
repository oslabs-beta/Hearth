const { CloudWatchClient, GetMetricStatisticsCommand, CloudWatch } = require("@aws-sdk/client-cloudwatch");
const { CloudWatchLogs } = require("@aws-sdk/client-cloudwatch-logs");
const { ControlPointSharp } = require("@mui/icons-material");
const { raw } = require("express");
const fetch = require('node-fetch');
const { format } = require("path");

const cloudWatchController = {};

// gets logs reports in a raw format to be processed by the format logs function
cloudWatchController.getLogs = async (req, res, next) => {
  const client = new CloudWatchLogs({ region: req.query.region,
  credentials: res.locals.creds });
  const currentGroup = '/aws/lambda/'+ req.query.funcName;
  const allLogs = [];
  const searchParams = {
    logGroupName: currentGroup /* required */
  };
  try {
    // this request gets all log streams for a given function
    const response = await client.describeLogStreams(searchParams);
    const streams = response.logStreams;
    // only get the most recent 6 log streams in order to not get too much data
    for(let j = streams.length - 1; j >= streams.length - 6 && j >= 0; j--) {
      const currentStream = streams[j].logStreamName;
      const params = {
        logGroupName: currentGroup, /* required */
        logStreamName: currentStream, /* required */
        startFromHead: true
    };
    try {
      // this request gets all logs for the the from the given log stream
      const logs = await client.getLogEvents(params);
      const events = logs.events;
      // reverse the events to put it from newest to oldest
      // only gives the report logs with the necessary information for formatting
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

// grabs the different metrics from the logs
cloudWatchController.formatLogs = (req, res, next) => {
  try {
    const formattedLogs = [];
    let rawLogs = res.locals.logs;
    for(let i = 0; i < rawLogs.length; i++) {
      const currentFormattedLog = {};
      const dateObject = new Date(rawLogs[i].timestamp); //declare new data object
      const formattedDate = dateObject.toLocaleString('en-US', { timeZone: 'UTC' }); //convert to human-readable string
      const splitDate = formattedDate.split(', ');
      currentFormattedLog.Time = splitDate[1];
      currentFormattedLog.Date = splitDate[0];
      let splitReport = rawLogs[i].message.split('\t');
      splitReport.forEach(str => {
        if(str[0] === 'D') { //Duration
          let splitDuration = str.split(' ');
          currentFormattedLog.Duration = splitDuration[1];
        } else if(str[0] === 'B') { //Billed Duration
          let splitBilled = str.split(' ');
          currentFormattedLog.BilledDuration = splitBilled[2];
        } else if(str[0] === 'I') { //Init Duration (if applicable)
          let splitInit = str.split(' ');
          currentFormattedLog.InitDuration = splitInit[2];
        } else if (str.split(' ')[0] === 'Max') { //Max Mem Used
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

module.exports = cloudWatchController;