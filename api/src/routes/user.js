const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:id_user', userController.getUser);

router.post('/', userController.addUser);

router.put('/', userController.editUser);

router.delete('/:id_user', userController.deleteUser);

module.exports = router;