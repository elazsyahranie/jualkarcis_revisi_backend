const connection = require('../../config/mysql')

module.exports = {
  getAllData: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM promo LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          console.log(error)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getDataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM promo',
        (error, result) => {
          const finallResult = result[0].total ? result[0].total : null
          !error ? resolve(finallResult) : reject(new Error(error))
        }
      )
    })
  },

  geDataByCondition: (condition) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM promo WHERE ?',
        condition,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO promo SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            promo_id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  updateData: (setData, condition) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE promo SET ? WHERE ?',
        [setData, condition],
        (error, result) => {
          if (!error) {
            const newResult = {
              ...condition,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM promo WHERE promo_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
