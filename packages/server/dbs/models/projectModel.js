
const Mongoose = require('../mongo');
const Schema = Mongoose.Schema;
const projectSchema = new Schema({
    name: String,
    gitUrl: String,
    token: String,
    repo: String,
})

module.exports = Mongoose.model('Project', projectSchema, 'project')