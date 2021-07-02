const fs = require('fs')

module.exports = {
  deleteImage: (imgLoc) => {
    fs.unlink(imgLoc, (error) => {
      error ? console.log('Image not found') : console.log('Image deleted')
    })
  }
}
