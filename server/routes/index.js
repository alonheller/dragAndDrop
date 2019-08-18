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
  const fileName = req.params.diagramId + '.jpeg';
  fs.readFile(path + fileName, 'base64', (err, data) => {
    if (err) {
      res.status(500).jsonp({ error: 'File read error' });
      return;
    }
    res.set('Content-Type', 'image/jpeg');
    res.send('data:image/jpeg;base64,' + data);
  })
});

router.post('/api/diagrams', function (req, res) {
  const base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
  const fileName = uuidv1() + ".jpeg";

  fs.writeFile(path + fileName, base64Data, 'base64', err => {
    if (err) {
      res.status(500).jsonp({ error: 'Failed to save' });
      return;
    }
    console.log("file saved: " + fileName);
    res.send("File write success");
  });
});

module.exports = router;
