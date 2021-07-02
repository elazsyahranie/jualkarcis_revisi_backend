const helper = require('../../helpers/wrapper')
const promoModel = require('./promo_model')
const { deleteImage } = require('../../helpers/delete_image')
const { convertToSnakeCase } = require('../../helpers/convert')

module.exports = {
  getAllPromo: async (req, res) => {
    try {
      // console.log(req.query)
      let { limit, page } = req.query

      const totalData = await promoModel.getDataCount()
      if (!totalData) {
        return helper.response(res, 404, 'No data found !')
      }
      page = parseInt(page) || 1
      limit = parseInt(limit) || 10
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }

      // console.log(pageInfo, offset)

      const result = await promoModel.getAllData(limit, offset)
      return helper.response(
        res,
        200,
        'Success Get All Data Promo !',
        result,
        pageInfo
      )
    } catch (error) {
      // console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  getPromoById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await promoModel.geDataByCondition({ promo_id: id })
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Success Get Promo Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Data Promo By Id: ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  createPromo: async (req, res) => {
    try {
      const setData = {}
      for (const key in req.body) {
        setData[convertToSnakeCase(key)] = req.body[key]
      }
      setData.promo_image = req.file ? req.file.filename : ''

      const result = await promoModel.createData(setData)
      return helper.response(res, 200, 'Success Create Promo!', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updatePromo: async (req, res) => {
    try {
      const { id } = req.params
      const checkPromoData = await promoModel.geDataByCondition({
        promo_id: id
      })
      if (checkPromoData.length === 0) {
        return helper.response(
          res,
          404,
          `Data Promo By Id: ${id} Not Found`,
          null
        )
      }

      const setData = {}
      for (const key in req.body) {
        setData[convertToSnakeCase(key)] = req.body[key]
      }
      setData.promo_updated_at = new Date(Date.now())
      setData.promo_image = req.file
        ? req.file.filename
        : checkPromoData[0].promo_image
      if (req.file) {
        deleteImage(`src/uploads/${checkPromoData[0].promo_image}`)
      }
      // console.log(setData)

      const result = await promoModel.updateData(setData, {
        promo_id: id
      })
      return helper.response(
        res,
        200,
        `Success Update Promo Data By Id: ${id}`,
        result
      )
    } catch (error) {
      // console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  deletePromo: async (req, res) => {
    try {
      const { id } = req.params
      const checkPromoData = await promoModel.geDataByCondition({
        promo_id: id
      })
      if (checkPromoData.length === 0) {
        return helper.response(
          res,
          404,
          `Cannot delete, Data Promo By Id: ${id} Not Found`,
          null
        )
      }

      deleteImage(`src/uploads/${checkPromoData[0].promo_image}`)
      const result = await promoModel.deleteData(id)
      return helper.response(
        res,
        200,
        `Success Delete Promo Data By id: ${id}`,
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
