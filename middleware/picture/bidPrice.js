var requireOption = require('../common').requireOption;

/**
 * bid the price of the picture
 * update person who pays the highest price
 *  - if it is expired, set tpl.error
 *  - if everything is ok redirect to /pictures
 */

module.exports = function (objectrepository) {

    var pictureModel = requireOption(objectrepository, 'pictureModel');

    return function (req, res, next) {

        if (Date.now() > res.tpl.picture.deadline){
            res.tpl.error.push('You cannot bid because of the expiration!');
            return next();
        }

        res.tpl.picture.price += 1000;
        res.tpl.picture.owner_name = res.tpl.user.name;
        res.tpl.picture.save(function (err, result) {
            if (err) {
                return next(err);
            }
        });
        return next();
    };

};
