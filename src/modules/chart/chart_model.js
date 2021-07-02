const connection = require('../../config/mysql')

module.exports = {
  getInvoiceByDay: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT DAY(invoice_created_at) AS DAY, SUM(invoice_subtotal) AS Total FROM invoice GROUP BY DAY(invoice_created_at)',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
