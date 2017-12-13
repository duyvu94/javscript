var requireOption = require('../common').requireOption;

/**
 * This middleware loads the user from model and checks the credentials,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        if (typeof req.body === 'undefined') {
            return next();
        }


        if (req.body.submit === 'Log In') { //login

            if (req.body.username === '') {
                res.tpl.error.push('Please type your email!');
                return next();
            }

            if (req.body.username === '') {
                res.tpl.error.push('Please type your password!');
                return next();
            }

            //lets find the user
            userModel.findOne({
                email: req.body.email
            }, function (err, result) {
                if ((err) || (!result)) {
                    res.tpl.error.push('Your email address is not registered!');
                    return next();
                }

                //check password
                if (result.password !== req.body.password) {
                    res.tpl.error.push('Wrong password!');
                    return next();
                }

                //login is ok, save id to session
                req.session.userid = result._id;

                //redirect to / so the app can decide where to go next
                return res.redirect('/');
            });
        }
        else if (req.body.submit === 'Register Now'){                                           //register
            //lets find the user
            userModel.findOne({
                email: req.body.email
            }, function (err, result) {

                if ((err) || (result !== null)) {
                    res.tpl.error.push('Your email address is already registered!');
                    return next();
                }

                if (req.body.username.length < 3) {
                    res.tpl.error.push('The username should be at least 3 characters!');
                    return next();
                }

                if (req.body.password !== req.body.confirm_password) {
                    res.tpl.error.push('Password does not match!');
                    return next();
                }

                //create user
                var newUser = new userModel();
                newUser.name = req.body.username;
                newUser.email = req.body.email;
                newUser.password = req.body.password;
                newUser.save(function (err) {
                    //redirect to /login
                    return res.redirect('/login');
                });
            });
        }
        else return next();
    };

};