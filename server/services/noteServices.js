var async = require('async');
var nodemailer = require('nodemailer');

//Note Model
const noteModel = require('../models/Notes');

exports.createNewNote = function(noteData, callback) {
    noteModel.createNote(noteData, function(err,note) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,note);
        }
    });
}
