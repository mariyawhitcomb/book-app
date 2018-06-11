const { Note, MyBook } = require('../models/MyBook')

module.exports = {
    new: (req, res) => {
        res.render('myBook/new', {note: 'this is a form to create a new note'})

    },
    create: (req, res) => {
        Note.create({
            content: req.body.note.content,
            author: req.user._id,
            book: req.book._id
          }).then(note => {
            req.user.notes.push(note);
            req.book.notes.push(note)
            req.user.save(err => {
              res.redirect(`/myBook/${book._id}`);
            });
          });

    },
    show: (req, res) => {
        // MyBook.findOne({_id: req.params.id})
        // .populate('book')
        // .populate('note')
        // .then(mybook =>{
            res.render('myBook/show', {mybook: 'this is my favorite book'})
        // })



    },
    // destroy: () => {

    // },
    update: (req, res) => {
        let { content } = req.body;
    Note.findOne({ _id: req.params.id }).then(mybook => {
      mybook.note.push({
        content,
        author: req.user._id
      });
      note.save(err => {
        res.redirect(`/myBook/${book._id}`);
      });
    });

    },
    index: (req, res)=>{
        // MyBook.find({})
        // .sort({createdAt: -1})
        // .populate('author')
        // .populate('note')
        // .then(mybooks => {
            // res.render('myBook/index', { mybooks })
        // })
        res.render('myBook/index', {books: 'list of my books'})
    }
}