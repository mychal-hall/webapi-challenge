const express = require("express");

const server = express();

// Bringing in our various router files.
const ProjectRouter = require("./projects/projectRouter.js");
const ActionRouter = require("./actions/actionRouter.js");

// Aloowing our server to receive data
server.use(express.json());

// Setting up our routers with some default endpoints
server.use("/api/projects", ProjectRouter);
server.use("/api/actions", ActionRouter);
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


// Logging function to monitor what is being done on the server
function logger(req, res, next) {
  const time = new Date();
  console.log(`${req.method} Request`, time, `${req.url}`);
  next();
}

module.exports = server;
