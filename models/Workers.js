const db = require("../config/config");

class Workers {
  constructor(name) {
    this.name = name;
  }
  static getAll() {
    let sql = "SELECT * FROM workers";
    return db.execute(sql);
  }
  static findById(id) {
    let sql = `SELECT * FROM workers WHERE id = '${id}'`;
    return db.execute(sql);
  }
  static delete(id) {
    let sql = `
    DELETE FROM workers
    WHERE id = '${id}'
    `;
    return db.execute(sql);
  }
  add() {
    let sql = ` 
      INSERT INTO workers 
      (w_name)
      VALUES (
          '${this.name}'
      )`;

    return db.execute(sql);
  }
  update(id) {
    let sql = `UPDATE workers 
    SET w_name = '${this.name}',
    WHERE id = '${id}'
    `;
    return db.execute(sql);
  }
}

module.exports = Workers;
