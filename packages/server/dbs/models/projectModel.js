
const Mongoose = require('../mongo');
const Schema = Mongoose.Schema;
const mongoose = require('mongoose')
const AutoIncrementFactory = require('mongoose-sequence');

const connection =  mongoose.connection

const AutoIncrement = AutoIncrementFactory(connection);

const FeatureSchema = new Schema({
    title: String,
    oldHash: String,
    newHash: String,
    status: String, // 0: untested, 1: passed, 2: failed
    coverRawData: String, // coverage raw data
});

// FeatureSchema.plugin(AutoIncrement, {inc_field: 'featureId'});


// FeatureSchema.plugin(autoIncrement.plugin, {
//     model: 'Feature',
//     field: 'featureId',
//     startAt: 1,
//     incrementBy: 1
// });


const projectSchema = new Schema({
    name: String,
    gitUrl: String,
    token: String,
    repo: String,
    features: [FeatureSchema]
})




module.exports = Mongoose.model('Project', projectSchema, 'project')