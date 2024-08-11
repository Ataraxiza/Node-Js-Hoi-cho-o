const express = require('express');

const engine = require('express-edge');

const mongoose = require('mongoose');

const parser = require('body-parser');

const server = new express();

const homePageController = require('./controllers/homePage');
const aboutPageController = require('./controllers/aboutPage');
const contactPageController = require('./controllers/contactPage');
const createPostController = require('./controllers/createPost');
const storePostController = require('./controllers/storePost');
const individualPostController = require('./controllers/individualPost');
const createAccountController = require('./controllers/createAccount');
const storeRegistrationController = require('./controllers/storeRegistration');
const loginPageController = require('./controllers/loginPage');

const fileUpload = require('express-fileupload');

mongoose.connect('mongodb://localhost/node-js-test-blog');

server.use(express.static('public'));

server.use(engine);
server.set('views', `${__dirname}/views`);

server.use(parser.json());
server.use(parser.urlencoded({ extended: true }));

server.use(fileUpload());

const validationPost = require('./middleware/storePost');
const validationRegistration = require('./middleware/storeRegistration');
server.use('/post/store', validationPost);
server.use('/register/store', validationRegistration);
//----------------------------------------------------------------------//

server.get( '/', homePageController );
server.get( '/home', homePageController );
server.get( '/about', aboutPageController );
server.get( '/contact', contactPageController );
server.get( '/post/new', createPostController );
server.get( '/post/:id', individualPostController );
server.post( '/post/store', storePostController );
server.get( '/registration', createAccountController );
server.post( '/register/store', storeRegistrationController );
server.get( '/login', loginPageController );

server.listen(1234, () => { console.log('Listening on port 1234'); });