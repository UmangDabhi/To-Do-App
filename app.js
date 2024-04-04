const express = require("express");
const bodyParser = require("body-parser");
const connectMongoDb = require("./init/mongodb");
const todoRoute = require("./route/todo");
const dotenv = require("dotenv");

dotenv.config();
// init app
const app = express();

//connect mongodb database
connectMongoDb();

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", todoRoute);

module.exports = app;