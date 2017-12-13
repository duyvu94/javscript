var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User', {
    name: String,
    email: String,
    password: String,
    is_admin: Boolean
});

module.exports = User;