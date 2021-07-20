const helper = require('../../helpers/wrapper')
const locationModel = require('./location_model')
require('dotenv').config()

module.exports = {
  getLocationDataId: async (req, res) => {
    try {
      const { id } = req.params
      const result = await locationModel.getLocationDataById(id)
      console.log(result[0])
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Location Data!', result)
      } else {
        return helper.response(res, 404, 'Location data not found!', null)
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
