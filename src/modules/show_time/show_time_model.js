const connection = require('../../config/mysql')

module.exports = {
  getAllShowTime: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM show_time', (error, result) => {
        console.log(error)
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
