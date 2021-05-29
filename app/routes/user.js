/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : to hit the perticular API

 * @file            : user.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 02-05-2021
 ************************************************************************* */
const passport = require('passport');
const user = require('../controllers/user');
const note = require('../controllers/note');
const label = require('../controllers/label');
const { verifyToken } = require('../../utility/helper');
const { cache } = require('../../utility/redisCache');
const { tokenAuthentication } = require('../../utility/googleAuth');

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

  app.post('/labels', verifyToken, label.createLabel);

  app.put('/labels/:labelId', verifyToken, label.updateLabel);

  app.delete('/labels/:labelId', verifyToken, label.deleteLabel);

  app.get('/labels', verifyToken, label.getLabel);

  app.put('/addLabelToNote', verifyToken, note.addLabel);

  app.put('/removeLabelToNote', verifyToken, note.removeLabel);

  app.put('/addCollaborator', verifyToken, note.addCollaborator);

  app.put('/removeCollaborator', verifyToken, note.removeCollaborator);

  app.get('/failed', (req, res) => res.send('You Have Failed To Login...!!!'));

  app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'consent', includeGrantedScopes: true }));

  app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), tokenAuthentication, user.socialLogin);
};
