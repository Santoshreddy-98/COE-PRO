const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const DesignVariable = require('./modal/FM_model/DesignVariable');
const Design = require('./modal/FM_model/DesignModel');
const userRouter = require('./router/DA_router/userRouter');
const addrunRouter = require('./router/DA_router/AddRunRouter')
const createDesign = require('./router/DA_router/AddRunRouter')
const createDesignVariable = require('./router/DA_router/AddRunRouter')
const landingRouter = require('./router/DD_router/LandingRouter')
const checklistRoutes = require('./router/DA_router/checklistRoutes')
const app = express();

const port = 5000;

app.use(cors());




// Connect to MongoDB

mongoose.connect('mongodb+srv://DesignAudit:DesignAudit@designaudit.161n4ok.mongodb.net/?retryWrites=true&w=majority', {

  useNewUrlParser: true,

  useUnifiedTopology: true,

}).then(() => {
console.log('Connected to MongoDB');
}).catch((error) => {
console.error('Failed to connect to MongoDB', error);
});




// Middleware to parse request bodies as JSON

app.use(express.json());
app.use(bodyParser.json());

// Routes

app.use('/api', userRouter);
app.use('/api', addrunRouter);
app.use('/api', landingRouter);
app.use('/api', createDesign);
app.use('/api', createDesignVariable);
app.use('/api', checklistRoutes);

// //validate given directories
app.post('/validate-directories', (req, res) => {
  const { defDirectory, lefDirectory, libDirectory, techDirectory } = req.body;
  console.log('Request received:', req.body);

  const directories = [
    { name: 'DEF', path: defDirectory, extension: '.def' },
    { name: 'LEF', path: lefDirectory, extension: '.lef' },
    { name: 'LIB', path: libDirectory, extension: '.lib' },
    { name: 'Tech', path: techDirectory, extension: '.tech' }
  ];
  console.log('Directories:', directories);

  const validationResults = directories.map(directory => {
    try {
      const stats = fs.statSync(directory.path);
      console.log(`Stats for ${directory.name}:`, stats);
      if (stats.isFile() && directory.path.endsWith(directory.extension)) {
        // If the provided path is a file and has the required extension
        return { name: directory.name, isValid: true };
      } else {
        // If the provided path is not a file or does not have the required extension
        return { name: directory.name, isValid: false };
      }
    } catch (err) {
      console.error(`Error validating ${directory.name}:`, err);
      return { name: directory.name, isValid: false };
    }
  });

  console.log('Validation results:', validationResults);
  res.json(validationResults);
});

// //save paths
// app.post('/save-path', async (req, res) => {
//   const { defDirectory, lefDirectory, libDirectory, techDirectory } = req.body.data;
//   const frontendDataId = req.body.dataId
//   // Create a new design document
//   const design = new Design({
//     defDirectory,
//     lefDirectory,
//     libDirectory,
//     techDirectory
//   });
//   console.log(frontendDataId, defDirectory, lefDirectory, libDirectory, techDirectory)

//   // Save the design document to the database
//   try {
//      await design.save();
//     res.status(201).json({ message: 'Design saved successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// //get paths
// app.get('/designs', async (req, res) => {
//   try {
//     // Fetch all the design documents from the database
//     const designs = await Design.find();

//     res.json(designs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// //save variables
// app.post('/save-design-variable', async (req, res) => {
//   const { design, num_cpu, power_opt, gen_eff } = req.body;

//   // Create a new design variable document
//   const designVariable = new DesignVariable({
//     design,
//     num_cpu,
//     power_opt,
//     gen_eff
//   });

//   // Save the design variable document to the database
//   try {
//     await designVariable.save();
//     res.status(201).json({ message: 'Design variable saved successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get('/design-paths', async (req, res) => {
//   try {
//     const designs = await Design.find();
//     res.status(200).json(designs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get('/design-variables', async (req, res) => {
//   try {
//     const designVariables = await DesignVariable.find();
//     res.status(200).json(designVariables);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Start the server

app.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});