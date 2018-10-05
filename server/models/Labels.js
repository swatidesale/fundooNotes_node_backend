const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabelSchema = new Schema({
    newlabel: {
        type:String
    },
    userId: {
        type: String
    }
});

module.exports = Label = mongoose.model('Label',LabelSchema)