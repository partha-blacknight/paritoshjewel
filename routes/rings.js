const express = require('express');
const router = express.Router();
const dbConnection = require('../lib/DB');
const formidable = require('formidable')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const helpers = require('../lib/helpers');
//storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
// display books page
router.get('/', function(req, res, next) {
    dbConnection.query("SELECT * FROM product WHERE category='Ring' ORDER BY id desc",function(err,rows)     {
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('rings',{rings: ''});   
        } else {
            // render to views/books/index.ejs
            console.log(rows)
            res.render('rings', {
                rings: rows,
                title: 'Rings'
            });
        }
    });
});

module.exports = router;