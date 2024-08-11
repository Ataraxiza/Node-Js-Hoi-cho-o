module.exports = (req, res, next) => {
	if ( !req.files.image|| !req.body.title || !req.body.description || !req.body.content || !req.body.username) //bo !req.files.image thi hoat dong
		{return res.redirect('/post/new');}
	return next(); }