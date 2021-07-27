const helper = require('../../helpers/wrapper')
// const movieModel = require('../movie/movie_model')
const premiereModel = require('./show_time_model')
require('dotenv').config()

module.exports = {
  newpremiere: async (req, res) => {
    try {
      const { movie, location, premiereName, premierePrice } = req.body

      const premiereData = {
        movie_id: movie,
        location_id: location,
        premiere_name: premiereName,
        premiere_price: premierePrice
      }

      // Bikin proses get Data sebelum if else

      const result = await premiereModel.insertpremiere(premiereData)
      return helper.response(res, 200, 'The schedule have been posted!', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMovieDataId: async (req, res) => {
    try {
      const { movieName } = req.body
      const result = await premiereModel.getMovieDataById(movieName)
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
  getShowTimeByPremiereId: async (req, res) => {
    try {
      const { premiereId } = req.params
      const result = await premiereModel.getDataByPremiereId(premiereId)
      if (result.length > 0) {
        // client.set(`getmovie:${id}`, JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Success Get Premiere Data By Movie Id: ${premiereId}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Premiere Data By Movie Id: ${premiereId}`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      console.log('This is REQ QUERY - ' + req.query)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
