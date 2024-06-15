const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const ResumeController = require('../controllers/ResumeController');
const checkAuth = require('../controllers/AuthController');

router.post('/create', checkAuth, ResumeController.createResume);
router.get('/resume_details/:temp_id', checkAuth, ResumeController.getResumeDataById);

module.exports = router;