const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter');
const addrunRouter = require('./router/AddRunRouter')
const app = express();
const port = 5000;
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://DesignAudit:DesignAudit@designaudit.161n4ok.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Middleware to parse request bodies as JSON
app.use(express.json());

// Routes
app.use('/api', userRouter);
app.use('/api', addrunRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
