const express = require("express");
const app = express();

// const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
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
app.use(cookieParser());
app.use(compression());

// app.use(morgan("dev"));
app.use(cors());

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/comment", commentRouter);
app.use("/bookmark", bookmarkRouter);
app.use("/recent", recentRouter);

module.exports = app;
