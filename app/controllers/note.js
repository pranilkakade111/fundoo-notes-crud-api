const noteServices = require('../services/note');

class NoteController 
{
  createNote = (req, res) => {
     if(!req.body.title||!req.body.description){
       return res.status(400).send({
           success: false,
           message: 'Fields Can not Be Empty....!!!'
       });
     };
       const noteInfo = {
           title: req.body.title,
           description: req.body.description,
           userId : req.userId    
       }
       
       noteServices.createNote(noteInfo, (err, data) => {
         if(err){
             return res.status(401).send({
                 success: false,
                 message: 'Failed To Create Note...!!!',
                 err,
             });
         } else {
             return res.status(200).send({
                 success: true,
                 message: 'Note Created Successfully....!!!',
                 data: data,
             });
         }
       });
  };

  updateNote = (req, res) => {
    if(!req.body.title||!req.body.description){
        return res.status(400).send({
            success: false,
            message: 'Fields Can not Be Empty....!!!'
        });
      };

      const noteData = {
          title: req.body.title,
          description: req.body.description,
          noteId: req.params.noteId
      }

      noteServices.updateNote(noteData, (err, noteResult) => {
        if(noteResult === null) {
            return res.status(404).send({
                success: false,
                message: 'Note Not Found With An Id' + res.params.noteId,
                err,
            });
        } else {
            return res.status(200).send({
                success: true,
                message: 'Note Found And Updated Successfully....!!!',
                data: noteResult
            });
        }
      });
  };

  getNote = (req, res) => {
    noteServices.getNote((err, noteResult) => {
      if(err) {
          return res.status(400).send({
              success: false,
              message: 'Failed To Retriving All Notes....!!!!'
          });
      } else {
          return res.status(200).send({
              success: true,
              message: 'Retrived All note Successfully.....!!!!',
              data: noteResult
          });
      }
    }); 
  };

  deleteNote = (req, res) => {
      const nId = req.params.noteId;
    noteServices.deleteNote(nId, (err, noteResult) => {
        if(noteResult === null){
            return res.status(404).send({
                success: false,
                message: 'Note not Found With An Id..!!' + nId,
                
            });
        }else {
            return res.status(200).send({
              success: true,
              message: 'Note Deleted Successfully....!!!!'
            });
        }
    });  
  };

  trashNote = (req, res) => {
    const NoteID = req.params.noteId;
    noteServices.trashNote(NoteID, (err, noteResult) => {
        if(noteResult === null){
            return res.status(404).send({
                success: false,
                message: 'Note not Found With An Id..!!' + NoteID,
            });
        }else {
            return res.status(200).send({
                success: true,
                message: 'Note Is Move To Trash Successfully....!!!!'
              });
        }
    });
  };
}

module.exports = new NoteController();