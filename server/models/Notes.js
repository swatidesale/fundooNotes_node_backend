const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Note Schema
const NoteSchema = new Schema({
    notetitle: {
        type: String
    },
    notedata: {
        type: String
    },
    ispin: {
        type: Boolean,
        default: false
    },
    istrash: {
        type: Boolean,
        default: false
    },
    isarchive: {
        type: Boolean,
        default: false
    },
    background: {
        type: String
    },
    reminder: {
        type: String
    },
    userId: {
        type: String
    },
    label: {
        type: String
    },
    image: {
        type: String
    },
    sharenotewith: {
        type: String
    }
});

var Note = mongoose.model('servernote',NoteSchema);

function noteOperations() {

}

/*----- Save Note -----*/
//Service to create a new note
noteOperations.prototype.createNote = function(noteData, callback) {
    var newNote = new Note({
        'notetitle': noteData.notetitle,
        'notedata': noteData.notedata,
        'userId': noteData.userId,
        'ispin': noteData.ispin,
        'istrash': noteData.istrash,
        'isarchive': noteData.isarchive,
        'background': noteData.background,
        'reminder': noteData.reminder,
        'label': noteData.label
    });

    newNote.save(function(err, note) {
        if(err) {
            callback(err, null);
        }
        else {
            callback(null,note);
        }
    });
}

module.exports = new noteOperations;