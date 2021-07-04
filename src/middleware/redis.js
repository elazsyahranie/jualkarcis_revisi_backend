const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers')

module.exports = {
  getRecruiterByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getrecruiter:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log('Data ada di dalam redis')
        return helper.response(
          res,
          200,
          'Success:get data by id',
          JSON.parse(result)
        )
      } else {
        console.log('Data tidak ada di dalam redis')
        next()
      }
    })
  },

  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params
    if (id) {
      client.get(`getmovie:${id}`, (error, result) => {
        if (!error && result != null) {
          console.log('data ada di dalam redis')
          return helper.response(
            res,
            200,
            `Succes Get Worker by Id ${id} (Redis)`,
            JSON.parse(result)
          )
        } else {
          console.log('data tidak ada dalam redis')
          next()
        }
      })
    } else {
      client.get(`getworker:${JSON.stringify(req.query)}`, (error, result) => {
        if (!error && result != null) {
          console.log('data ada dalam redis')
          const newResult = JSON.parse(result)
          return helper.response(
            res,
            200,
            'Succes get worker All (redis)',
            newResult.result,
            newResult.pageInfo
          )
        } else {
          console.log('data tidak ada dalam redis')
          next()
        }
      })
    }
  },

  clearDataWorkerRedis: (req, res, next) => {
    client.keys('getworker*', (_error, result) => {
      console.log('isi key dalam redis', result)
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  },

  getCompanyRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getcompany:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada di dalam redis')
        return helper.response(
          res,
          200,
          `Succes Get company by Id ${id} (Redis)`,
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada dalam redis')
        next()
      }
    })
  },

  clearDataCompanyRedis: (req, res, next) => {
    client.keys('getcompany*', (_error, result) => {
      console.log('isi key dalam redis', result)
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
}
