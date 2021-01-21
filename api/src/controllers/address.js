const Address = require('../models/address');

exports.getAddresses = async (req, res, next) => {
    try {
        const [addresses] = await Address.getAddresses();
        res.status(200).json(addresses);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getUserAddresses = async (req, res, next) => {
    try {
        const [addresses] = await Address.getUserAddresses(req.params.user_address);
        res.status(200).json(addresses);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addAddress = async (req, res, next) => {
    try {
        const addAddressResponse = await Address.addAddress(req.body);
        res.status(201).json(addAddressResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.editAddress = async (req, res, next) => {
    try {
        const editAddressResponse = await Address.editAddress(req.body);
        res.status(200).json(editAddressResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteAddress = async (req, res, next) => {
    try {
        const deleteAddressResponse = await Address.deleteAddress(req.params.id_address);
        res.status(200).json(deleteAddressResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};