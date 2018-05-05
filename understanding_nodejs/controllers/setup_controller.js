var models = require('../models');

module.exports = function(app) {
  app.get('/api/setup_todos', function (req, res) {
    // seed Todos
    var Todos = [
      {
        username: 'test',
        todo: 'finish project',
        is_done: false,
        has_attachment: false,
      },
      {
        username: 'test',
        todo: 'complete more courses',
        is_done: false,
        has_attachment: false,
      },
      {
        username: 'test',
        todo: 'find an opportunity to advance my career',
        is_done: false,
        has_attachment: false,
      },
      {
        username: 'test',
        todo: 'Repeat until satisfied',
        is_done: false,
        has_attachment: false,
      },
    ];

    models.Todos.create(Todos, function (err, results) {
      if (err) { throw (err); }
      res.send(results);
    });
  });
}