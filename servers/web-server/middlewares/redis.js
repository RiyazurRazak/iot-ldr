//redis

const redis = require('redis')

//pub sub

const publisher = redis.createClient()
const subscriber = redis.createClient()


module.exports = {publisher, subscriber}