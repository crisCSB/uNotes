
function appConfiguration(){
    
// Code to start express
this.express = require('express');
this.app = express();
this.port = process.env.PORT || 3000;

// Handling files (html-ejs pages, css styles )
app.set('view engine', 'ejs');


//set upp public directory to serve static files
app.use(express.static('public'));


//Cookie maneger
const cookieParser = require('cookie-parser')
app.use(cookieParser());

//Form data management code
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 


//MySql code
const conectionMySQL = require('mysql2');
  this.mySQL = conectionMySQL.createPool({
  host: "",
  user: "",
  password: "",
  database : ''
});
}


module.exports = appConfiguration 