var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var getPictureListMW = require('../middleware/picture/getPictureList');
var getPersonalPicturesListMW = require('../middleware/picture/getPersonalPicturesList');
var getPictureMW = require('../middleware/picture/getPicture');
var updatePictureMW = require('../middleware/picture/updatePicture');
var deletePictureMW = require('../middleware/picture/deletePicture');
var getUserMW = require('../middleware/user/getUser');
var bidPriceMW = require('../middleware/picture/bidPrice');
var pictureModel = require('../models/picture');
var userModel = require('../models/user');

module.exports = function (app, upload, path) {

    var objectRepository = {
        pictureModel: pictureModel,
        userModel: userModel
    };

    /**
     * List all pictures
     */

    app.use('/pictures',
        authMW(objectRepository),
        getPictureListMW(objectRepository),
        renderMW(objectRepository, 'pictureslist')
    );

    /**
     * List all personal pictures
     */

    app.use('/personalpictures',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getPersonalPicturesListMW(objectRepository),
        renderMW(objectRepository, 'personalpictureslist')
    );

    /**
     * Create new picture
     */

    app.use('/picture/new',
        authMW(objectRepository),
        updatePictureMW(objectRepository),
        function (req, res, next) {
            upload(req, res, function (err) {
                if (err) {
                    return next(err);
                }
            });
            return next();
        },
        renderMW(objectRepository, 'editpicture')
    );

    /**
     * Edit the picture details
     */

    app.use('/picture/:pictureid/editinfo',
        authMW(objectRepository),
        getPictureMW(objectRepository),
        updatePictureMW(objectRepository),
        renderMW(objectRepository, 'editpicture')
    );

    /**
     * Edit the image
     */

    app.use('/picture/:pictureid/editimage',
        authMW(objectRepository),
        getPictureMW(objectRepository),
        renderMW(objectRepository, 'editImage')
    );

    app.use('/picture/:pictureid/uploadimage',
        authMW(objectRepository),
        function (req, res, next){
            upload(req, res, function (err) {
                if (err){
                    return next(err);
                }

            });
            return res.redirect("/pictures");
        }
    );

    /**
     * Bid picture
     * - then redirect to /pictures
     */

    app.use('/picture/:pictureid/bid',
        authMW(objectRepository),
        getPictureMW(objectRepository),
        getUserMW(objectRepository),
        bidPriceMW(objectRepository),
        function (req, res, next) {
            if (typeof res.tpl.error === "undefined" || ( typeof res.tpl.error !== "undefined" && res.tpl.error.length === 0))
                return res.redirect('/pictures');
            return next();
        },
        getPictureListMW(objectRepository),
        renderMW(objectRepository, 'pictureslist')

    );

    /**
     * Delete picture
     * - then redirect to /picture
     */

    app.use('/picture/:pictureid/delete',
        authMW(objectRepository),
        getPictureMW(objectRepository),
        deletePictureMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/pictures');
        }
    );

};
