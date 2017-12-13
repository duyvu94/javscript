var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');
var updateUserMW = require('../middleware/user/updateUser');
var getUserMW = require('../middleware/user/getUser');
var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * Show current user's information
     */

    app.use('/user',
        authMW(objectRepository),
        getUserMW(objectRepository),
        renderMW(objectRepository, 'personaldata')
    );

    /**
     * Edit current user's information
     */

    app.use('/edituser',
        authMW(objectRepository),
        getUserMW(objectRepository),
        updateUserMW(objectRepository),
        renderMW(objectRepository, 'edituser')
    );


};

