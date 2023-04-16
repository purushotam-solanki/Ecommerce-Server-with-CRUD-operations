const generateId = (prefix) => {
    //Method to generate 10 digit id with given Prefix
    let randomNumber = Math.random() * 10000000000
    randomNumber = Math.floor(randomNumber)
    return `${prefix}${randomNumber}`
}

module.exports = {
    generateId
}