const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parser application/json
app.use(bodyParser.json());

// Static Files
app.use(express.static("public"));

// Templating Engine
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Connection Pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//Connect to DB
pool.getConnection((err, connection) => {
  if (err) throw err; // not connected
  console.log("Connected As ID" + connection.threadId);
});

// Router
// const routes = require("./server/routes/user");
// app.use("/", routes);
// const routes1 = require("./server/routes/classes");
// app.use("/view-classes", routes1);
const indexRouter = require("./server/routes/user");

app.use("/", indexRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));