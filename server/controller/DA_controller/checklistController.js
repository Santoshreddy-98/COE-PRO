
const Checklist = require("../../modal/DA_model/Checklist");
const User = require("../../modal/DA_model/user");


exports.createChecklistItem = async (req, res) => {
    try {
      const { userRole } = req.body;
      const { data, pdDev, devComments, pdLead, pdLeadComments } = req.body.answers;
      const questions = req.body.questions.map((question) => question.text);
  
      const questionsObj = new Map();
      questions.forEach((question, index) => {
        questionsObj.set(`question${index + 1}`, question);
      });
  
      const pdDevObj = userRole === 'PD Dev' ? new Map(Object.entries(pdDev)) : undefined;
      const devCommentsObj = userRole === 'PD Dev' ? new Map(Object.entries(devComments)) : undefined;
  
   
      
      const pdLeadObj = userRole === 'PD Lead' ? new Map(Object.entries(pdLead)) : undefined;
      const pdLeadCommentsObj = userRole === 'PD Lead' ? new Map(Object.entries(pdLeadComments)) : undefined;
   
  
      const checklistItem = new Checklist({
        userRole,
        data,
        pdDev: pdDevObj,
        devComments: devCommentsObj,
        pdLead: pdLeadObj,
        pdLeadComments: pdLeadCommentsObj,
        questions: questionsObj,
      });
  
      await checklistItem.save();
      res.status(201).json({ message: 'Checklist item created successfully' });
    } catch (error) {
      console.error('Error creating checklist item:', error);
      res.status(500).json({ error: 'An error occurred while creating the checklist item' });
    }
  };
  

  exports.getAllChecklistItems = async (req, res) => {
    try {
      const pdDevItem = await Checklist.findOne({ userRole: 'PD Dev' }).sort({ _id: -1 }).limit(1);
      const pdLeadItem = await Checklist.findOne({ userRole: 'PD Lead' }).sort({ _id: -1 }).limit(1);
  
      const checklistItems = {
        pdDev: pdDevItem || null,
        pdLead: pdLeadItem || null,
      };
  
      res.status(200).json(checklistItems);
    } catch (error) {
      console.error('Error retrieving checklist items:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.getPDDevChecklistItems = async (req, res) => {
    try {
      const pdDevItem = await Checklist.findOne({ userRole: 'PD Dev' }).sort({ _id: -1 }).limit(1);
  
      if (!pdDevItem) {
        return res.status(404).json({ error: 'No PD Dev checklist item found' });
      }
  
      res.status(200).json(pdDevItem);
    } catch (error) {
      console.error('Error retrieving PD Dev checklist item:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.getPDLeadChecklistItems = async (req, res) => {
    try {
      const pdLeadItem = await Checklist.findOne({ userRole: 'PD Lead' }).sort({ _id: -1 }).limit(1);
  
      if (!pdLeadItem) {
        return res.status(404).json({ error: 'No PD Lead checklist item found' });
      }
  
      res.status(200).json(pdLeadItem);
    } catch (error) {
      console.error('Error retrieving PD Lead checklist item:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  




