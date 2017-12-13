var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');

var app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    },
    resave: true,
    saveUninitialized: false
}));

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        var url = req.baseUrl.split("/");
        cb(null, url[2] );

    }
});

var upload = multer({
    storage: storage

}).single('imgUploader');

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];

    return next();
});

require('./routes/userlist')(app);
require('./routes/picturelist')(app, upload, path);
require('./routes/outside')(app);

app.use(function (err, req, res, next) {
    res.status(500).send('Problem happens!');

    //Flush out the stack to the console
    console.error(err.stack);
});

var server = app.listen(3000, function () {
    console.log('Hello :3000');
});
