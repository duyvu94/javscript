var requireOption = require('../common').requireOption;

/**
 * Delete the picture object
 */

module.exports = function (objectrepository) {

    var pictureModel = requireOption(objectrepository, 'pictureModel');

    return function (req, res, next) {

        return next();
    };

};
