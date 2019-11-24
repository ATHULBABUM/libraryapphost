


var express = require('express');
var booksRouter = express.Router();
var {bookModel}=require('../models/bookModel');

function route(nav) {
    var test=[];

    booksRouter.route('/')
        .get((req, res) => {
            bookModel.find((err,data)=>{
                if(err){
                        throw err;
                }
                else{
                    test=data;
                    res.render('books.ejs', {
                        nav,
                        title: "Books",
                        books:data
                    })
                    }
            })       
        });

    booksRouter.route('/add')
        .get((req, res) => {
            res.render('addbooks.ejs', {
                nav, 
                title: "Add Books"
            })
        });

    booksRouter.route('/save')
        .post((req, res) => {
            var addbook=new bookModel(req.body);
            addbook.save((err,data)=>{
                if(err){
                        res.json({status:"error"});
                        throw err;
                }
                else{
                        res.json({status:"success"});
                }
            });
            //res.send("form submitted")
           // res.send(req.body);
        })

    booksRouter.route('/delete')
       .post((req,res)=>{
           bookModel.deleteOne({bookId:req.body.bookId},(err,data)=>{
               if(err){
                   res.json({status:"failed"});
               }
               else if(data.n==0){
                   res.json({status:"not found"});
               }
               else{
                   res.json({status:"success"});
               }
           })
       });

    booksRouter.route('/:id')
        .get((req, res) => {
            const id = req.params.id;
            res.render('book.ejs', {
                nav,
                title: "Book",
                book: test[id]
            })
        });

    return booksRouter;
}
module.exports = route;