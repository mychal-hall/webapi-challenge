const express = require("express");

const server = express();

server.use(express.json());
server.use(logger);

function logger(req, res, next) {
  const time = new Date();
  console.log(`${req.method} Request`, time, `${req.url}`);
  next();
}

module.exports = server;
