const connection = require('../../config/mysql')

module.exports = {
  getLocationDataById: (locationId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM location WHERE location_id = ${locationId}`,
        console.log(locationId),
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getAllData: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM location', (error, result) => {
        console.log(error)
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
