const bcrypt = require('bcrypt');
const Account = require('../database/models/account');

module.exports = async (req, res) => {
    const { email, password } = req.body;
    try {
        const account = await Account.findOne({ email });
        if (account) {
            const same = await bcrypt.compare(password, account.password);
            if (same) {
				req.session.accountId = account._id;
                return res.redirect('/');
            } else {
                return res.redirect('/login');
            }
        } else {
            return res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        return res.redirect('/login');
    }
};
