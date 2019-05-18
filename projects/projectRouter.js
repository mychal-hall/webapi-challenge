const express = require("express");

const Projects = require("../data/helpers/projectModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error receiving the projects"
    });
  }
});

router.get("/:id", validateProjectId, async (req, res) => {
  res.status(200).json(res.project);
});

router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    const count = await Projects.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({
        message: "The project is gone forever."
      });
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error removing the project" });
  }
});

router.put("/:id", validateProjectId, async (req, res) => {
  try {
    const project = await Projects.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erorr updating the project!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = await Projects.insert(req.body);
    if (!req.body.name || !req.body.description) {
      res.status(400).json({
        message: "Please provide a name and description for the project"
      });
    } else {
      res.status(201).json(project);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "There was an error while saving the project" });
  }
});

// Middleware

async function validateProjectId(req, res, next) {
  if (req.body && Object.keys(req.body).length) {
    if (req.body.name !== "" && req.body.description !== "") {
      next();
    } else {
      res
        .status(400)
        .json({ message: "Error -- Please missing name or description" });
    }
  } else {
    res.status(400).json({ message: "Missing project information" });
  }
}
module.exports = router;
