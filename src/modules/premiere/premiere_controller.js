const helper = require('../../helpers/wrapper')
// const movieModel = require('../movie/movie_model')
const premiereModel = require('./premiere_model')
require('dotenv').config()

module.exports = {
  newpremiere: async (req, res) => {
    try {
      const { movie, location, premiereName, premierePrice } = req.body

      const data = {
        movie_id: movie,
        location_id: location,
        premiere_name: premiereName,
        premiere_price: premierePrice
      }

      // Bikin proses get Data sebelum if else

      const checkPremiere = await premiereModel.getPremiereByItsName(
        premiereName
      )

      const checkLocationId = await premiereModel.getLocationByItsId(location)

      console.log(checkPremiere)

      if (checkPremiere.length <= 0) {
        return helper.response(res, 404, 'Premiere name is not valid')
      }
      if (checkLocationId.length <= 0) {
        return helper.response(res, 400, 'Location not available')
      }

      const result = await premiereModel.insertpremiere(data)
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
  getpremiereById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await premiereModel.getDataById(id)
      if (result.length > 0) {
        // client.set(`getmovie:${id}`, JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Success Get Premiere Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Data Premiere Data By Id: ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      console.log('This is REQ QUERY - ' + req.query)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const { location, movie, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movie,
        location_id: location,
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_updated_at: new Date(Date.now())
      }

      const checkMovieData = await premiereModel.getMovieDataByItsName(movie)

      const checkLocationId = await premiereModel.getLocationByItsId(location)

      console.log(checkMovieData)

      console.log(checkLocationId)
      if (checkMovieData.length <= 0) {
        return helper.response(res, 404, 'Movie name don`t exists!')
      }
      if (checkLocationId.length <= 0) {
        return helper.response(res, 400, 'Location not available')
      }

      const result = await premiereModel.updateData(setData, id)
      return helper.response(
        res,
        200,
        'Premiere data has been updated!',
        result
      )
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  deletePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const checkUserData = await premiereModel.getDataByCondition({
        user_id: id
      })
      if (checkUserData.length > 0) {
        const result = await premiereModel.deleteData(id)
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
