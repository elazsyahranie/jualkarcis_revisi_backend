const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {
  getAllMovieByRedis: (req, res, next) => {
    client.get(`getmovieall`, (error, result) => {
      if (!error && result !== null) {
        console.log('Data ada di dalam redis')
        return helper.response(
          res,
          200,
          'Success: Get All Movie!',
          JSON.parse(result)
        )
      } else {
        console.log('Data tidak ada di dalam redis')
        next()
      }
    })
  },

  getAllMovieByPaginationAndRedis: (req, res, next) => {
    client.get(
      `getmovieallbypagination:${JSON.stringify(req.query)}`,
      (error, result) => {
        if (!error && result !== null) {
          console.log('Data ada di dalam redis')
          return helper.response(
            res,
            200,
            'Success: Get All Movie!',
            JSON.parse(result)
          )
        } else {
          console.log('Data tidak ada di dalam redis')
          next()
        }
      }
    )
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
