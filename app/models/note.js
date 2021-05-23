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
   createNote = (noteInfo, callback) => {
     const note = new noteModel({
       title: noteInfo.title,
       description: noteInfo.description,
       userId: noteInfo.userId
     });
     note.save(callback);
   };
 
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
 
   removeLabel = (removeLabelData, callback) => {
     const labelId = removeLabelData.labelId;
     const noteId = removeLabelData.noteId;
     noteModel.findByIdAndUpdate(noteId, { $pull: { labelId: labelId } }, callback);
   };

   getNote = (callback) => {
       noteModel.find((err, notedata) => {
         if(err){
             callback(err ,null);
           }else {
             callback(null ,notedata);
           }
       });     
   };
 
   getNoteById = (Ids, callback) => {
     noteModel.findById(Ids, (err, noteresult) => {
       if(err){
           callback(err, null);
       } else {
           callback(null, noteresult);
       }
     });
   };
 
   deleteNote = (noteIds, callback) => {
       noteModel.findByIdAndRemove(noteIds, (err, noteresult) => {
           if(err){
               callback(err, null);
          }else {
              callback(null, noteresult);
          }
       });
   };
 
   trashNote = (data, callback) => {
       noteModel.findByIdAndUpdate(data, {isTrashed: true}, {new: true})
       .then((note) => {
           callback(null, note);
       }).catch((err) => {
           callback(err, null);
       });
   };

   addCollaborator =  (userData, callback) => {
    const noteId = userData.noteId;
    const userId = userData.userId;
     noteModel.findByIdAndUpdate(noteId, { $addToSet: { collaborator: userId } }, callback);
    
   };

   checkUserID = (userDaTa, callback) => {
    noteModel.find({ collaborator: userDaTa.userId }, (err, userIdPre) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, userIdPre);
      }
    });
   };

   removeCollaborator = (userdata, callback) => {
    const noteId = userdata.noteId;
    const userId = userdata.userId;
    noteModel.findByIdAndUpdate(noteId, { $pull: { collaborator: userId } }, callback);
   };
 }
 
 module.exports = new NoteModel();