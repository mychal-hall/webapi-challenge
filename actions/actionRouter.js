const express = require("express");

const Actions = require("../data/helpers/actionModel.js");

const router = express.Router();


// We are able to get the actions in the db by calling .get at /api/actions

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving the action" });
  }
});

// Posting to the action list requires project_id, description, and notes
router.post("/", validateAction, async (req, res) => {
  try {
    const action = await Actions.insert(req.body);
    res.status(201).json(action);
  } catch (error) {
    res.status(500).json({ message: "Error creating the action." });
  }
});

// Delete function targets the action by ID
router.delete("/:id", async (req, res) => {
  try {
    const count = await Actions.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The action has been destroyed" });
    } else {
      res.status(404).json({ message: "The action does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting the action." });
  }
});

// By touching the id of an action we can update the stored data and modify it
router.put("/:id", validateAction, async (req, res) => {
  try {
    const action = await Actions.update(req.params.id, req.body);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "The action does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating the action" });
  }
});


// Custon Middleware which will check the action against the expected data structure
function validateAction(req, res, next) {
  if (req.body && Object.keys(req.body).length) {
    if (
      req.body.project_id &&
      req.body.description !== "" &&
      req.body.notes !== ""
    ) {
      next();
    } else {
      res.status(400).json({ message: "You're missing some stuff, yo!" });
    }
  } else {
    res.status(400).json({ message: "Missing the stuff doy!" });
  }
}
module.exports = router;
