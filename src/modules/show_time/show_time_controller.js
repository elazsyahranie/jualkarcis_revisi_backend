const helper = require('../../helpers/wrapper')
const showTimeModel = require('./show_time_model')
require('dotenv').config()

module.exports = {
  allShowTime: async (req, res) => {
    try {
      const result = await showTimeModel.getAllShowTime()
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get All Show Time', result)
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
