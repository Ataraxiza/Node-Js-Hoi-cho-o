const path = require('path');
const Account = require('../database/models/account');

module.exports = (req,res) => {
	console.log(req.body);
	Account.create(req.body);
	res.redirect('/');}