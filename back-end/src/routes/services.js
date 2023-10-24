const controller = require('../controllers/services');
const router = require('express').Router({ mergeParams: true });

/**
 * @description Add a user/ticket to the queue of a service identified by its code
 *
 * @route /api/services/:code/queue
 * @method POST
 */
router.post('/:code/queue', controller.addTicketToQueue);

module.exports = router;
