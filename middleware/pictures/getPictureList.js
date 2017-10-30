var requireOption = require('../common').requireOption;

/**
 * Get the picture list and put the pictures on res.tpl.pictures
 */

module.exports = function (objectrepository) {

    var pictureModel = requireOption(objectrepository, 'pictureModel');

    return function (req, res, next) {

        return next();
    };

};
