const db = require("../config/config");

class Home {
  static getDataSuppliers(from, to) {
    let sql = `
        SELECT s.s_name as Supplier, IFNULL(p.total, 0) as total
        FROM suppliers s
        LEFT JOIN (SELECT supplier_id, sum(cost) as total 
                   FROM parts
                   WHERE date BETWEEN '${from}' AND '${to}'
                   GROUP BY supplier_id) p 
        ON s.id = p.supplier_id      
        `;
    return db.execute(sql);
  }
  static getDataWorkers() {
    let sql = `
    SELECT w.w_name, s.total
    FROM workers w
    LEFT JOIN (SELECT worker_id, sum(work) as total FROM service_book GROUP BY worker_id) s
    ON w.id = s.worker_id
    `;
    return db.execute(sql);
  }
}

module.exports = Home;
