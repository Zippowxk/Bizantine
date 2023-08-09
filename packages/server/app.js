var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.set('views', path.join(__dirname, './views'));

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);



module.exports = app;
