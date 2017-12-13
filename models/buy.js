var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Buy = db.model('Buy', {
    picture_id: String,
    user_id: String
});

module.exports = Buy;