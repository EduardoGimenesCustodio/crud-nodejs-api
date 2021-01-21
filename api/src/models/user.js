const db = require('../../config/dbConnection');

module.exports = class User {
    constructor() {
        
    }
  
    static getUsers() {
        return db.execute('select * from user');
    }

    static getUser(id_user) {
        return db.execute('select * from user where id_user = ?', [id_user]);
    }
  
    static addUser(user) {
        return db.execute('insert into user(name_user, email_user, password_user) values("'+user.name_user+'", "'+user.email_user+'", "'+user.password_user+'")');
    }
  
    static editUser(user) {
        return db.execute('update user set name_user = "'+user.name_user+'", email_user = "'+user.email_user+'", password_user = "'+user.password_user+'" where id_user = '+user.id_user);
    }
  
    static deleteUser(id_user) {
        return db.execute('delete from user where id_user = ?', [id_user]);
    }
};