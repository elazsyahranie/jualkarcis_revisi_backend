module.exports = {
  convertToSnakeCase: (str) => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  }
}
