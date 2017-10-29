var requireOption = require('../common').requireOption;

/**
 * Get the picture for the picture param
 *  - if there is no such picture, redirect to /pictures
 *  - if there is one, put it on res.tpl.picture
 */

module.exports = function (objectrepository) {

    var pictureModel = requireOption(objectrepository, 'pictureModel');

    return function (req, res, next) {

        return next();
    };

};
