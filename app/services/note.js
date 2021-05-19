/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : Having Business Logic of perticular API

 * @file            : note.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 08-05-2021
 ************************************************************************* */
const note = require('../models/note');
const { setRedis } = require('../../utility/redisCache');
const notemodel = require('../models/note');
const redis = require('redis');
const client = redis.createClient();

class NoteService {
  createNote = (noteInfo, callback) => {
    notemodel.createNote(noteInfo, callback);
  };
   
  updateNote = (noteData, callback) => {
    notemodel.updateNote(noteData, callback);
  };

  addLabel = (addLabelData, callback) => {
    notemodel.addLabel(addLabelData, callback);
  };

  removeLabel = (removeLabelData, callback) => {
    notemodel.removeLabel(removeLabelData, callback);
  };

  getNote = (callback) => {
      const KEY = 'notes';
      notemodel.getNote((err, result) => {
          console.log('Entering Into Services....');
          if (err) {
            callback(err, null);
          } else {
              client.setex(KEY, 500, JSON.stringify(result));
              console.log('result');
              callback(null, result);
          }
      });
  };

  getNoteById = (Id, callback) => {
       notemodel.getNoteById(Id, callback);
  };

  deleteNote = (noteIds, callback) => {
      notemodel.deleteNote(noteIds, callback);
  };

  trashNote = (NoteIDs, callback) => {
      notemodel.trashNote(NoteIDs, callback);
  };
}


module.exports = new NoteService();
