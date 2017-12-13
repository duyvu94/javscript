var requireOption = require('../common').requireOption;

/**
 * Get the picture for the picture param
 *  - if there is no such picture, redirect to /picture
 *  - if there is one, put it on res.tpl.picture
 */

module.exports = function (objectrepository) {

    var pictureModel = requireOption(objectrepository, 'pictureModel');

    return function (req, res, next) {
        pictureModel.findOne({
            _id: req.param('pictureid')
        }, function (err, result) {
            if ((err) || (!result)) {
                return res.redirect('/pictures');
            }

            res.tpl.picture = result;
            res.tpl.picture.date = result.deadline.toISOString().substring(0, 10);

            return next();
        });

    };

};
