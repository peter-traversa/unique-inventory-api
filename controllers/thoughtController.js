Thought = require('../schemas/thoughtSchema');

exports.index = function (req, res) {
  Thought.get(function (err, thoughts) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Documents retrieved.",
      data: thoughts
    });
  });
};

// Handle create contact actions
exports.new = function (req, res) {
  // convert to function, get from argument
  let newDocument = new Thought();

  // get from schema
  let expectedKeys = ['userId', 'thought', 'tags'];
  let missingKeys = [];
  let rejectedKeys = [];

  // assign keys to new document;
  // add missingKeys to missingKeys array
  expectedKeys.forEach((expectedKey) => {
    if (!req.body[expectedKey]) missingKeys = [...missingKeys, expectedKey];
    newDocument[expectedKey] = req.body[expectedKey]
  });

  rejectedKeys = Object.keys(req.body).filter((requestKey) => !expectedKeys.includes(requestKey));

  newDocument.save(function (err) {
    if (err) res.send(err);

    res.json({
      message: 'Document added.',
      data: newDocument,
      missingKeys: missingKeys.length > 0 ? missingKeys : undefined,
      rejectedKeys: rejectedKeys.length > 0 ? rejectedKeys : undefined,
    });
  });
};

// Handle view contact info
exports.view = function (req, res) {
  Thought.findById(req.params.id, function (err, document) {
    if (err) res.send(err);

    res.json({
      message: 'Document retrieved.',
      data: document
    });

  });
};
// Handle update contact info
exports.update = function (req, res) {
  // convert to function, get from argument
  Thought.findById(req.params.id, function (err, foundDocument) {
    if (err) res.send(err);

  // get from schema
  let acceptedKeys = ['userId', 'thought', 'tags'];
    let rejectedKeys = [];
    let keyValuePairsToAdd = {};

    // for each key in the request body,
    // if it is an accepted key, add it to the foundDocument
    // otherwise, add the key to the rejectedKeys array
    Object.keys(req.body).forEach((key) => {
      if (acceptedKeys.includes(key)) {
        foundDocument[key] = req.body[key]
      } else {
        rejectedKeys = [...rejectedKeys, key];
      }
    });

    foundDocument.save(function (err) {
      if (err) res.json(err);
      
      res.json({
        message: 'Document updated.',
        data: foundDocument,
        rejectedKeys: rejectedKeys.length > 0 ? rejectedKeys : undefined,
      });
    });
  });
};

exports.delete = function (req, res) {
  Thought.remove({
    _id: req.params.id
  }, function (err, document) {
    if (err) res.send(err);

    res.json({
      status: "success",
      message: 'Document deleted.'
    });
  });
};