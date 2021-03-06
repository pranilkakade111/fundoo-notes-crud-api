/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To hit the perticular API 
 * @file            : note.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 08-05-2021
 ************************************************************************* */
 const noteServices = require('../services/note');
 const {NoteModel} = require('../models/note');

 class NoteController{
   /**
   * @description Create A New Note
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
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
 
  /**
   * @description Update A Existing Note With Note Id
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
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
 
   /**
   * @description Add Label To Note
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
   addLabel = (req, res) => {
    const labelData = {
        noteId: req.body.noteId,
        labelId: req.body.labelId,
        userId: req.userId,
    }

    noteServices.addLabel(labelData, (err, labeldata) => {
      if(err) {
          return res.status(401).send({
              success: false,
              message: 'Failed To Add Label To Note...!!!',
              err,
          });
      } else {
          return res.status(200).send({
              success: true,
              message: 'Add Label To Note Successfully By This User...!!! = ' + req.userId,
              labeldata,
          });
      }
    });
   };

   /**
   * @description Remove Label To Note
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
   removeLabel = (req, res) => {
     const removeLabelData = {
         noteId: req.body.noteId,
         labelId: req.body.labelId,
         userId: req.userId,
     }

     noteServices.removeLabel(removeLabelData, (err, noteResult) => {
       if(err) {
         return res.status(400).send({
             success: false,
             message: 'Failed To Remove Label To Note...!!!'
         });
       } else {
         return res.status(200).send({
             success: true,
             message: 'Remove Label To Note Successfully By This User...!!! = ' + req.userId,
             data: noteResult,
         });
       }
     });
   };
 
   /**
   * @description Retrive All The Notes
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
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
 
   /**
   * @description Retrive A Single Note By Note Id
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
   getNoteById = (req, res) => {
     const Id = req.params.noteId;
     noteServices.getNoteById(Id, (err, noteResult) => {
       if(noteResult === null){
         res.status(404).send({
             success: false,
             message: "Note Not Found By ID" + Id
         });
     } else {
         res.status(200).send({
             success: true,
             message: "Note Get Retrived Successfully...!!!",
             data: noteResult
         });
      }
     });
   };
 
   /**
   * @description Delete A Note Permanantly From The DataBase
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
   deleteNote = (req, res) => {
       const nId = req.params.noteId;
     noteServices.deleteNote(nId, (err, noteResult) => {
         if(noteResult === null){
             return res.status(404).send({
                 success: false,
                 message: 'Note not Found With An Id..!!' + nId,
                 err,         
             });
         }else {
             return res.status(200).send({
               success: true,
               message: 'Note Deleted Successfully....!!!!'
             });
         }
     });  
   };
 
   /**
   * @description Move Note To Trash
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
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

   /**
   * @description Add User With Note
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
   addCollaborator = (req, res) => {
    const userData = {
      noteId: req.body.noteId,
      userId: req.body.userId,
    }
     
    noteServices.addCollaborator(userData, (err, userResult) => {
      if(err) {
          return res.status(401).send({
           success: false,
           message: 'Failed To Collaborate User With Note..!!!',
           err, 
          });
      } else {
          return res.status(200).send({
           success: true,
           message: 'Collaborate User With Note Successfully By This User  ...!!! ',
           data: userResult, 
          });
      }
    });
   };

   /**
   * @description Remove User From Note
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
   removeCollaborator = (req, res) => {
    const userdata = {
        noteId: req.body.noteId,
        userId: req.body.userId,
      }

      noteServices.removeCollaborator(userdata, (err, userResult) => {
        if(err) {
            return res.status(401).send({
                success: false,
                message: 'Failed To Remove Collaborating User With Note..!!!'
            });
        } else {
            return res.status(200).send({
                success: true,
                message: 'Remove Collaborating User With Note Successfully....!!!',
                data: userResult,
            });
        }
      });
   };

   searchNote = (req, res) => {
     try {
      const searchField = req.params.title;
      noteServices.searchNote(searchField, (err, searchResult) => {
        
        if (searchResult == null || searchResult == undefined || searchResult == '') {
          return res.status(400).send({
            success: false,
            message: 'Failed To Search Note Or Please Enter The Proper Note For Searching..!',
            error: err,
          });
        } else {
          return res.status(200).send({
            success: true,
            message: 'Note Searched SuccessFully..!',
            data: searchResult,
          });
        }
      });
     } catch (error) {
      return res.status(401).send({
        success: false,
        message: 'Internal Server Error',
      });
     }
    
  };

 }
 
 module.exports = new NoteController();