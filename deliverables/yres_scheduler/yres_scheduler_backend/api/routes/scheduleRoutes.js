const scheduleService = require('../controllers/scheduleController');

module.exports = (app) => {
    /**
     * Route to generate a new schedule.
     * @name POST /schedule/generate/
     * @function
     * @memberof module:routes/scheduleRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the generateSchedule function.
     */
    app.post('/schedule/generate/', async (req, res) => {
        var result;
        try {
            result = await cheduleService.generateSchedule(req, res)
        } catch(err) {
            res.status(500).send({error: err.message});
        }
        res.send(result);
    })

    /**
     * Route to get all schedules (should be only one).
     * @name GET /schedule/getAll/
     * @function
     * @memberof module:routes/scheduleRoutes
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @returns {Promise} A Promise that resolves to the result of the getAllSchedules function.
     */
    .get('/schedule/getAll/', async (req, res) => {
        const all_schedules = await scheduleService.getAllSchedules(req, res);
        res.send(all_schedules);
    });
};