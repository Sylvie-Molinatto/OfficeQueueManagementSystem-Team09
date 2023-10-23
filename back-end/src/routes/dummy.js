const controller = require('../controllers/dummy');
const router = require('express').Router({ mergeParams: true });

/**
 * @description Return a text response containing "Hello World" if no name is provided, or "Hello <name>" if a name is provided
 *
 * @route /api/dummy/hello
 * @method GET
 */
router.get('/hello', controller.sendHelloWorld);

/**
 * @description Return the list of counters available in the database
 *
 * @route /api/dummy/counters
 * @method GET
 */
router.get('/counters', controller.getCounters);

module.exports = router;
