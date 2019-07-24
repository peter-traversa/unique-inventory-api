Thought = require('../schemas/thoughtSchema');

let router = require('express').Router();

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