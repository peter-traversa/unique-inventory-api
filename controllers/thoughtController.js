// Import contact model
Thought = require('../schemas/thoughtSchema');
// Handle index actions
exports.index = function (req, res) {
    console.log('get thoughts');
    Thought.get(function (err, thoughts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Thoughts retrieved successfully",
            data: thoughts
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    console.log('new thought');
    var thought = new Thought();

    thought.thought = "hello from mongoose";
    thought.thought_id = 10;

    // save the thought and check for errors
    thought.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New thought added.',
            data: thought
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Thought.findById(req.params.thought_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Thought details loading..',
            data: thought
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
Thought.findById(req.params.thought_id, function (err, thought) {
        if (err)
            res.send(err);
        thought.thought= req.body.thought;
        // save the thought and check for errors
        thought.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Thought updated',
                data: thought
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.thought_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Thought deleted'
        });
    });
};