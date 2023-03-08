// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const SentaRouter = require('./src/router');
const mailer = require("./src/mailer");

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

// http://expressjs.com/en/starter/basic-routing.html

app.use("/", SentaRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  mailer(15).start()
  console.log('Your app is listening on port ' + listener.address().port);
});
