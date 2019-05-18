const express = require("express");

const server = express();

const ProjectRouter = require("./projects/projectRouter.js");

server.use(express.json());
server.use("/api/projects", ProjectRouter);
server.use(logger);

server.get("/", (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });

function logger(req, res, next) {
  const time = new Date();
  console.log(`${req.method} Request`, time, `${req.url}`);
  next();
}

module.exports = server;
