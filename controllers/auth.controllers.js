const User = require('../models/user.model');
const generateToken = require('../utils/jwt');

//REGISTER
const register = async (req, res) => {
    try {
        const { name, email, isAdmin, password } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) res.status(404).send({ msg: 'User already Exists' })
        const newUser = new User({
            name, email, isAdmin, password
        })
        // Save mongodb
        await newUser.save()
        if (newUser) {
            // status 201 means sth was CREATED
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                isAdmin: newUser.isAdmin,
                email: newUser.email,
                token: generateToken(newUser._id) // We want to authenticate right after we register
            })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: "User does not exist." })

        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password." })
        if (user) return res.json({
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = {
    register,
    login,
}