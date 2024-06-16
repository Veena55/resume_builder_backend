const Resume = require("../models/Resume");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const { ObjectId } = require('mongodb');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createResume = async (req, res) => {
    console.log("hi", req.body);
    try {
        const { fname, lname, email, mobile, address, portfolio, linkedin_url, github_url, bio, isExperienced, projectVal, skillVal, achievementVal, template } = req.body.data;
        const userId = await User.findOne({ email });
        const resume = new Resume({
            userId, fname, lname, address, mobile, email, portfolio, linkedin: linkedin_url, github: github_url, bio, isExperienced, projects: projectVal, skills: skillVal, achievements: achievementVal, template
        });
        const result = await resume.save();
        // console.log(result);
        if (result) {
            res.status(200).json({ id: result.id, "msg": "Data Save Successfully!" });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json("Error")
    }

}

const getResumeDataById = async (req, res) => {
    try {
        const { temp_id } = req.params;
        const objectId = new ObjectId(temp_id);
        const user_id = new ObjectId(req.user.id);
        const result = await Resume.findOne({ _id: objectId });
        if (result) {
            res.status(200).json({ result });
        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token!" })
    }
}

module.exports = {
    createResume,
    getResumeDataById
}
