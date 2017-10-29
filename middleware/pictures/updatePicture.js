var requireOption = require('../common').requireOption;

/**
 * Create (or update) picture if we have the data for it
 * update if we have a res.tpl.picture, create if we don't have
 *  - if there is no title, set tpl.error
 *  - if everything is ok redirect to /pictures/:pictureid
 */

module.exports = function (objectrepository) {

    var pictureModel = requireOption(objectrepository, 'pictureModel');

    return function (req, res, next) {

        return next();
    };

};
