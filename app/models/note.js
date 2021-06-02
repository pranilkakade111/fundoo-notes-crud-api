/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To Create Database Schema For API
 * @file            : note.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 08-05-2021
 ************************************************************************* */
const mongoose = require('mongoose');
 const note = require('../services/note');
 const Label = require('./label');
 
 const noteSchema = mongoose.Schema({
   title: { type: String, required: true },
   description: { type: String, required: true },
   isPinned: { type: Boolean, default: false },
   isArchived: { type: Boolean, default: false },
   isReminder: { type: String, required: false },
   isTrashed: { type: Boolean, default: false },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   labelId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
   collaborator: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
 }, {
   timestamps: true,
   versionKey: false,
 });
 
 const noteModel = mongoose.model('Note', noteSchema);
 
 class NoteModel {
   /**
   * @description save request note data to database
   * @param {*} noteInfo holds data to be saved in json formate
   * @param {*} callback holds a function
   */
   createNote = (noteInfo, callback) => {
     const note = new noteModel({
       title: noteInfo.title,
       description: noteInfo.description,
       userId: noteInfo.userId
     });
     note.save(callback);
   };
 
   /**
   * @description update note  data existed in database
   * @param {*} notesID holds _id that is note  id
   * @param {*} callback holds a function
   */
   updateNote = (notesID, callback) => {
     noteModel.findByIdAndUpdate(notesID.noteId, {
       title: notesID.title,
       description: notesID.description,
     }, {new: true}).then((noteone) => {
         callback(null, noteone);
     }).catch((err) => {
         callback(err, null);
     });   
   };
 
   /**
    * @description update note  data existed in database by adding existing label in label collection
    * @param {*}data takes data to be upadated in json formate
    * @param {*} callback holds a function
    */
   addLabel = async (data, callback) => {
     const labelId = data.labelId;
     const noteId = data.noteId;
     const labelCheck = await noteModel.findOne({ labelId: data.labelId });
     if(labelCheck) {
       callback('Label Id Already Exist...!!!');
     } else {
     const noteEx = await noteModel.findByIdAndUpdate(noteId, { $addToSet: { labelId: labelId } });
      callback(null, noteEx);
     }
   };
 
   /**
     * @description update note  data existed in database by deleting label from note asociated with given noteId
     * @param {*}removeLabelData takes data to be upadated in json formate
     * @param {*} callback holds a function
     */

   removeLabel = (removeLabelData, callback) => {
     const labelId = removeLabelData.labelId;
     const noteId = removeLabelData.noteId;
     noteModel.findByIdAndUpdate(noteId, { $pull: { labelId: labelId } }, callback);
   };

   /**
   * @description retrive all note data from database
   * @param {*} callback holds a function
   */
   getNote = (callback) => {
       noteModel.find((err, notedata) => {
         if(err){
             callback(err ,null);
           }else {
             callback(null ,notedata);
           }
       });     
   };
 
   /**
   * @description retrive one note data from database
   * @param {*} Ids holds _id that is note id
   * @param {*} callback holds a function
   */
   getNoteById = (Ids, callback) => {
     noteModel.findById(Ids, (err, noteresult) => {
       if(err){
           callback(err, null);
       } else {
           callback(null, noteresult);
       }
     });
   };

   /**
   * @description remove note data from database
   * @param {*} noteIds holds _id that is note  id
   * @param {*} callback holds a function
   */
   deleteNote = (noteIds, callback) => {
       noteModel.findByIdAndRemove(noteIds, (err, noteresult) => {
           if(err){
               callback(err, null);
          }else {
              callback(null, noteresult);
          }
       });
   };
 
   /**
   * @description remove note temporary by setting isTrashed flag true
   * @param {*} data
   * @param {*} callback
   */
   trashNote = (data, callback) => {
       noteModel.findByIdAndUpdate(data, {isTrashed: true}, {new: true})
       .then((note) => {
           callback(null, note);
       }).catch((err) => {
           callback(err, null);
       });
   };

   /**
  * @description update note  data existed in database by adding existing user in user collection
  * @param {*} userData takes data to be upadated in json formate
  * @param {*} callback holds a function
  */
   addCollaborator =  (userData, callback) => {
    const noteId = userData.noteId;
    const userId = userData.userId;
     noteModel.findByIdAndUpdate(noteId, { $addToSet: { collaborator: userId } }, callback);
    
   };

   /**
   * @description find Userdata with UserId to check user is already Present in database or not
   * @param {*} userDaTa takes data to be Find in json formate
   * @param {*} callback holds a function
   */
   checkUserID = (userDaTa, callback) => {
    noteModel.find({ collaborator: userDaTa.userId }, (err, userIdPre) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, userIdPre);
      }
    });
   };

   /**
   * @description update note  data existed in database by deleting label from note asociated with given noteId
   * @param {*} userdata takes data to be upadated in json formate
   * @param {*} callback holds a function
   */
   removeCollaborator = (userdata, callback) => {
    const noteId = userdata.noteId;
    const userId = userdata.userId;
    noteModel.findByIdAndUpdate(noteId, { $pull: { collaborator: userId } }, callback);
   };

   searchNote = (searchField, callback) => {
     let field = searchField;
     noteModel.find({title:{$regex: field, $options:'$i'}}, (err, dataResult) => {
      (err) ? callback(err, null) : callback(null, dataResult);
     });
   };
 }
 
 module.exports = new NoteModel();