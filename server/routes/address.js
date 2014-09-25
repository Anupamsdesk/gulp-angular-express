'use strict';
console.log('inside address');
module.exports = function (app) {
  app.get('/api/address', function (req, res) {
    res.json({message: 'Hello World'});
  });
  app.put('/api/address/:id', function (req, res) {
    console.log(req.params.id);
    res.send(204);
  });

  app.delete('/api/address/:id', function (req, res) {
    console.log(req.params.id);
    res.send(204);
  });

  app.post('/api/address', function (req, res) {
    console.log(req.body);
    res.send(200, {id: 1});
  });
};