const express = require("express");
const app = express();

const passport = require("passport");
var session = require("express-session");
const cors = require("cors");

const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const authRouter = require("./src/routers/auth");
const userRouter = require("./src/routers/user");
const commentRouter = require("./src/routers/comment");
const bookmarkRouter = require("./src/routers/bookmark");
const recentRouter = require("./src/routers/recent");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "https://accounts.google.com",
    ],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);

// For Passport
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      expires: 1000 * 60 * 60 * 24 * 7,
    },
  })
); // session secret

app.use(passport.session());
app.use(passport.initialize());
require("./src/config/passport")(passport);

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/comment", commentRouter);
app.use("/bookmark", bookmarkRouter);
app.use("/recent", recentRouter);

module.exports = app;
