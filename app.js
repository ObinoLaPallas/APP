const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
const passport = require('./passport')
const indexCtr = require('./routes/authenticate/index');
const indexDta = require('./routes/addData/index');
const indexEdt = require('./routes/editData/index');
const app = express();

const PORT = process.env.PORT || 8080;
const log = console.log;
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config()

console.log(process.env.DB_USERNAME)

let options = {
  host: "127.0.0.1",
  user: 'root',
  password: '',
  database: 'cnote'
};
let sessionStore = new MySQLStore(options);
app.use(session({
  secret: 'nbvhstyzay467èyj6tygguzayé7hzahjza',
  resave: false,
  store : sessionStore,
  saveUninitialized: false,
  cookie: { maxAge: 900000 }
  // cookie : {secure : true}
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/data',indexDta);

app.use('/editData',indexEdt); // 

app.use('/authenticate',indexCtr);

app.listen(PORT , console.log('Listen on port ...',PORT))