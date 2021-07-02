const helper = require('../../helpers/wrapper')
const invoiceModel = require('./invoice_model')

module.exports = {
  createInvoice: async (req, res) => {
    try {
      // console.log(req.body)
      const {
        userId,
        invoicePromoCode,
        invoiceSubtotal,
        paymentMethod,
        orders
      } = req.body

      const invoiceData = {
        user_id: userId,
        invoice_number: `CS-${Math.floor(Math.random() * 100000 + 1)}`,
        invoice_promo_code: invoicePromoCode,
        invoice_subtotal: invoiceSubtotal,
        payment_method: paymentMethod,
        order_status: 'pending'
      }
      const result = await invoiceModel.addInvoice(invoiceData)

      for (const order of orders) {
        await invoiceModel.addOrder({
          user_id: userId,
          invoice_id: result.insertId,
          product_id: order.productId,
          size: order.size,
          qty: order.qty,
          total_price: order.totalPrice
        })
      }

      return helper.response(res, 200, 'Succes Create Invoice', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  getInvoicePending: async (req, res) => {
    try {
      let { limit, page } = req.query
      page = parseInt(page) || 1
      limit = parseInt(limit) || 10

      const totalData = await invoiceModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }

      const invoices = await invoiceModel.getAllInvoice(limit, offset)
      let userName = []
      for (const invoice of invoices) {
        userName = await invoiceModel.getUserName(invoice.user_id)
        invoice.user_name =
          userName.length > 0 ? userName[0].user_first_name : 'none'

        invoice.list_order = await invoiceModel.getOrdersByInvoiceId(
          invoice.invoice_id
        )
      }

      // console.log(invoices)
      return helper.response(
        res,
        200,
        'Succes Get Invoice with Pending Status',
        invoices,
        pageInfo
      )
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  UpdateInvoiceStatus: async (req, res) => {
    try {
      const { id } = req.params

      const checkInvoice = await invoiceModel.getInvoiceById(id)
      if (checkInvoice.length === 0) {
        return helper.response(res, 404, `Invoice ID = ${id} not found !`)
      }

      const result = await invoiceModel.updateDataInvoice(
        { order_status: 'done' },
        id
      )
      return helper.response(res, 200, 'Succes Update invoice Status', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
