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

   /**
   * @description save request data to database using model methods
   * @param {*} noteInfo holds data to be saved in json formate
   * @param {*} callback holds a function
   */ 
      createNote = (noteInfo, callback) => {
     notemodel.createNote(noteInfo, callback);
   };
    
   /**
   * @description update note  data existed in database, using model's mothod
   * @param {*} notedata holds _id that is note  id
   * @param {*} callback holds a function
   */
   updateNote = (noteData, callback) => {
     notemodel.updateNote(noteData, callback);
   };
 
   /**
   * @description update note  data existed in database, using model's mothod
    * by adding new label Object Id to Note
    * @param {*} dataLabel takes data to be upadated in json formate
    * @param {*} callback holds a function
    */
   addLabel = (dataLabel, callback) => {
    notemodel.addLabel(dataLabel, callback);
   };

   /**
   * @description update note  data existed in database, using model's mothod
    * by Removing new label Object Id to Note
    * @param {*} removeLabelData takes data to be upadated in json formate
    * @param {*} callback holds a function
    */
   removeLabel = (removeLabelData, callback) => {
     notemodel.removeLabel(removeLabelData, callback);
   };
 
   /**
   * @description retrive all note  data from database using model's mothod
   * @param {*} callback holds a function
   */
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

   /**
   * @description retrive one note  data from database using model mothod
   * @param {*} Id holds _id that is note id
   * @param {*} callback holds a function
   */
   getNoteById = (Id, callback) => {
        notemodel.getNoteById(Id, callback);
   };

   /**
   * @description Delete note from database using by using NoteId model mothod
   * @param {*} noteIds holds _id that is note id
   * @param {*} callback holds a function
   */
   deleteNote = (noteIds, callback) => {
       notemodel.deleteNote(noteIds, callback);
   };
 
   /**
   * @description Move Note To trash In database using model mothod
   * @param {*} NoteIDs holds _id that is note id
   * @param {*} callback holds a function
   */
   trashNote = (NoteIDs, callback) => {
       notemodel.trashNote(NoteIDs, callback);
   };

   /**
   * @description Adding User To Note In database using model mothod
   * @param {*} userData holds _id that is note id
   * @param {*} callback holds a function
   */
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
   
   /**
   * @description Remove User To Note In database using model mothod
   * @param {*} userData holds _id that is note id
   * @param {*} callback holds a function
   */
   removeCollaborator = (userdata, callback) => {
    notemodel.removeCollaborator(userdata, callback);
   };

   /**
   * @description Search Note By Title In database using model mothod
   * @param {*} searchField holds _id that is note id
   * @param {*} callback holds a function
   */
   searchNote = (searchField, callback) => {
    notemodel.searchNote(searchField, callback);
   };
 }
 
 
 module.exports = new NoteService();