const express = require('express');
const co = require('co');
const path = require('path');

const router = express.Router();

// function getTodos(res) {
//   Todo.find((err, todos) => {
//     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//     if (err) {
//       res.send(err);
//     }
//
//     res.json(todos); // return all todos in JSON format
//   });
// }
//
//   // api ---------------------------------------------------------------------
//   // get all todos
//   router.get('/api/todos', (req, res) => {
//     // use mongoose to get all todos in the database
//     getTodos(res);
//   });
//
//   // create todo and send back all todos after creation
//   router.use('/api/todos', (req, res) => {
//     // create a todo, information comes from AJAX request from Angular
//     Todo.create({
//       text: req.body.text,
//       done: false,
//     }, (err, todo) => {
//       if (err) { res.send(err); }
//
//       // get and return all the todos after you create another
//       getTodos(res);
//     });
//   });
//
//   // delete a todo
//   router.delete('/api/todos/:todo_id', (req, res) => {
//     Todo.remove({
//       _id: req.params.todo_id,
//     }, (err, todo) => {
//       if (err) { res.send(err); }
//
//       getTodos(res);
//     });
//   });

  // application -------------------------------------------------------------
  router.get('/', (req, res) => {
      res.sendFile(path.join(__dirname+'/../public/index.html'));
      // res.sendFile(`../public/index.html`); // load the single view file (angular will handle the page changes on the front-end)
  });

// router.get('/create', (req, res) => {
//     // res.sendFile(path.join(__dirname+'/../public/html/createForm.html'));
//     // res.sendFile(`../public/index.html`); // load the single view file (angular will handle the page changes on the front-end)
// });

module.exports = router;
