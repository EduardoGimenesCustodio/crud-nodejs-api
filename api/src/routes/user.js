const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

const { body } = require('express-validator');

const User = require('../models/user');

router.get('/', userController.getUsers);

router.get('/:id_user', userController.getUser);

router.put('/', [
    body('email_user')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom(async (email_user, res) => {
            const id_user = res.req.body.id_user;
            const user = await User.findEmail(email_user);
            if (user[0].length > 0) {
                if(user[0][0].id_user != id_user)
                {
                    return;
                }
            }
        })
        .normalizeEmail(),
    ],
    userController.editUser
);

router.delete('/:id_user', userController.deleteUser);

module.exports = router;