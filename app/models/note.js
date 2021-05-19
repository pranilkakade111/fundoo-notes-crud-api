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

  addLabel = (addLabelData, callback) => {
    const labelId = addLabelData.labelId;
    const noteId = addLabelData.noteId;
    noteModel.findByIdAndUpdate(noteId,  { $push: { labelId: labelId } } , callback);      
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

}

module.exports = new NoteModel();
