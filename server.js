const express         = require("express");
const mustacheExpress = require("mustache-express");
const path            = require("path");
const routes          = require("./routes/base");
const morgan          = require("morgan");
const bodyParser      = require("body-parser");
const passport        = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const BasicStrategy   = require('passport-http').BasicStrategy;
const session         = require('express-session');
const flash           = require('express-flash-messages');
const model           = require("./models/index");
const bcrypt          = require("bcrypt");
const cookieParser    = require('cookie-parser');

const app             = express();

app.use(express.static(path.join(__dirname, "public")));

app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set("layout", "layout");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(morgan("dev"));

app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash('error')
    next()
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    model.User.findOne({
      where: {
        'username': username
      }
    }).then(function (user) {
      if (user == null) {
        return done(null, false, { message: 'Incorrect credentials.' })
      }

      let hashedPassword = bcrypt.hashSync(password, user.salt)

      if (user.password === hashedPassword) {
        return done(null, user)
      }

      return done(null, false, { message: 'Incorrect credentials.' })
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  model.User.findOne({
    where: {
      'id': id
    }
  }).then(function (user) {
    if (user == null) {
      done(new Error('Wrong user id.'))
    }

    done(null, user)
  })
})

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
})

app.use(routes);

app.listen(3000, function() {
  console.log("App is running on localhost:3000");
});
