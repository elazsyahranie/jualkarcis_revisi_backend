const connection = require('../../config/mysql')

module.exports = {
  insertpremiere: (premiereData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO premiere SET ?',
        premiereData,
        (error, result) => {
          if (!error) {
            console.log(error)
            const newResult = {
              id: result.insertId,
              ...premiereData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM premiere JOIN movie ON premiere.movie_id = movie.movie_id WHERE premiere.premiere_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataByPremiereId: (premiereId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM show_time WHERE premiere_id = ${premiereId}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getPremiereMovieLocation: (movieId, locationId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM premiere WHERE movie_id = ${movieId} AND location_id = ${locationId}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getMovieDataById: (movieId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM movie WHERE movie_id = ?',
        movieId,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getMovieDataByItsName: (movieName) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM movie WHERE movie_name = ?',
        movieName,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getPremiereByItsName: (premiereName) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM premiere WHERE premiere_name = ?',
        premiereName,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getLocationByItsId: (location) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM location WHERE location_id = ?',
        location,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE premiere SET ? WHERE premiere_id = ${id}`,
        setData,
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
  },
  getDataByCondition: (condition) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE ?',
        condition,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM user WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
