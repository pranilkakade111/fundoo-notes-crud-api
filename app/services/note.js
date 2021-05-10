const noteModel = require('../models/note');
const helper = require('../../utility/helper');

class NoteServices {
    createNote = (noteInfo, callback) => {
      console.log(noteInfo);
      noteModel.createNote(noteInfo, callback);
    };
}

module.exports = new NoteServices();