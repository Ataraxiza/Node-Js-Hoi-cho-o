const Post = require('../database/models/post');

module.exports = async (req,res) => {
	if (req.url === '/') {res.redirect('/home');}
	else if (req.url === '/home') {
		const posts = await Post.find({});
		console.log(posts);
		res.render('layouts/home', {posts: posts});}			
}