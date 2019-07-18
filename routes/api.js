Thought = require('../schemas/thoughtSchema');

let router = require('express').Router();

router.get('/', function (req, res) {
  res.json({
    message: 'Express API is working.'
  });
});

var thoughtsController = require('../controllers/thoughtController');

router.route('/thoughts')
  .get(thoughtsController.index)
  .post(thoughtsController.new);
    
router.route('/thoughts/:id')
  .get(thoughtsController.view)
  .patch(thoughtsController.update)
  .put(thoughtsController.update)
  .delete(thoughtsController.delete);

module.exports = router;