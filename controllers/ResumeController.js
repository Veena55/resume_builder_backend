const Resume = require("../models/Resume");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const { ObjectId } = require('mongodb');
const createResume = async (req, res) => {
    const { fname, lname, email, mobile, address, portfolio, linkedin_url, github_url, bio, isExperienced, projectVal, skillVal, achievementVal, image, template } = req.body.formData;

    const token = req.body.headers['Authorization'].split(' ')[1];
    // console.log(token);
    const verify_user = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verify_user);
    const userId = await User.findOne({ email: verify_user.email });
    // console.log(userId.id);
    const resume = new Resume({
        userId, fname, lname, address, mobile, email, portfolio, linkedin: linkedin_url, github: github_url, bio, isExperienced, projects: projectVal, skills: skillVal, achievements: achievementVal, image, template
    });
    const result = await resume.save();
    console.log(result);
    if (result) {
        res.status(200).json({ id: result.id, "msg": "Data Save Successfully!" });
    }
}

const getResumeDataById = async (req, res) => {
    const { temp_id } = req.params;
    const objectId = new ObjectId(temp_id);
    console.log(temp_id, "temp_id");
    const result = await Resume.findById(objectId);
    if (result) {
        res.status(200).json({ result });
    }
    console.log(result);

}

module.exports = {
    createResume,
    getResumeDataById
}
