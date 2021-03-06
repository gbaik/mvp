const Notes = require('./schema');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.get('/client/allNotes', function (request, response) {
  response.writeHead(200, {'content-type' : 'application/json'});
  Notes.find({}, function (err, results) {
    if (err) return handleError(err);
    response.end(JSON.stringify(results));
  });
});

app.post('/remove/oneNote', function (request, response) {
  Notes.findOneAndRemove({ _id: request.body.id }, {$set: {Entry: request.body.entry}}, function (err) {
    if (err) return handleError(err);
    console.log('success');
  })

  response.end();
});

app.post('/add/newNotes', function (request, response) {
  Notes.create({Title: request.body.title, Entry: request.body.entry}, function (err) {
    if (err) return handleError(err);
    console.log('success');
  })

  response.end();
});

app.post('/add/editedNotes', function (request, response) {
  Notes.findOneAndUpdate({ _id: request.body.id }, {$set: {Entry: request.body.entry}}, function (err) {
    if (err) return handleError(err);
    console.log('success');
  })

  response.end();
});

app.listen(port, _ => {
  console.log(`Server connected to port number: ${port}`);
});