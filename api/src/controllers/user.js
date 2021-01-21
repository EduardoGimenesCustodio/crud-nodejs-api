const User = require('../models/user');

const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res, next) => {
    try {
        const [users] = await User.getUsers();
        res.status(200).json(users);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const [user] = await User.getUser(req.params.id_user);
        res.status(200).json(user);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.editUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return;

    const id_user = req.body.id_user;
    const name_user = req.body.name_user;
    const email_user = req.body.email_user;
    const password_user = req.body.password_user;

    try {
        const hashedPasswordUser = await bcrypt.hash(password_user, 12);

        const user = {
            id_user: id_user,
            name_user: name_user,
            email_user: email_user,
            password_user: hashedPasswordUser,
        };

        const result = await User.editUser(user);

        res.status(201).json({ message: 'User edited!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const deleteUserResponse = await User.deleteUser(req.params.id_user);
        res.status(200).json(deleteUserResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};