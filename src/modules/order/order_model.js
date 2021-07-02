const connection = require('../../config/mysql')

module.exports = {
  getAllData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM orders WHERE user_id = ${id}`,
        (error, result) => {
          console.log(error)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getInvoiceById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT invoice_number, order_status FROM invoice WHERE invoice_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT product_image FROM product WHERE product_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM orders WHERE order_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
