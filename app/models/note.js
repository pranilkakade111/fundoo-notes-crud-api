const { string } = require('@hapi/joi');
const mongoose = require('mongoose');
const User = require('./user');

const NoteSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isPinned: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  isTrashed: { type: Boolean, default: false },
  isreminder: { type: Boolean, default: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
    unique: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

const noteModel = mongoose.model('Note', NoteSchema);

class NoteModel {
    createNote = (noteInfo, callback) => {
        const note = new noteModel({
          title: noteInfo.title,
          description: noteInfo.description,
        });
        console.log(note);
        note.save(callback);
    };
}

module.exports = new NoteModel();
