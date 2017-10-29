var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var getPictureListMW = require('../middleware/picture/getPictureList');
var getPictureMW = require('../middleware/picture/getPicture');
var getEmployeeListMW = require('../middleware/employees/getEmployeeList');
var updatePictureMW = require('../middleware/picture/updatePicture');
var deletePictureMW = require('../middleware/picture/deletePicture');
var pictureModel = {};
var employeeModel = {};

module.exports = function (app) {

    var objectRepository = {
        pictureModel: pictureModel,
        employeeModel: employeeModel,
    };

    /**
     * List all picture
     */

    app.use('/pictures',
        authMW(objectRepository),
        getPictureListMW(objectRepository),
        renderMW(objectRepository, 'picture')
    );

    /**
     * Create new picture
     */

    app.use('/picture/new',
        authMW(objectRepository),
        updatePictureMW(objectRepository),
        renderMW(objectRepository, 'newpicture')
    );

    /**
     * Edit the picture details
     */

    app.use('/picture/:pictureid/edit',
        authMW(objectRepository),
        getPictureMW(objectRepository),
        updatePictureMW(objectRepository),
        renderMW(objectRepository, 'newpicture')
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
            return res.redirect('/picture');
        }
    );

};
