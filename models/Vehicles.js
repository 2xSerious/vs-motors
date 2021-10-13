const db = require("../config/config");

class Vehicles {
  constructor(make, model, year, reg, ownerId) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.reg = reg;
    this.ownerId = ownerId;
  }
  static getAll() {
    let sql =
      "SELECT vehicles.id, make, model, year, reg_num, clients.id as customerId, c_name FROM vehicles, clients WHERE vehicles.customer_id = clients.id ";
    return db.execute(sql);
  }
  static getByCustomerId(id) {
    let sql = `SELECT * FROM vehicles WHERE customer_id = ${id}`;
    return db.execute(sql);
  }
  static findById(id) {
    let sql = `SELECT * FROM vehicles WHERE id = '${id}'`;
    return db.execute(sql);
  }
  static delete(id) {
    let sql = `
    DELETE FROM vehicles
    WHERE id = '${id}'
    `;
    return db.execute(sql);
  }
  add() {
    let sql = ` 
      INSERT INTO vehicles 
      (make, model, year, reg_num, customer_id)
      VALUES (
          '${this.make}',
          '${this.model}',
          '${this.year}',
          '${this.reg}',
          '${this.ownerId}'
      )`;
    return db.execute(sql);
  }
  update(id) {
    let sql = `UPDATE vehicles 
    SET make = '${this.make}',
        model = '${this.model}',
        year = '${this.year}',
        reg_num = '${this.reg}',
        customer_id = '${this.ownerId}'
    WHERE id = '${id}'
    `;
    return db.execute(sql);
  }
}

module.exports = Vehicles;
