Thought = require('../schemas/thoughtSchema');

// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
  res.json({
    status: 'Yes',
    message: 'Thoughtbank API is working.'
  });
});

// Import controllers
var thoughtsController = require('../controllers/thoughtController');

router.route('/thoughts')
  .get(thoughtsController.index)
  .post(thoughtsController.new);
    
router.get('/add', function (req, res) {
  var thought = new Thought();

  thought.thought = "hello from mongoose";
  thought.thought_id = 10;

  // save the thought and check for errors
  thought.save(function (err) {
      // if (err)
        //     res.json(err);
    return res.json({
      message: 'New thought added.',
      data: thought
    });
  });
});

router.route('/thoughts/:thought_id')
  .get(thoughtsController.view)
  .patch(thoughtsController.update)
  .put(thoughtsController.update)
  .delete(thoughtsController.delete);

// Export API routes
module.exports = router;