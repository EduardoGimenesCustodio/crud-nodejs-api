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
                return;
            }
        })
        .normalizeEmail()
    ],
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;