const noteServices = require('../services/noteServices');

/*
 * Function to create a new note
 * 
 * @param req
 * @param res
*/
exports.createNewNote = function(req,res) {
    var noteData = req.body;
    noteServices.createNewNote(noteData, function(err, note) {
        if(err) {
            res.json({err: err});
        }
        else {
            res.json({data: note});
        }
    });
}