const Comment = require('../models/comment');


// Comment Controllers
// Displaying All Comments and Sorting by Newest to Oldest (Descending Order)
const comment_index = (req, res) => {
    Comment.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('comments/comments', { comments: result });
    })
    .catch((err) => {
        console.log(err);
    });
}

// Dynamically Adding Comment Through Form
const comment_add = (req, res) => {
    const comment = new Comment(req.body);
    comment.save()
        .then((result) => {
            res.redirect('/comments');
        })
        .catch((err) => {
            console.log(err);
        });
}

// Displaying Single Comment using URL Parameter
const comment_details = (req, res) => {
    Comment.findById(req.params.id)
        .then((result) => {
            res.render('comments/comment_details', { comment: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(404).render('404', {});
        });
}

// Deleting Comment
const comment_delete = (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json({ redirect: '/comments' });
        })
        .catch((err) => {
            console.log(err);
            res.status(404).render('404', {});
        });
}



module.exports = {
    comment_index,
    comment_add,
    comment_details,
    comment_delete
}