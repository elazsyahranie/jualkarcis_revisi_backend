const helper = require('../../helpers/wrapper')
const chartModel = require('./chart_model')

module.exports = {
  chartDaily: async (req, res) => {
    try {
      const result = await chartModel.getInvoiceByDay()
      return helper.response(res, 200, 'Success Get Income Data By Day', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
