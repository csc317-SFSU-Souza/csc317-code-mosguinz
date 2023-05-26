require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const favicon = require('serve-favicon');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const handlebars = require("express-handlebars");
const sessions = require("express-session");
const flash = require("express-flash");
const mySqlStore = require("express-mysql-session")(sessions);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const app = express();

app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname, "views/layouts"), //where to look for layouts
        partialsDir: path.join(__dirname, "views/partials"), // where to look for partials
        extname: ".hbs", //expected file extension for handlebars files
        defaultLayout: "layout", //default layout for app, general template for all pages in app
        helpers: {
            /**
             * Checks if an object is a non-empty object
             * @param   {Object}    obj
             * @returns {boolean}
             */
            nonEmpty: (obj) => {
                return (
                    obj
                    && obj.constructor === Object
                    && Object.keys(obj.length) > 0
                );
            },
            /**
             * Format a valid date representation. Defaults to full date
             * and time format.
             * @param   {any}   dt
             * @param   {Intl.DateTimeFormatOptions?}   options
             */
            formatDate: (dt, options = undefined) => {
                return new Date(dt).toLocaleDateString(undefined, options || {
                    dateStyle: "long",
                    timeStyle: "medium"
                });
            }
        }
    })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

const sessionStore = new mySqlStore({}, require("./conf/database"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("123"));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules", "bootstrap")));

app.use("ffmpeg", express.static(path.join(__dirname, "node_modules", "ffmpeg-static", "ffmpeg")));


app.use(sessions({
    secret: "123",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));
app.use(flash());

app.use((req, res, next) => {
    // console.log(req.session);
    if (req.session.user) {
        res.locals.isLoggedIn = true;
        res.locals.user = req.session.user;
    }
    next();
});

app.use("/", indexRouter); // route middleware from ./routes/index.js
app.use("/users", usersRouter); // route middleware from ./routes/users.js
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);


/**
 * Catch all route, if we get to here then the
 * resource requested could not be found.
 */
app.use((req, res, next) => {
    next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
})


/**
 * Error Handler, used to render the error html file
 * with relevant error information.
 */
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;
    console.log(err);
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
