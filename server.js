// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const SentaRouter = require('./src/router/sentaRouter');
const Sender = require("./src/service/mailService");
const MailJob = require("./src/job/mailJob");
const commonError = require("./src/utils/errorHandler").commonError

app.use(bodyParser());
app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use('/js', express.static(`${__dirname}public/js`));
app.use('/css', express.static(`${__dirname}public/css`));


app.set('views', __dirname + '/views');
app.set('view engine', 'pug')

app.use("/", SentaRouter);

app.use(commonError);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  new MailJob(15, Sender).start();
  console.log('Your app is listening on port ' + listener.address().port);
});
