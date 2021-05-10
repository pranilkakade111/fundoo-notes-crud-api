const noteServices = require('../services/note');
const jwt = require('jsonwebtoken');

class NoteController {
  createNote = (req, res) => {
    
    
    try {
        if (!req.body.title || !req.body.description) {
            return res.status(400).send({
            success: false,
            message: "Fileds Cannot Be Empty...!!!"
            });
        }
        const noteInfo = {
            title: req.body.title,
            description: req.body.description,
            
        };
       
        noteServices.createNote(noteInfo, (err, data) => {
            if(err) {
                return res.status(500).send({
                    success: false,
                    message: 'Some Error Occured While Creating Notes...!!! ',
                    err,  
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Note Added Successfully...!!!',
                    data: data,
                
                }); 
            }
        });

        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Some error occurred while creating note!!!!",
            });
        }
    };

}

module.exports = new NoteController();