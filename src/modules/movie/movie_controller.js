const redis = require('redis')
const client = redis.createClient()
const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')
const { deleteImage } = require('../../helpers/delete_image')

module.exports = {
  createmovie: async (req, res) => {
    try {
      const {
        movieName,
        movieGenre,
        movieReleaseDate,
        movieDuration,
        movieCasts,
        movieSynopsis
      } = req.body

      const setData = {
        movie_name: movieName,
        movie_genre: movieGenre,
        movie_release_date: movieReleaseDate,
        movie_duration: movieDuration,
        movie_casts: movieCasts,
        movie_synopsis: movieSynopsis
      }

      console.log(setData)
      const result = await movieModel.createData(setData)
      return helper.response(res, 200, 'Success Create movie', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllMovie: async (req, res) => {
    try {
      const result = await movieModel.getAllData()
      if (result.length > 0) {
        client.setex(
          'getmovieall',
          3600,
          JSON.stringify(result)
        )
        return helper.response(res, 200, 'Success Get All Data movie', result)
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllMoviePagination: async (req, res) => {
    try {
      let { page, limit, sort, search } = req.query

      page = page ? parseInt(page) : 1
      limit = limit ? parseInt(limit) : 5
      sort = sort ? sort : 'movie_id ASC'
      search = search ? search : ''

      const totalData = await movieModel.getDataCount(search)
      const totalPage = Math.ceil(totalData / limit)
      const offset = limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }

      const result = await movieModel.getAllDataPagination(
        limit,
        offset,
        sort,
        search
      )
      console.log(req.query)
      client.setex(
        `getmovieallbypagination:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      )
      return helper.response(res, 200, 'Success Get Data', result, pageInfo)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getmovieDataById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.geDataByCondition({ movie_id: id })
      if (result.length > 0) {
        client.set(`getmovie:${id}`, JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Success Get movie Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Data movie Data By Id: ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updatemovieData: async (req, res) => {
    try {
      const { id } = req.params
      const {
        movieName,
        movieGenre,
        movieReleaseDate,
        movieDuration,
        movieCasts,
        movieSynopsis
      } = req.body
      const checkmovieData = await movieModel.geDataByCondition({
        movie_id: id
      })
      const setData = {
        movie_name: movieName,
        movie_genre: movieGenre,
        movie_release_date: movieReleaseDate,
        movie_duration: movieDuration,
        movie_casts: movieCasts,
        movie_synopsis: movieSynopsis,
        movie_updated_at: new Date(Date.now())
      }
      if (checkmovieData.length > 0) {
        const result = await movieModel.updateData(setData, {
          movie_id: id
        })
        return helper.response(
          res,
          200,
          `Success Update movie Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `movie Data By Id ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletemovie: async (req, res) => {
    try {
      const { id } = req.params
      const checkmovieData = await movieModel.geDataByCondition({
        movie_id: id
      })
      if (checkmovieData.length > 0) {
        deleteImage(`src/uploads/${checkmovieData[0].movie_image}`)
        const result = await movieModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Success Delete movie Data By id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `movie Data By Id ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
