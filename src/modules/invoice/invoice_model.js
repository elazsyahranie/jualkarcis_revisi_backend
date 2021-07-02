const connection = require('../../config/mysql')

module.exports = {
  getAllInvoice: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM invoice WHERE order_status = "pending" LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getDataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM invoice WHERE order_status = "pending"',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },

  getInvoiceById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM invoice WHERE invoice_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getUserName: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user_first_name FROM user WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getOrdersByInvoiceId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT p.product_name, o.size, o.qty, o.total_price, o.order_created_at FROM orders o JOIN product p ON o.product_id = p.product_id WHERE o.invoice_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  addInvoice: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO invoice SET ?',
        setData,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  addOrder: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO orders SET ?', setData, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },

  updateDataInvoice: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE invoice SET ? WHERE invoice_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
