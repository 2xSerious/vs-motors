const db = require("../config/config");

class Parts {
  constructor(part, supplier, client) {
    this.part = part;
    this.supplier = supplier;
    this.client = client;
  }
  static getAll() {
    let sql = "SELECT * FROM parts";
    return db.execute(sql);
  }
}

module.exports = Parts;
