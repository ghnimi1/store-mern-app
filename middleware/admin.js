const admin = (req, res) => {
    if (req.user && req.user.isAdmin) {
    } else {
        res.status(401).send('Not authorized as an admin')
    }
}

module.exports = admin