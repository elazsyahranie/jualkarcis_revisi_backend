const helper = require('../../helpers/wrapper')
// const movieModel = require('../movie/movie_model')
const bookingModel = require('./booking_model')
require('dotenv').config()

module.exports = {
  newbooking: async (req, res) => {
    try {
      const {
        userId,
        movieId,
        showTimeId,
        bookingTicket,
        bookingTotalPrice,
        bookingPaymentMethod
      } = req.body

      const data = {
        user_id: userId,
        movie_id: movieId,
        show_time_id: showTimeId,
        booking_ticket: bookingTicket,
        booking_total_price: bookingTotalPrice,
        booking_payment_method: bookingPaymentMethod
      }
      const result = await bookingModel.insertbooking(data)
      return helper.response(res, 200, 'Booking have been posted!', result)
    } catch (error) {
      console.log(error)
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  newbookingseat: async (req, res) => {
    try {
      const { bookingId, movieId, bookingSeatLocation } = req.body

      const data = {
        booking_id: bookingId,
        movie_id: movieId,
        booking_seat_location: bookingSeatLocation
      }
      const result = await bookingModel.insertBookingSeat(data)
      return helper.response(res, 200, 'Booking seat have been posted!', result)
    } catch (error) {
      console.log(error)
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMovieDataId: async (req, res) => {
    try {
      const { movieName } = req.body
      const result = await bookingModel.getMovieDataById(movieName)
      console.log(result[0])
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get movie Data!', result)
      } else {
        return helper.response(res, 404, 'Movie data not found!', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getBookingByMovieId: async (req, res) => {
    try {
      const { movieId } = req.params
      const result = await bookingModel.getDataBookingByMovieId(movieId)
      if (result.length > 0) {
        // client.set(`getmovie:${id}`, JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Success Get Booking Data By Movie Id : ${movieId}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Booking Data By Movie Id : ${movieId} Not Found`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      // console.log('This is REQ QUERY - ' + req.query)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getBookingByBookingId: async (req, res) => {
    try {
      const { bookingId } = req.params
      const result = await bookingModel.getDataBookingByBookingId(bookingId)
      if (result.length > 0) {
        // client.set(`getmovie:${id}`, JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Success Get Booking Data Booking Id : ${bookingId}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Booking Data By Booking Id : ${bookingId} Not Found`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      // console.log('This is REQ QUERY - ' + req.query)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getBookingSeatByMovieId: async (req, res) => {
    try {
      const { movieId } = req.params
      const result = await bookingModel.getDataBookingSeatByMovieId(movieId)
      if (result.length > 0) {
        // client.set(`getmovie:${id}`, JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Success Get Booking Seat Data By Movie Id : ${movieId}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Booking Seat Data By Movie Id : ${movieId} Not Found`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      // console.log('This is REQ QUERY - ' + req.query)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateBooking: async (req, res) => {
    try {
      const { id } = req.params
      const { bookingPaymentMethod, bookingStatus } = req.body
      const data = {
        booking_payment_method: bookingPaymentMethod,
        booking_status: bookingStatus,
        booking_updated_at: new Date(Date.now())
      }
      const result = await bookingModel.updateData(data, { booking_id: id })
      console.log(result)
      return helper.response(res, 200, 'Booking data has been updated!', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  deletePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const checkUserData = await bookingModel.getDataByCondition({
        user_id: id
      })
      if (checkUserData.length > 0) {
        const result = await bookingModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Success Delete Premiere Data By id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Premiere Data By Id ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
