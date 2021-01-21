const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:id_user', userController.getUser);

router.put('/', [
    body('name_user').trim().not().isEmpty(),
    body('email_user')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom(async (email_user) => {
            const user = await User.findEmail(email_user);
            if (user[0].length > 0) {
                return Promise.reject('E-mail address already exist!');
            }
        })
        .normalizeEmail(),
    body('password_user').trim().isLength({ min: 5 }),
    ],
    userController.editUser
);

router.delete('/:id_user', userController.deleteUser);

module.exports = router;