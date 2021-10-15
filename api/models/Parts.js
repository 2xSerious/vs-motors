const db = require("../config/config");

class Parts {
  constructor(name, val, valvat, orderId, supplierId) {
    this.name = name;
    this.val = val;
    this.valvat = valvat;
    this.orderId = orderId;
    this.supplierId = supplierId;
  }
  static getAllByOrderId(id) {
    let sql = `SELECT * FROM parts WHERE order_id = '${id}'`;
    return db.execute(sql);
  }

  insertPart() {
    let sql = `INSERT INTO parts (p_name, cost, cost_vat, order_id, supplier_id) VALUES (
      '${this.name}',
      '${this.val}',
      '${this.valvat}',
      '${this.orderId}',
      '${this.supplierId}'
    )`;
    return db.execute(sql);
  }

  static removePart(id) {
    let sql = `DELETE FROM parts WHERE id='${id}'`;
    return db.execute(sql);
  }
}

module.exports = Parts;
