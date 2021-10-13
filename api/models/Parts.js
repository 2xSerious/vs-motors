const db = require("../config/config");

class Parts {
  constructor(name, val, valvat, orderId) {
    this.name = name;
    this.val = val;
    this.valvat = valvat;
    this.orderId = orderId;
  }
  static getAllByOrderId(id) {
    let sql = `SELECT * FROM parts WHERE order_id = '${id}'`;
    return db.execute(sql);
  }

  insertPart() {
    let sql = `INSERT INTO parts (p_name, cost, cost_vat, order_id) VALUES (
      '${this.name}',
      '${this.val}',
      '${this.valvat}',
      '${this.orderId}'
    )`;
    return db.execute(sql);
  }
}

module.exports = Parts;
