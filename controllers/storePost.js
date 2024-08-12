const path = require('path');
const Post = require('../database/models/post');

module.exports = (req,res) => {
	const {image} = req.files;
	image.mv(path.resolve(__dirname,'..','public/posts', image.name), (err) => {});
	console.log(req.body);
	console.log(req.files);
	Post.create({'username':req.session.accountName,...req.body,image:'/posts/${image.name}'});
	return res.redirect('/');}