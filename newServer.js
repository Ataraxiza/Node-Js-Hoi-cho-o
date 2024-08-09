const express = require('express');

const engine = require('express-edge');

const mongoose = require('mongoose');

const path = require('path');

const server = new express();

const parser = require('body-parser');

const Post = require('./database/models/post');

const fileUpload = require('express-fileupload');

const validation = (req, res, next) => {
	if (!req.files.image || !req.body.title || !req.body.description || !req.body.content || !req.body.username)
	{return res.redirect('/post/new');}
	next(); };

mongoose.connect('mongodb://localhost/node-js-test-blog');

server.use(express.static('public'));

server.use(engine);
server.set('views', `${__dirname}/views`);

server.use(parser.json());
server.use(parser.urlencoded({ extended: false }));

server.use(fileUpload());

//----------------------------------------------------------------------//

server.get( '/', (req,res) => {res.redirect('/home');} );
    server.get( '/home', async (req,res) => {
	const posts = await Post.find({});
	console.log(posts);
	res.render('layouts/home', {posts: posts});} );
//	res.render('layouts/home');} );
server.get( '/about', (req,res) => {res.render('layouts/about');} );
server.get( '/contact', (req,res) => {res.render('layouts/contact');} );
server.get( '/post', (req,res) => {res.render('layouts/post');} );
server.get( '/post/new', (req,res) => {res.render('layouts/new');} );
server.post( '/post/store',(req,res) => {
	console.log(req.body);
	console.log(req.files);
	const {image} = req.files;
	image.mv(path.resolve(__dirname,'public/posts', image.name), (err) => {});
	Post.create({...req.body,image:'/posts/${image.name}'});
	res.redirect('/home');} );
server.get( '/post/:id', async (req,res) => { 
	post = await Post.findById(req.params.id);
	console.log(post);
	res.render('layouts/post', {post: post});} );

// server.get( '/post/:id', async (req,res) => { 
//	posts = await Post.find({});   khong duoc dat cau nay o day! Phai tim duoc title, description, content cua cac post do o trang /home de co duong dan
//	console.log(posts);} );
//	res.render('layouts/post', {posts: posts});} );

server.listen(1234, () => { console.log('Listening on port 1234'); });
//Sua file