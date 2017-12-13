var requireOption = require('../common').requireOption;

/**
 * Create (or update) picture if we have the data for it
 * update if we have a res.tpl.picture, create if we don't have
 *  - if there is no title, set tpl.error
 *  - if everything is ok redirect to /picture/:pictureid
 */

module.exports = function (objectrepository) {

    var pictureModel = requireOption(objectrepository, 'pictureModel');

    return function (req, res, next) {

        if ((req.body.submit === 'Delete picture') && (typeof res.tpl.picture !== 'undefined')){
            res.tpl.picture.remove(function (err) {
                if (err) {
                    return next(err);
                }
            });
            return res.redirect('/pictures');

        }

        if ((typeof req.body.name === 'undefined') ||
           (typeof req.body.description === 'undefined')) {
            return next();
        }

        if (req.body.name === '' || req.body.description === '' || req.body.deadline === '' || req.body.price === ''){
            res.tpl.error.push('Not enough parameters!');
            return next();
        }

        var picture = undefined;
        if (typeof res.tpl.picture !== 'undefined') {
            picture = res.tpl.picture;
        } else {
            picture = new pictureModel();
        }
        picture.name = req.body.name;
        picture.description = req.body.description;
        picture.deadline = req.body.deadline;
        picture.price = req.body.price;

        picture.save(function (err, result) {
            if (err) {
                return next(err);
            }
        });

        return res.redirect('/pictures');
    };
};
