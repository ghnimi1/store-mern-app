const express = require('express');
const router = express.Router()
const usersController = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')


router.get('/', auth, usersController.getAllUsers);
router.get('/profile', auth, usersController.getUserProfile);
router.put('/profile', auth, usersController.updateProfile);
router.get('/:id', auth, usersController.getSingleUser);
router.delete('/:id', auth, usersController.removeUser);
router.put('/:id', auth, usersController.updateUser);

module.exports = router