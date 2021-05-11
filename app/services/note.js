const note = require('../models/note');
const notemodel = require('../models/note');

class NoteService {
  createNote = (noteInfo, callback) => {
      notemodel.createNote(noteInfo, callback);
  };
   
  updateNote = (noteData, callback) => {
      notemodel.updateNote(noteData, callback);
  };

  getNote = (callback) => {
      notemodel.getNote(callback);
  };

  deleteNote = (noteIds, callback) => {
      notemodel.deleteNote(noteIds, callback);
  };

  trashNote = (NoteIDs, callback) => {
      notemodel.trashNote(NoteIDs, callback);
  };
}


module.exports = new NoteService();
