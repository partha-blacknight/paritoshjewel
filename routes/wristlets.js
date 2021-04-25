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
    dbConnection.query("SELECT * FROM product WHERE category='Wristlet' ORDER BY id desc",function(err,rows)     {
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('wristlet',{wristlets: ''});   
        } else {
            // render to views/books/index.ejs
            console.log(rows)
            res.render('wristlet', {
                wristlets: rows,
                title: 'Wristlets'
            });
        }
    });
});
// display single product page
router.get('/product/(:id)', function(req, res, next) {
    let id = req.params.id;
    dbConnection.query('SELECT * FROM product WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Product not found with id = ' + id)
            res.redirect('/wristlet')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('wristlet/product', {
                title: 'Product', 
                id: rows[0].id,
                name: rows[0].name,
                category: rows[0].category,
                description: rows[0].description,
                price: rows[0].price,
                pic: rows[0].pic
            })
        }
    })
});

module.exports = router;