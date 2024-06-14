const Resume = require("../models/Resume");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const { ObjectId } = require('mongodb');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createResume = async (req, res) => {
    const { fname, lname, email, mobile, address, portfolio, linkedin_url, github_url, bio, isExperienced, projectVal, skillVal, achievementVal, image, template } = req.body.data;

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
    let userId = '';
    // console.log(req.headers['authorization']);
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    // Decode the token header to determine its type
    const decodedHeader = jwt.decode(token, { complete: true });
    if (!decodedHeader) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    try {
        if (decodedHeader.header.alg.startsWith('RS')) {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            console.log(payload, "payload1");
            userId = payload.sub;
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.sub;
            console.log(decoded.sub, userId, "payload2");
        }
        // console.log(token);
        const objectId = new ObjectId(temp_id);
        const user_id = new ObjectId(userId);
        // console.log(user_id, "temp_id");
        const result = await Resume.findOne({ _id: objectId });
        if (result) {
            res.status(200).json({ result });
        }
        console.log(result, "hi");
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token!" })
    }
}

module.exports = {
    createResume,
    getResumeDataById
}
