Thought = require('../schemas/thoughtSchema');

let router = require('express').Router();

router.get('/', function (req, res) {
  res.json({
    message: 'Express API is working.'
  });
});

var adaptiveController = require('./adaptiveController')

router.route('/thoughts')
  .get(adaptiveController.index(Thought))
  .post(adaptiveController.new(Thought));
    
router.route('/thoughts/:id')
  .get(adaptiveController.view(Thought))
  .patch(adaptiveController.update(Thought))
  .put(adaptiveController.update(Thought))
  .delete(adaptiveController.delete(Thought));

module.exports = router;