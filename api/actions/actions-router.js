// Write your "actions" router here!
const express = require("express");
const db = require("./actions-model");

const router = express.Router();

// get actions
router.get("/", async (req,res) => {
    try {
        const actions = await db.get()
        res.status(201).json(actions);
    } catch {
        res.status(500).json({ message : "server not working"})
    }
})

// get action by id
router.get("/:id" , async (req,res) => {
    const { id } = req.params;
    try {
        const actions = await db.get(id)
        res.status(201).json(actions);
    } catch {
        res.status(500).json({ message : "server not working"})
    }
})

//post a new action
router.post("/", (req, res) => {
    db.insert(req.body)
      .then(actions => {
        res.status(201).json(actions);
      })
      .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error adding the action',
        });
      });
  });

module.exports = router;
