const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const accountSchema = new mongoose.Schema({
	'username': {type: String, required: true, unique: true},
	'email': {type: String, required: true, unique: true},
	'password': {type: String, required: true}});

accountSchema.pre('save', function(next){
	const account = this;
	bcrypt.hash(user.password, 10, function(err, encrypted){
		user.password = encrypted;
		next(); }) //call next so that the mongoose can continue creating the account data
	}
)

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;