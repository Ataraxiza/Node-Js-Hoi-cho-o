const Post = require('../database/models/post');

module.exports = async (req,res) => { 
	post = await Post.findById(req.params.id);
	console.log(post);
	return res.render('layouts/post', {post: post});}