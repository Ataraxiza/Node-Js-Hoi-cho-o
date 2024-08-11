module.exports = (req, res, next) => {
	if ( !req.body.username || !req.body.email || !req.body.password )
		{return res.redirect('/registration');}
	next(); }