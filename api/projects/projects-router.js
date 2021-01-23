// Write your "projects" router here!
const express = require("express");
const projects = require("./projects-model");

const router = express.Router();

// get projects
router.get("/", (req, res) => {
  projects
    .get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "Error getting projects",
      });
    });
});

// get projects by id
router.get('/:id', (req, res) => {
    projects
    .get(req.params.id)
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({ message: 'Project not found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the project',
        });
      });
  });

  // get projects actions by id
  router.get('/:id/actions', (req, res) => {
    projects
    .getProjectActions(req.params.id)
        .then(project => {
            if (project.length > 0) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'No action for this project' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving the action for this project',
            });
        });
});


// add a new project
router.post('/', (req, res) => {
    projects
    .insert(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the new project',
        });
      });
  });

  // update a post 
  router.put('/:id', (req, res) => {
    const updateProject = req.body;
    projects
    .update(req.params.id, updateProject)
      .then(project => {
        if (project) {
          res.status(200).json({
              message: "The project has been updated"
          });
        } else {
          res.status(404).json({ message: 'The project could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error updating the project',
        });
      });
  });

  // delete a project
  router.delete('/:id', (req, res) => {
    projects
    .remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The project has been deleted' });
        } else {
          res.status(404).json({ message: 'The project could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error removing the project',
        });
      });
  });


module.exports = router;
