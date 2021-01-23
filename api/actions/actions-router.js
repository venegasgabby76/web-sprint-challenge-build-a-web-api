// Write your "actions" router here!
const express = require("express");
const actions = require("./actions-model");

const router = express.Router();

router.get("/", (req, res) => {
  actions
    .get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "Error getting action",
      });
    });
});

// get projects by id
router.get('/:id', (req, res) => {
    actions
    .get(req.params.id)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(404).json({ message: 'Action not found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the action',
        });
      });
  });

// add a new project
router.post('/', (req, res) => {
    actions
    .insert(req.body)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the new action',
        });
      });
  });

  // update a post 
  router.put('/:id', (req, res) => {
    const updateAction = req.body;
    actions
    .update(req.params.id, updateAction)
      .then(action => {
        if (action) {
          res.status(200).json({
              message: "The action has been updated"
          });
        } else {
          res.status(404).json({ message: 'The action could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error updating the action',
        });
      });
  });

  // delete a project
  router.delete('/:id', (req, res) => {
    actions
    .remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The action has been deleted' });
        } else {
          res.status(404).json({ message: 'The action could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error removing the action',
        });
      });
  });


module.exports = router;
