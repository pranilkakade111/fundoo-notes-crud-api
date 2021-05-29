/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : Having Business Logic of perticular API
 * @file            : note.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 08-05-2021
 ************************************************************************* */
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
 
   addLabel = (dataLabel, callback) => {
    notemodel.addLabel(dataLabel, callback);
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

   addCollaborator = (userData, callback) => {
     notemodel.checkUserID(userData, (err, idExist) => {
       if(err) {
         err = { 
           success: false,
           message: 'Error Happened..!',
           err,
         }
         callback(err, null);
       } else if (idExist != 0) {
         let userID = ''
         userID = {
          success: false,
          message: 'User Id Already Exist...!',
         }
         callback(userID, null);
        } else {
          notemodel.addCollaborator(userData, callback);
        }
       });
     };
   

   removeCollaborator = (userdata, callback) => {
    notemodel.removeCollaborator(userdata, callback);
   };

   searchNote =(searchTitle, callback) => {
    notemodel.searchNote(searchTitle, callback);
   };
 }
 
 
 module.exports = new NoteService();