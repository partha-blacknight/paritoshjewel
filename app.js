const createError = require('http-errors');
const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const connection  = require('./lib/DB');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT');
const newcollectionsRouter = require('./routes/newcollection');
const necklacesRouter = require('./routes/necklace');
const earingsRouter = require('./routes/earings');
const ringsRouter = require('./routes/rings');
const promotionsRouter = require('./routes/promotions');

const port = process.env.PORT || 3001;

const app = express();
app.use(morgan('dev'));

app.use(session({ 
  cookie: { maxAge: 60000 },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: '1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X'
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads",express.static(__dirname+'/uploads'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/AAXXUAUUI_DHUHQIWRIOWHEUIFSB_CZIZJCNJCSD_EBWUIFBUIWBEFIB_SABICUAS_PRODUCT', productsRouter);
app.use('/newcollections', newcollectionsRouter);
//app.use('/newcollections/singleproduct', newcollectionsRouter);
app.use('/necklaces', necklacesRouter);
app.use('/earings', earingsRouter);
app.use('/rings', ringsRouter);
app.use('/promotion', promotionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports = app;
