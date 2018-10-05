//Label Model
const Label = require('../models/Labels');

//Service to display all labels
exports.displayLabels = function(req,res) {
    Label.find()
        .sort({ newlabel: -1 })
        .then(label => res.json(label));
}

/*----- Save Note -----*/
//Service to create a new label
exports.createLabel = function(req,res) {
    const newLabel = new Label({
        newlabel: req.body.newlabel,
        userId: req.body.userId
    });

    newLabel.save((err) => {
        if(err) {
            console.log("Failed",err);
            return res.json({success: false, msg: "Failed"});
        }
        res.json({success: true, msg: "Successful."});
    });
}

/*----- Delete Note ------*/
//Service to remove a label
exports.removeLabel = function(req, res, next) {
    Label.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
}
  
/*----- Update Note ------*/
//Service to update a label
exports.updateLabel = function(req,res,next) {
    Label.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if(err) return next(err);
        res.json(post);
    });
}
