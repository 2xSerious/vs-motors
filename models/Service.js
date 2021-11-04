const db = require("../config/config");

class Service {
  constructor({
    date,
    orderId,
    odometer,
    description,
    work,
    workerId,
    paidId,
    paidStatus,
  }) {
    this.date = date;
    this.orderId = orderId;
    this.odometer = odometer;
    this.description = description;
    this.work = work;
    this.workerId = workerId;
    this.paidId = paidId;
    this.paidStatus = paidStatus;
  }

  static getAll() {
    let sql = `SELECT s.id, DATE_FORMAT(s.created_at, '%d/%m/%Y') as created_at, s.odometer, s.description, s.work, s.worker_id, s.paid_id, s.paid_status,
                      w.id as workerId, w.w_name,
                      o.id as orderID, o.status,
                      v.id as vehicleID, v.model, v.make, v.year, v.reg_num,
                      c.id as customerID, c.c_name, c.phone, c.email, c.street_address, c.city, c.postcode, c.country,
                      IFNULL(p.total_vat, 0) as total_vat
                      FROM service_book s
                      LEFT JOIN orders o
                      ON s.order_id = o.id
                      LEFT JOIN vehicles v                                 
                      ON o.vehicle_id = v.id
                      LEFT JOIN clients c 
                      ON v.customer_id = c.id
                      LEFT JOIN (SELECT order_id, sum(cost_vat) as total_vat 
                      FROM parts 
                      GROUP BY order_id ) p 
                      ON o.id = p.order_id 
                      LEFT JOIN workers w
                      ON s.worker_id = w.id
                       `;
    return db.execute(sql);
  }

  static deleteOrderById(id) {
    let sql = `DELETE FROM orders WHERE id = '${id}'`;
    return db.execute(sql);
  }
  update(id) {
    console.log(id);
    let sql = `UPDATE service_book
                SET work='${this.work}', paid_status='${this.paidStatus}', paid_id='${this.paidId}'
                WHERE id = '${id}' `;
    return db.execute(sql);
  }
  add() {
    let sql = `INSERT INTO service_book
                   (created_at, order_id, odometer, description, work, worker_id, paid_status)
                   VALUES (
                        '${this.date}',
                        '${this.orderId}',
                        '${this.odometer}',
                        '${this.description}',
                        '${this.work}',
                        '${this.workerId}',
                        '${this.paidStatus}'
                   )
                   `;
    return db.execute(sql);
  }
  static getPaidTypes() {
    let sql = "SELECT * FROM paid_type";
    return db.execute(sql);
  }
  static getById(id) {
    const sql = `SELECT s.id as serviceId, i.id as invoiceId, i.inv_no, i.total as invoiceTotal
                FROM service_book s
                RIGHT JOIN invoices i
                ON i.service_id = '${id}'`;

    return db.execute(sql);
  }
}

module.exports = Service;
