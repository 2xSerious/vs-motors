const db = require("../config/config");

class Suppliers {
  constructor(name) {
    this.name = name;
  }
  static getAll() {
    let sql = "SELECT * FROM suppliers";
    return db.execute(sql);
  }
  static findById(id) {
    let sql = `SELECT * FROM suppliers WHERE id = '${id}'`;
    return db.execute(sql);
  }
  static delete(id) {
    let sql = `
    DELETE FROM suppliers
    WHERE id = '${id}'
    `;
    return db.execute(sql);
  }
  add() {
    let sql = ` 
      INSERT INTO suppliers 
      (s_name)
      VALUES (
          '${this.name}'
      )`;
    const newClient = db.execute(sql);
    return newClient;
  }
  update(id) {
    let sql = `UPDATE suppliers 
    SET s_name = '${this.name}',
    WHERE id = '${id}'
    `;
    return db.execute(sql);
  }
}

module.exports = Suppliers;
