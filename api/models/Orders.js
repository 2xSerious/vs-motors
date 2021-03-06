const db = require("../config/config");

class Orders {
  constructor(date, vehicleId, status) {
    this.date = date;
    this.vehicleId = vehicleId;
    this.status = status;
  }
  static getAll() {
    let sql = `SELECT o.id as orderID, DATE_FORMAT(o.created_at,'%d/%m/%Y') as created_at, o.status,
                      v.id as vehicleID, v.make, v.model, v.year, v.reg_num,
                      c.id as customerID, c.c_name, 
                      IFNULL(p.total, 0) as total,
                      p.total_vat 
               FROM orders o
               LEFT JOIN vehicles v
               ON  o.vehicle_id = v.id
               LEFT JOIN clients c 
               ON v.customer_id = c.id
               LEFT JOIN ( SELECT order_id, sum(cost) as total, sum(cost_vat) as total_vat 
               FROM parts
               GROUP BY order_id) p
               ON o.id = p.order_id
               `;

    return db.execute(sql);
  }

  static getAllOpen() {
    let sql = `SELECT o.id as orderID, DATE_FORMAT(o.created_at,'%d/%m/%Y') as created_at, o.status,
                      v.id as vehicleID, v.make, v.model, v.year, v.reg_num,
                      c.id as customerID, c.c_name, 
                      IFNULL(p.total, 0) as total,
                      p.total_vat 
               FROM orders o
               LEFT JOIN vehicles v
               ON  o.vehicle_id = v.id
               LEFT JOIN clients c 
               ON v.customer_id = c.id
               LEFT JOIN ( SELECT order_id, sum(cost) as total, sum(cost_vat) as total_vat 
               FROM parts
               GROUP BY order_id) p
               ON o.id = p.order_id
               WHERE o.status = 'open';
               `;
    return db.execute(sql);
  }
  static getLastInsertId() {
    let sql = `SELECT LAST_INSERT_ID();`;
    return db.execute(sql);
  }

  static deleteOrderById(id) {
    let sql = `DELETE FROM orders WHERE id = '${id}'`;
    return db.execute(sql);
  }

  add() {
    let sql = `INSERT INTO orders
                   (created_at, vehicle_id, status)
                   VALUES (
                       '${this.date}',
                       '${this.vehicleId}',
                        '${this.status}'
                   )
                   `;
    return db.execute(sql);
  }

  static updateStatus(id, status) {
    let sql = `
    UPDATE orders 
    SET status = '${status}'
    WHERE id = '${id}' `;
    return db.execute(sql);
  }
}

module.exports = Orders;
