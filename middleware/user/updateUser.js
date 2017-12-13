var requireOption = require('../common').requireOption;

/**
 * Create (or update) user if we have the data for it
 * update if we have a res.tpl.inventory, create if we don't have
 *  - if there is no title, set tpl.error
 *  - if everything is ok redirect to /users/:userid
 */

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.email === 'undefined')) {
            return next();
        }

        if (req.body.name === '' || req.body.email === '' || req.body.password === '' || req.body.confirmpassword === ''){
            res.tpl.error.push('Not enough parameters!');
            return next();
        }

        if (req.body.password !== req.body.confirmpassword){
            res.tpl.error.push('Password doesn\'t match!');
            return next();
        }


        var user = res.tpl.user;

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function (err, result) {
            if (err) {
                return next(err);
            }
        });

        return res.redirect('/user');
    };

};
