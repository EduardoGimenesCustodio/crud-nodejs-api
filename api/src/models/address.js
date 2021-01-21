const db = require('../../config/dbConnection');

module.exports = class Address {
    constructor() {
        
    }

    static getAddresses() {
        return db.execute('select * from address');
    }

    static getUserAddresses(user_address) {
        return db.execute('select * from address where user_address = ?', [user_address]);
    }
  
    static addAddress(address) {
        return db.execute('insert into address(address, user_address) values("'+address.address+'", "'+address.user_address+'")');
    }
  
    static editAddress(address) {
        return db.execute('update address set address="'+address.address+'" where id_address = '+address.id_address);
    }
  
    static deleteAddress(id_address) {
        return db.execute('delete from address where id_address = ?', [id_address]);
    }
};