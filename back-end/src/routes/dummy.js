const controller = require('../controllers/dummy');
const router = require('express').Router({ mergeParams: true });

/**
 * @description Return a text response containing "Hello World" if no name is provided, or "Hello <name>" if a name is provided
 *
 * @route /api/dummy/hello
 * @method GET
 */
router.get('/hello', controller.sendHelloWorld);

module.exports = router;
