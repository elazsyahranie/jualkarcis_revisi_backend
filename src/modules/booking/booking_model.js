const connection = require('../../config/mysql')

module.exports = {
  insertbooking: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO booking SET ?', data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  insertBookingSeat: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO booking_seat SET ?',
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data
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
        `SELECT * FROM premiere JOIN movie ON premiere.movie_id = movie.movie_id WHERE premiere.movie_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataBookingById: (movieId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        // `SELECT * FROM booking JOIN booking_seat ON booking.booking_id = booking_seat.booking_id WHERE booking.movie_id = ${movieId}`,
        `SELECT * FROM booking WHERE movie_id = ${movieId}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataBookingSeatByMovieId: (movieId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM booking_seat WHERE movie_id = ?',
        movieId,
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
  updateData: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE booking SET booking_status = ${data} WHERE premiere_id = ${id}`,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...data
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
