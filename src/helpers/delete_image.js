const fs = require('fs')

module.exports = {
  deleteImage: (imgLoc) => {
    console.log(`Is this? ${imgLoc}`)
    if (fs.existsSync(imgLoc)) {
      fs.unlink(imgLoc, (error) => {
        error ? console.log('Image not found') : console.log('Image deleted')
      })
    }
  }
}
