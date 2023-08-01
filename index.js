const path = require('path');
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utility/helpers')
// const {User, Post, Comment } = require('./models');

const sequelize = require('./config/db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = 3001;

const hbs = handlebars.create({
    extname: 'handlebars',
    layoutsDir: './views/layouts',
    defaultLayout: 'main',
    partialsDir: ['./views/partials'],
    helpers: helpers
});

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// User.sync({ force: true });
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server listening on: http://localhost:' + PORT));
});