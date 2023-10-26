const controller = require('../controllers/counters');
const router = require('express').Router({ mergeParams: true });

/**
 * @description Get the list of counters
 *
 * @route /api/counters
 * @method GET
 */
router.get('/', controller.listCounters);

/**
 * @description Get a counter by id
 *
 * @route /api/counters/:id
 * @method GET
 */
router.get('/:id', controller.getCounterById);

/**
 * @description Indicate that the counter served the current ticket
 *
 * @route /api/counters/:id/ticket-served
 * @method POST
 */
router.post('/:id/ticket-served', controller.indicateTicketServed);

module.exports = router;
