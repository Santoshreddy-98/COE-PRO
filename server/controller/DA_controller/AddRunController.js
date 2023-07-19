// const Run = require("../../modal/DA_model/AddRunDetails");

// // Create a new run with design name, run name, and directory
// // Create a new run with design name, run name, and directory



// exports.createRun = async (req, res) => {
//   try {
//     const { designName, runName, directory, fm, da, dd } = req.body;

//     // Check if the runName already exists
//     const existingRun = await Run.findOne({ runName });
//     if (existingRun) {
//       return res.status(400).json({ error: "Run name already exists" });
//     }

//     const run = new Run({ designName, runName, directory, fm, da, dd });
//     await run.save();
//     res.status(201).json(run);
//   } catch (err) {
//     console.error("Failed to create run:", err);
//     res.status(500).json({ error: "Failed to create run" });
//   }
// };

// // Get all runs with design name, run name, and directory
// exports.getAllRuns = async (req, res) => {
//   try {
//     const runs = await Run.find().select("designName runName directory");
//     res.json(runs);
//   } catch (err) {
//     console.error("Failed to fetch runs:", err);
//     res.status(500).json({ error: "Failed to fetch runs" });
//   }
// };


const Run = require("../../modal/DA_model/AddRunDetails");
const Design = require("../../modal/MasterDocument");
const DesignVariable = require("../../modal/MasterDocument");
const MasterDocument = require("../../modal/MasterDocument");

exports.createRun = async (req, res) => {
  try {
    const { designName, runName, directory, fm, da, dd } = req.body;

    // Check if the runName already exists
    const existingRun = await Run.findOne({ runName });
    if (existingRun) {
      return res.status(400).json({ error: "Run name already exists" });
    }

    const run = new Run({ designName, runName, directory, fm, da, dd });
    await run.save();

    // Create a master document and associate the run ID
    const masterDocument = new MasterDocument({ addRun: run._id });
    await masterDocument.save();

    res.status(201).json(masterDocument);
  } catch (err) {
    console.error("Failed to create run:", err);
    res.status(500).json({ error: "Failed to create run" });
  }
};

exports.createDesign = async (req, res) => {
  try {
    const { defDirectory, lefDirectory, libDirectory, techDirectory } = req.body.data;

    // Create a new design document
    const design = new Design({
      defDirectory,
      lefDirectory,
      libDirectory,
      techDirectory
    });
    await design.save();

    // Create a master document and associate the design ID
    const masterDocument = new MasterDocument({ designModel: design._id });
    await masterDocument.save();

    res.status(201).json(masterDocument);
  } catch (err) {
    console.error("Failed to create design:", err);
    res.status(500).json({ error: "Failed to create design" });
  }
};

exports.createDesignVariable = async (req, res) => {
  try {
    const { design, num_cpu, power_opt, gen_eff } = req.body;

    // Create a new design variable document
    const designVariable = new DesignVariable({
      design,
      num_cpu,
      power_opt,
      gen_eff
    });
    await designVariable.save();

    // Create a master document and associate the design variable ID
    const masterDocument = new MasterDocument({ designVariable: designVariable._id });
    await masterDocument.save();

    res.status(201).json(masterDocument);
  } catch (err) {
    console.error("Failed to create design variable:", err);
    res.status(500).json({ error: "Failed to create design variable" });
  }
};

exports.getAllRuns = async (req, res) => {
  try {
    const runs = await Run.find().select("designName runName directory");
    res.json(runs);
  } catch (err) {
    console.error("Failed to fetch runs:", err);
    res.status(500).json({ error: "Failed to fetch runs" });
  }
};
