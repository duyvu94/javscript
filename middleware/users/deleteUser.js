var requireOption = require('../common').requireOption;

/**
 * Delete the user object
 */

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        return next();
    };

};
