var models = require('../models');
var bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true}));

  app.get('/api/todos/:username', function (req, res) {
    models.Todos.find({ username: req.params.username}, function (err, todos) {
      if (err) { throw err; }
      res.send(todos);
    });
  });

  app.get('/api/todo/:id', function (req, res) {
    models.Todos.findById({ _id: req.params.id }, function (err, todo) {
      if (err) { throw err; }
      res.send(todo);
    });
  });

  app.post('/api/todo', function (req, res) {
    models.Todos.create({
      username: 'test',
      todo: req.body.todo,
      is_done: req.body.is_done,
      has_attachment: req.body.has_attachment,
    })
    .then((todo) => {
      res.status(200).send('Success');
    })
    .catch((err) => {
      throw err;
    });
  });

  app.put('/api/todo', function (req, res) {
    models.Todos.findByIdAndUpdate(
      { _id: req.body.id },
      {
        todo: req.body.todo,
        is_done: req.body.is_done,
        has_attachment: req.body.has_attachment,
      },
      function (err, todo) {
        if (err) { throw err; }
        res.status(200).send('Success');
      }
    ) 
  });

  app.delete('/api/todo/:id', function (req, res) {
    models.Todos.findByIdAndRemove({ _id: req.params.id }, function (err) {
      if (err) { throw err; }
      res.status(200).send('Success');
    });
  });
}