const User = require('../models/user.model');
const generateToken = require('../utils/jwt');

// GET ALL USERS
const getAllUsers = async (req, res) => {
    const users = await User.find({}).select('-password')
    res.status(200).json(users)
}
// GET SINGLE USER
const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).select('-password')
        //if (!user) { res.status(400).json(`No user with id : ${req.params.id}`) }
        res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
// UPDATE USER
const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    try {
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.isAdmin = req.body.isAdmin
        }
        const updatedUser = await user.save()
        res.status(201).send(updatedUser)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
// REMOVE USER
const removeUser = async (req, res) => {
    try {
        await User.findByIdAndRemove({ _id: req.params.id })
        res.status(201).send('User removed')
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
// USER PROFILE
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ user: req.user.id })
        if (!user) {
            res.status(404).send('not User')
        }
        res.status(201).send(req.user)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
// UPDATE PROFILE
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if (req.body.password) {
                user.password = req.body.password
            }
            const updatedUser = await user.save()
            res.status(201).send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id)
            })
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = {
    getAllUsers,
    getSingleUser,
    getUserProfile,
    updateProfile,
    updateUser,
    removeUser,
}