const db = require("../config/config");

class Invoices {
  constructor(inv_no, date, total, service_id) {
    this.inv_no = inv_no;
    this.date = date;
    this.total = total;
    this.service_id = service_id;
  }

  add() {
    let sql = ` 
      INSERT INTO invoices 
      (inv_no, created_at, total, service_id)
      VALUES (
          '${this.inv_no}',
          '${this.date}',
          '${this.total}',
          '${this.service_id}'
      )`;
    return db.execute(sql);
  }
}

module.exports = Invoices;
