var mainRedirectMW = require('../middleware/generic/mainRedirect');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var renderMW = require('../middleware/generic/render');
var authMW = require('../middleware/generic/auth');
var logoutMW = require('../middleware/generic/logout');
var getPictureListMW = require('../middleware/picture/getPictureList');
var userModel = require('../models/user');
var pictureModel = require('../models/picture');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel,
        pictureModel: pictureModel
    };

    /**
     * Main page
     */
    app.get('/',
        mainRedirectMW(objectRepository)
    );

    /**
     * Bidding page
     */
    app.get('/main',
        authMW(objectRepository),
        getPictureListMW(objectRepository),
        renderMW(objectRepository, 'main')
    );

    /**
     * Login and Registration page
     */
    app.use('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    /**
     * Main page
     */
    app.get('/logout',
        logoutMW(objectRepository),
        function(req, res, next) {
            res.redirect('/');
        }
    );

};
