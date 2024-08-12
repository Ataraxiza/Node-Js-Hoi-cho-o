const Post = require('../database/models/post');

module.exports = async (req,res) => {
	if (req.url === '/') { return res.redirect('/home');}
	else if (req.url === '/home') {
		const posts = await Post.find({});
		console.log(req.session);
		console.log(posts);
		return res.render('layouts/home', {posts: posts});}			
}