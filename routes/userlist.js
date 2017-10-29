var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var getUserListMW = require('../middleware/users/getUserList');
var updateUserMW = require('../middleware/users/updateUser');
var getUserMW = require('../middleware/users/getUser');
var deleteUserMW = require('../middleware/users/getUser');
var userModel = {};

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * List all user
     */

    app.use('/users',
        authMW(objectRepository),
        getUserListMW(objectRepository),
        renderMW(objectRepository, 'users')
    );

    /**
     * Add new user
     */

    app.use('/users/new',
        authMW(objectRepository),
        updateUserMW(objectRepository),
        renderMW(objectRepository, 'newuser')
    );

    /**
     * Edit the user details
     */

    app.use('/users/:userid/edit',
        authMW(objectRepository),
        getUserMW(objectRepository),
        updateUserMW(objectRepository),
        renderMW(objectRepository, 'newuser')
    );

    /**
     * Delete user
     * - then redirect to /users
     */

    app.use('/users/:userid/delete',
        authMW(objectRepository),
        getUserMW(objectRepository),
        deleteUserMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/users');
        }
    );

};

