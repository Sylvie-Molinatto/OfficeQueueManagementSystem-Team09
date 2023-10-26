const controller = require('../controllers/services');
const router = require('express').Router({ mergeParams: true });

/**
 * @description List all available services
 *
 * @route /api/services
 * @method GET
 */
router.get('/', controller.getAllServices);

/**
 * @description Add a user/ticket to the queue of a service identified by its code
 *
 * @route /api/services/:code/queue
 * @method POST
 */
router.post('/:code/queue', controller.addTicketToQueue);

/**
 * @description List all available services
 *
 * @route /api/services/counters
 * @method GET
 */
router.get('/counters', controller.getAllCounters);

module.exports = router;
