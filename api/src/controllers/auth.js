const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return;

    const name_user = req.body.name_user;
    const email_user = req.body.email_user;
    const password_user = req.body.password_user;

    try {
        const hashedPasswordUser = await bcrypt.hash(password_user, 12);

        const user = {
            name_user: name_user,
            email_user: email_user,
            password_user: hashedPasswordUser,
        };

        const result = await User.addUser(user);

        res.status(201).json({ message: 'User registered!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const email_user = req.body.email_user;
    const password_user = req.body.password_user;

    try {
        const user = await User.findEmail(email_user);

        if (user[0].length !== 1) {
            const error = new Error('A user with this e-mail could not be found.');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];

        const isEqual = await bcrypt.compare(password_user, storedUser.password_user);

        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                email_user: storedUser.email_user,
                id_user: storedUser.id_user,
            },
            'secretfortoken',
            { expiresIn: '1h' }
        );
        
        res.status(200).json({ token: token, id_user: storedUser.id_user });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};