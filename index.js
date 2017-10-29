var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('static'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function (req, res, next) { //redirect to the main page
    res.redirect("index.html");
});

app.get('/user/:userid', function (req, res, next) { //get information of the user from their id
    res.json({
        id: req.params.userid,
        name: "Sample Name",
        email: "Sample Email"
    });
});

app.get('/picture/:pictureid', function (req, res, next) { // get information of the picture from their id
    res.json({
        id: req.params.pictureid,
        name: "Sample Name",
        information: "Sample Information"
    });
});

app.post('/login', function(req, res, next){ // send login information
    if (typeof req.body.inputEmail !== 'undefined'){
        res.redirect("biddingSite.html");
    }
    next();
});


var server = app.listen(3000, function () {
    console.log("1.1.0");
});