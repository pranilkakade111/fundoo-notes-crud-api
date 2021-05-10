/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : to hit the perticular API

 * @file            : user.js
 * @author          : Pranil Kakadea
 * @version         : 1.0
 * @since           : 02-05-2021
 *
 ************************************************************************* */
const note = require('../controllers/note');
const helper = require('../../utility/helper');

module.exports = (app) => {
  app.post('/notes', helper.verifyToken, note.createNote);

  // app.put('/notes/:noteId', note.updateNote);

//   app.get('/notes', note.getAllNotes);
};
