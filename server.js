require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./authToken/auth-router.js");
const usersRouter = require("./users2/user-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
// module.exports = server;
