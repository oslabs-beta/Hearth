const path = require('path');
const express = require('express');

// SERVER SET UP
const app = express();
const PORT = 3000;

// REQUIRE ROUTERS
const userRouter = require(path.join(__dirname, './routes/userRouter.js'));
const awsRouter = require(path.join(__dirname, './routes/awsRouter.js'));
const cloudWatchRouter = require(path.join(__dirname, './routes/cloudWatchRouter.js'));

// PARSE REQUESTS
app.use(express.json());

// ROUTER ROUTES
app.use('/user', userRouter);
app.use('/aws', awsRouter);
app.use('/cloud', cloudWatchRouter);

// SERVE STATIC FILES
app.use('/build', express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// UNDEFINED ROUTE HANDLER
app.use('/', (req, res) => {
  res.status(404).send('Invalid route endpoint');
});


// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const errObj = {
    log: 'Global error handler invoked',
    status: 400,
    message: err
  };
  return res.status(errObj.status).json(errObj);
})


// LISTEN ON PORT
app.listen(PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT: ${PORT}`)
});

module.exports = app;