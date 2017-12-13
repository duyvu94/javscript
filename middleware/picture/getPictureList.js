var requireOption = require('../common').requireOption;

/**
 * Get the picture list and put the pictures on res.tpl.pictures
 */

module.exports = function (objectrepository) {

    var pictureModel = requireOption(objectrepository, 'pictureModel');

    return function (req, res, next) {

        pictureModel.find({

        }, function (err, results) {
            if (err) {
                return next(new Error('Error getting pictures'));
            }

            res.tpl.pictures = results;
            return next();
        });
    };

};
