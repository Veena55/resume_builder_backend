const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const ResumeController = require('../controllers/ResumeController');
// const getResumeDataById = require('../controllers/ResumeController');

router.get('/', (req, res) => {
    res.send("Hi Resume route");
});

router.post('/create', ResumeController.createResume);
router.get('/resume_details/:temp_id', ResumeController.getResumeDataById);

module.exports = router;