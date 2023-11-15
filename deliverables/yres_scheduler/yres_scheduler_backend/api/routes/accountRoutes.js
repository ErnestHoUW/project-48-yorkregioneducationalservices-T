/**
 * This module specifies the routes for request endpoints in the account Service.
 * 
 * @param {Object} [app] The express application
 * 
 * @module api/routes/accountRoutes
 * @requires api/controllers/accountController
 * @requires api/middleware/errorHandler
 * @requires api/middleware/authHandler
 */

const accountController = require('../controllers/accountController');

const accountRoutes = (app) => {

    /**
     * Route serving 'Login Admin User' request.
     * @name post/account/login
     * @function
     * @memberof module:api/routes/accountRoutes
     * @inner
     * @param {string} path - Endpoint path
     * @param {callback} middleware - Endpoint middleware
     */
    app.post('/account/login/', (req, res) => {
        res.send(accountController.login(req, res));
    });

    app.post('/account/signup/', (req, res) => {
        res.send(accountController.signup(req, res));
    });
};

module.exports = accountRoutes;
