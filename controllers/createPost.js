module.exports = (req,res) => {
	if (req.session.accountId){
		return res.render('layouts/newpost');
	}
	return res.redirect('/login');
}