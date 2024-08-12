const express = require('express');

const engine = require('express-edge');

const mongoose = require('mongoose');

const parser = require('body-parser');

const session = require('express-session');

const server = new express();

const fileUpload = require('express-fileupload');

const homePageController = require('./controllers/homePage');
const aboutPageController = require('./controllers/aboutPage');
const contactPageController = require('./controllers/contactPage');
const createPostController = require('./controllers/createPost');
const storePostController = require('./controllers/storePost');
const individualPostController = require('./controllers/individualPost');
const createAccountController = require('./controllers/createAccount');
const storeRegistrationController = require('./controllers/storeRegistration');
const loginPageController = require('./controllers/loginPage');
const storeLoginController = require('./controllers/storeLogin');

mongoose.connect('mongodb://localhost/node-js-test-blog');

server.use(express.static('public'));

server.use(engine);
server.set('views', `${__dirname}/views`);

server.use(parser.json());
server.use(parser.urlencoded({ extended: true }));

server.use(fileUpload());

server.use(session({
	secret: 'secret'})
	);

const validationPost = require('./middleware/storePost'); // custom middleware
const validationRegistration = require('./middleware/storeRegistration'); //custom middleware
server.use('/post/store', validationPost);
server.use('/registration/store', validationRegistration);
//----------------------------------------------------------------------//

server.get( '/', homePageController );
server.get( '/home', homePageController );
server.get( '/about', aboutPageController );
server.get( '/contact', contactPageController );
server.get( '/post/new', createPostController );
server.get( '/post/:id', individualPostController );
server.post( '/post/store', storePostController );
server.get( '/registration', createAccountController );
server.post( '/registration/store', storeRegistrationController );
server.get( '/login', loginPageController );
server.post( '/login/store', storeLoginController );

server.listen(1234, () => { return console.log('Listening on port 1234'); });