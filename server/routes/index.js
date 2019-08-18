var express = require('express');
var router = express.Router();
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const path = "bin/data/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Server is up & running');
});

router.get('/api/diagrams/:diagramId', function (req, res) {
  const fileName = req.params.diagramId + '.json';
  fs.readFile(path + fileName, (err, data) => {
    if (err) {
      res.status(500).jsonp({ error: 'File read error' });
      return;
    }
    const deserializeData = JSON.parse(data);
    res.send(deserializeData);
  })
});

router.post('/api/diagrams', function (req, res) {
  const data = req.body;
  const serializedData = JSON.stringify(data, null,  2);
  const fileName = uuidv1() + ".json";

  fs.writeFile(path + fileName, serializedData , err => {
    if (err) {
      res.status(500).jsonp({ error: 'Failed to save' });
      return;
    }
    console.log("file saved: " + fileName);
    res.send("File write success");
  });
});

module.exports = router;
