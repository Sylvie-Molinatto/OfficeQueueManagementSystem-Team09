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

module.exports = router;
