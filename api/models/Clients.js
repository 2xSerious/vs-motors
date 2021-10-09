const db = require("../config/config");

class Clients {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
  static getAll() {
    let sql = "SELECT * FROM clients";
    return db.execute(sql);
  }
  static findById(id) {
    let sql = `SELECT * FROM clients WHERE id = '${id}'`;
    return db.execute(sql);
  }
  static delete(id) {
    let sql = `
    DELETE FROM clients
    WHERE id = '${id}'
    `;
    return db.execute(sql);
  }
  add() {
    let sql = ` 
      INSERT INTO clients 
      (c_name, phone, email)
      VALUES (
          '${this.name}',
          '${this.phone}',
          '${this.email}'
      )`;
    const newClient = db.execute(sql);
    return newClient;
  }
  update(id) {
    let sql = `UPDATE clients 
    SET phone = '${this.phone}',
        email = '${this.email}'
    WHERE id = '${id}'
    `;
    return db.execute(sql);
  }
}

module.exports = Clients;
