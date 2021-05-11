const mongoose = require('mongoose');
const note = require('../services/note');

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isPinned: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  isReminder: { type: Boolean, default: false },
  isTrashed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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

  getNote = (callback) => {
      noteModel.find((err, notedata) => {
        if(err){
            callback(err ,null);
          }else {
            callback(null ,notedata);
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
