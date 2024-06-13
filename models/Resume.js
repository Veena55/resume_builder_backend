const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    address: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    portfolio: {
        type: String
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    },
    bio: {
        type: String
    },
    isExperienced: {
        type: Boolean,
    },
    projects: {
        type: [{}],
        default: []
    },
    skills: {
        type: [{}],
        default: []
    },
    achievements: {
        type: [{}],
        default: []
    },
    image: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    template: {
        type: String
    }
});

module.exports = mongoose.model('Resume', resumeSchema);