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
const babyBraceletRouter = require('./routes/babybracelet');
const balaRouter = require('./routes/bala');
const chainRouter = require('./routes/chains');
const chiksRouter = require('./routes/chiks');
const chursRouter = require('./routes/churs');
const churisRouter = require('./routes/churis');
const nosepinRouter = require('./routes/nosepins');
const korasRouter = require('./routes/koras');
const lohabadhanosRouter = require('./routes/lohabadhanos');
const mangalsutrasRouter = require('./routes/mangalsutras');
const mantasasRouter = require('./routes/mantasas');
const pasasRouter = require('./routes/pasas');
const pendantsRouter = require('./routes/pendants');
const locketsRouter = require('./routes/lockets');
const sakhasRouter = require('./routes/sakhas');
const tanasRouter = require('./routes/tanas');
const tiklisRouter = require('./routes/tiklis');
const wristletsRouter = require('./routes/wristlets');

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
app.use('/newcollections/singleproduct', newcollectionsRouter);
app.use('/necklaces', necklacesRouter);
app.use('/earings', earingsRouter);
app.use('/rings', ringsRouter);
app.use('/promotion', promotionsRouter);
app.use('/babybracelet', babyBraceletRouter);
app.use('/bala', balaRouter);
app.use('/chain', chainRouter);
app.use('/chik', chiksRouter);
app.use('/chur', chursRouter);
app.use('/churi', churisRouter);
app.use('/nosepin', nosepinRouter);
app.use('/kora', korasRouter);
app.use('/lohabadhano', lohabadhanosRouter);
app.use('/manglesutra', mangalsutrasRouter);
app.use('/mantassa', mantasasRouter);
app.use('/pasa', pasasRouter);
app.use('/pearlpendant', pendantsRouter);
app.use('/locket', locketsRouter);
app.use('/sakha', sakhasRouter);
app.use('/tana', tanasRouter);
app.use('/tikli', tiklisRouter);
app.use('/wrislet', wristletsRouter);
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
