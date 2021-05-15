/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : to hit the perticular API

 * @file            : user.js
 * @author          : Pranil Kakadea
 * @version         : 1.0
 * @since           : 02-05-2021
 ************************************************************************* */
const user = require('../controllers/user');
const note = require('../controllers/note');
const lable = require('../controllers/lable');
const { verifyToken } = require('../../utility/helper');
const { cache } = require('../../utility/redisCache');

module.exports = (app) => {
  app.post('/user', user.createUser);

  app.post('/login', user.loginUser);

  app.post('/forgotPassword', user.forgotPassword);

  app.post('/resetPassword', verifyToken, user.resetPassword);

  app.post('/notes', verifyToken, note.createNote);

  app.put('/notes/:noteId', verifyToken, note.updateNote);

  app.get('/notes', verifyToken, cache, note.getNote);

  app.get('/notes/:noteId', verifyToken, note.getNoteById);

  app.delete('/notes/:noteId', verifyToken, note.deleteNote);

  app.put('/notes/trash/:noteId', verifyToken, note.trashNote);

  app.post('/lables', verifyToken, lable.createLable);

  app.put('/lables/:lableId', verifyToken, lable.updateLable);

  app.delete('/lables/:lableId', verifyToken, lable.deleteLable);

  app.get('/lables', verifyToken, lable.getLable);
};
