const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let newsSchema = new Schema({
	title: {type: String},
	story_title: {type: String},
	url: {type: String},
	story_url: {type: String},
	author: {type: String},
	created_at: {type: Date},
	story_id: {type: Number, unique: true},
	erased: {type: Boolean, default: false}
});

let News = mongoose.model('HackerNews', newsSchema);

module.exports = News;

