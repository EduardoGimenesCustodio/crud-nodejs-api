const express = require('express');

const addressController = require('../controllers/address');

const router = express.Router();

router.get('/', addressController.getAddresses);

router.get('/:user_address', addressController.getUserAddresses);

router.post('/', addressController.addAddress);

router.put('/', addressController.editAddress);

router.delete('/:id_address', addressController.deleteAddress);

module.exports = router;