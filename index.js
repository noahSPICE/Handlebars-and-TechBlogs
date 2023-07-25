const path = require('path');
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const routes = require('./controllers');
const {User, Post, Comment } = require('./models');

const sequelize = require('./config/db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = 3001;

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
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// User.sync({ force: true }).then(Post.sync({ force: true }).then(Comment.sync({ force: true })));
// Post.sync({ force: true });
// Comment.sync({ force: true });
// seedAll();

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening @ ${PORT}`));
});