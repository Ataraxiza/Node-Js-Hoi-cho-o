const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	'username': String,
	'title': String,
	'description': String,
	'content': String,
	'createdAt': {type: Date, default: new Date()},
	'image': String });
//create a schema (structure of a document) called postSchema.

const Post = mongoose.model('Post', postSchema);
//'Post' is now a model created based on postSchema. We also say that 'Post' is a collection that contains documents which has attributes of postSchema.

module.exports = Post;