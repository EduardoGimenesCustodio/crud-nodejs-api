const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post('/signup', [
    body('email_user')
        .isEmail()
        .custom(async (email_user) => {
            const user = await User.findEmail(email_user);
            if (user[0].length > 0) {
                const error = new Error('E-mail address already exist!');
                error.statusCode = 401;
                throw error;
            }
        })
        .normalizeEmail()
    ],
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;