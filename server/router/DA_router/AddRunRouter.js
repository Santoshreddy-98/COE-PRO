// const express = require('express');
// const router = express.Router();
// const runController = require('../controller/DA_controller/AddRunController');

// // Create a new run with design name, run name, and directory
// router.post('/CreateAddRun', runController.createRun);

// // Get all runs with design name, run name, and directory
// router.get('/GetAddRun', runController.getAllRuns);

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
  createRun,
  createDesign,
  createDesignVariable,
  getAllRuns
} = require('../../controller/DA_controller/AddRunController');

// Create a new run
router.post('/runs', createRun);

// Create a new design
router.post('/save-path', createDesign);

// Create a new design variable
router.post('/save-design-variable', createDesignVariable);

// Get all runs
router.get('/runs', getAllRuns);

module.exports = router;


