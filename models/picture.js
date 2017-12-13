var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Picture = db.model('Picture', {
    name: String,
    description: String,
    deadline: Date,
    price: Number,
    owner_name: String
});

module.exports = Picture;