const db = require("../config/config");

class Parts {
  constructor(date, name, quantity, val, valvat, orderId, supplierId) {
    this.date = date;
    this.name = name;
    this.quantity = quantity;
    this.val = val;
    this.valvat = valvat;
    this.orderId = orderId;
    this.supplierId = supplierId;
  }
  static getAllByOrderId(id) {
    let sql = `SELECT p.id, p.date, p.cost, p.cost_vat, p.p_name, p.quantity, p.order_id, s.s_name 
               FROM parts p
               LEFT JOIN suppliers s 
               ON p.supplier_id = s.id
               WHERE order_id = '${id}'`;
    return db.execute(sql);
  }

  insertPart() {
    let sql = `INSERT INTO parts (date, p_name, quantity, cost, cost_vat, order_id, supplier_id) VALUES (
      '${this.date}',
      '${this.name}',
      '${this.quantity}',
      '${this.val}',
      '${this.valvat}',
      '${this.orderId}',
      '${this.supplierId}'
    )`;
    return db.execute(sql);
  }
  static updatePart(id, cost, costvat) {
    console.log(id);
    console.log(cost);
    let sql = `UPDATE parts
               SET cost = '${cost}',
                   cost_vat = '${costvat}'
              WHERE id = '${id}' `;
    return db.execute(sql);
  }

  static removePart(id) {
    let sql = `DELETE FROM parts WHERE id='${id}'`;
    return db.execute(sql);
  }
}

module.exports = Parts;
