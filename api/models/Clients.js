const db = require("../config/config");

class Clients {
  constructor(name, phone, email, address, city, postcode, country) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.city = city;
    this.postcode = postcode;
    this.country = country;
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
      (c_name, phone, email, street_address, city, postcode, country)
      VALUES (
          '${this.name}',
          '${this.phone}',
          '${this.email}',
          '${this.address}',
          '${this.city}',
          '${this.postcode}',
          '${this.country}'
      )`;
    const newClient = db.execute(sql);
    return newClient;
  }
  update(id) {
    let sql = `UPDATE clients 
    SET phone = '${this.phone}',
        email = '${this.email}',
        street_address = '${this.address}',
        city = '${this.city}',
        postcode = '${this.postcode}',
        country = '${this.country}'
    WHERE id = '${id}'
    `;
    return db.execute(sql);
  }
}

module.exports = Clients;
