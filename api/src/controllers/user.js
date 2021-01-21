const User = require('../models/user');

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

exports.addUser = async (req, res, next) => {
    try {
        const addUserResponse = await User.addUser(req.body);
        res.status(201).json(addUserResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.editUser = async (req, res, next) => {
    try {
        const editUserResponse = await User.editUser(req.body);
        res.status(200).json(editUserResponse);
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