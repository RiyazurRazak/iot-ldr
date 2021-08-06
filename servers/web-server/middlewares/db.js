const {Client} = require('pg')

// pg connections
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password : "noushath",
})


module.exports = client