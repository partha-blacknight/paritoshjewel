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
    dbConnection.query('SELECT * FROM product ORDER BY id desc',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT',{data:rows});
        }
    });
});

// display add book page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT/add', {
        name: '',
        category: '',
        price: '',
        description: ''      
    })
})

// add a new book
router.post('/add', function(req, res, next) {    
    let name = req.body.name;
    let category = req.body.category;
    let price = req.body.price;
    let description = req.body.description;
    let errors = false;

    if(name.length === 0 || category.length === 0 || price.length === 0 || description.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', "Please enter name and author");
        // render to add.ejs with flash message
        res.render('AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT/add', {
            name: name,
            category: category,
            price: price,
            description: description
        })
    }
    // if no error
    if(!errors) {
        const form_data = {
            name: name,
            category: category,
            price: price,
            description: description
        }
        // insert query
        dbConnection.query('INSERT INTO product SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // render to add.ejs
                console.log(result);
                res.render('AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT/add', {
                    name: form_data.name,
                    category: form_data.category,
                    price: form_data.price,
                    description: description                  
                })
            } else {                
                req.flash('success', 'Product successfully added');
                res.redirect('/AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT');
            }
        })
    }
})

// display edit book page
router.get('/edit/(:id)', function(req, res, next) {
    let id = req.params.id;
    dbConnection.query('SELECT * FROM product WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Product not found with id = ' + id)
            res.redirect('/AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT/edit', {
                title: 'Edit Product', 
                id: rows[0].id,
                name: rows[0].name,
                category: rows[0].category,
                price: rows[0].price,
                description: rows[0].description
            })
        }
    })
})

// update book data
router.post('/update/:id', function(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let category = req.body.category;
    let price = req.body.price;
    let description = req.body.description;
    let errors = false;

    if(name.length === 0 || category.length === 0 || price.length === 0 || description.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', "Please enter name and author");
        // render to add.ejs with flash message
        res.render('AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT/edit', {
            id: req.params.id,
            name: name,
            category: category,
            price: price,
            description: description
        })
    }

    // if no error
    if( !errors ) {   
        const form_data = {
            name: name,
            category: category,
            price: price,
            description: description
        }
        // update query
        dbConnection.query('UPDATE product SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT/edit', {
                    name: form_data.name,
                    category: form_data.category,
                    price: form_data.price,
                    description: form_data.description  
                })
            } else {
                req.flash('success', 'Product successfully updated');
                res.redirect('/AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT');
            }
        })
    }
})
   
// delete book
router.get('/delete/(:id)', function(req, res, next) {
    let id = req.params.id;
    dbConnection.query('DELETE FROM product WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT')
        } else {
            // set flash message
            req.flash('success', 'Product successfully deleted! ID = ' + id)
            // redirect to books page
            res.redirect('/AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT')
        }
    })
})

//get item for upload image
router.get('/image/(:id)', function(req, res, next) {
    let id = req.params.id;
    dbConnection.query('SELECT * FROM product WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Product not found with id = ' + id)
            res.redirect('/AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT/image', {
                title: 'Add Product Image', 
                id: rows[0].id,
                name: rows[0].name
            })
        }
    })
})
//upload image
router.post('/upload', (req, res) => {
    let id = '';
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        const form = new formidable.IncomingForm();
        // form.parse analyzes the incoming stream data, picking apart the different fields and files for you.
        form.parse(req, function(err, fields, files) {
            if (err) {
                // Check for and handle any errors here.
                console.error(err.message);
                return;
            }
            id = fields.id
        });
        // 'profile_pic' is the name of our file input field in the HTML form
        let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('pic');
        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
            let imageName = req.file.path.split("\\")[1];
            dbConnection.query('UPDATE product SET ? WHERE ?', [{ pic: imageName }, { id: id }], function(err, results) {
                if(err){
                    // set flash message
                    req.flash('error', err)
                }else{
                    console.log('image updated to db successfully', results);
                }
            });
            // Display uploaded image for user validation
            //res.send(`You have uploaded this image: <hr/><img src="${path.join(path.relative(__dirname, req.file.path))}" width="500"><hr /><a href="./">Upload another image</a>`);
            req.flash('success', 'Product image successfully updated!')
            res.redirect('/AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT')
        }); 
    }
});

module.exports = router;