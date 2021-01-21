const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post('/signup', [
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
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;