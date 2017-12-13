var expect = require('chai').expect;
var authMW = require('../../../middleware/generic/auth');

describe('auth MW', function () {
    it('should call next if the userid in the session exists', function (done) {

        var reqMock = {
            session: {
                userid: 'tester'
            }
        };
        authMW()(reqMock, {}, function () {
            done();
        });
    });
    it('should call res.redirect when userid = undefined', function (done) {

        var reqMock = {
            session: {
            }
        };
        var resMock = {
            redirect: function(newurl){
                expect(newurl).be.eql('/');
                done();
            }
        };
        authMW({})(reqMock, resMock, function () {
        });
    });
});