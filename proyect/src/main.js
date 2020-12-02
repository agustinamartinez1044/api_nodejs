const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const userRoute = require('./routes/users');
const moviesRoute = require('./routes/movies');
const favoritesRoute = require('./routes/favorites');
const auntenticarRoute = require('./routes/autenticar');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//Routes
app.use(require('./routes/index'));
app.use('/api/movies', moviesRoute);
app.use('/api/users', userRoute);
app.use('/api/favorites', favoritesRoute);
app.use('/api/autenticar', auntenticarRoute);

app.use((error, req, res, next) => {
  res.status(400).json({
    status: 'error',
    message: error.message
  })
})

app.listen(app.get('port'), () => {
})