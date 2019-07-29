module.exports = {

  index: function(Model) {
    return function (req, res) {
        Model.get(function (err, documents) {
          if (err) {
            res.json({
              status: "error",
              message: err,
            });
          }
          res.json({
            status: "success",
            message: "Documents retrieved.",
            userAccessing: req.body.email || "?",
            userIdAccessing: req.body.userId || "?",
            data: documents
          });
        });
      };
  },

  new: function(Model) {
    return function (req, res) {
        let newDocument = new Model();

        // May not be as reliable in the future.
        let expectedKeys = Object.keys(Model.schema.paths).filter((key) => !['_id', '__v'].includes(key));
        let missingKeys = [];
        let rejectedKeys = [];
      
        // assign keys to new document.
        // add missingKeys to missingKeys array.
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

  },

  view: function(Model) {
    return function (req, res) {
      Model.findById(req.params.id, function (err, document) {
        if (err) res.send(err);
        res.json({
          message: 'Document retrieved.',
          data: document
        });
      });
    }
  },

  update: function(Model) {
    return function (req, res) {
      Model.findById(req.params.id, function (err, foundDocument) {
        if (err) res.send(err);
    
        // get from schema
        let acceptedKeys = Object.keys(Model.schema.paths).filter((key) => !['_id', '__v'].includes(key));
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
  },

  delete: function(Model) {
    return function (req, res) {
      Model.remove({
        _id: req.params.id
      }, function (err, document) {
        if (err) res.send(err);
    
        res.json({
          status: "success",
          message: 'Document deleted.'
        });
      });
    };
  }

}