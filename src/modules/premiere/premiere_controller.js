const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')
require('dotenv').config()

module.exports = {
  newpremiere: async (req, res) => {
    try {
      const { premiereName, premierePrice } = req.body

      const data = {
        premiere_name: premiereName,
        premiere_price: premierePrice
      }

      const checkPremiereName = await premiereModel.getDataByCondition({
        premiere_name: premiereName
      })

      console.log(checkPremiereName)

      if (checkPremiereName.length === 0) {
        const result = await premiereModel.insertpremiere(data)
        console.log(result)
        // const url = `http://localhost:3005/backend5/api/v1/auth/change-data/${result.id}`
        // sendMail('Please activate your account', url, userEmail)

        return helper.response(res, 200, 'Succes insert new premiere !', result)
      } else {
        return helper.response(res, 400, 'Premiere aleardy exists!')
      }
    } catch (error) {
      console.log(error)
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
      const { movie, location } = req.body
      const checkPremiereData = await premiereModel.getDataByCondition(id)

      const setData = {
        movie_name: movie,
        location_id: location,
        premiere_updated_at: new Date(Date.now())
      }
      if (checkPremiereData.length > 0) {
        const result = await premiereModel.updateData(setData, id)
        return helper.response(
          res,
          200,
          `Success Update Premiere Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `User Data By Id ${id} Not Found`,
          null
        )
      }
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
