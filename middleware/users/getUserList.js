var requireOption = require('../common').requireOption;

/**
 * Get the user list and put the inventories on res.tpl.users
 */

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        return next();
    };

};
