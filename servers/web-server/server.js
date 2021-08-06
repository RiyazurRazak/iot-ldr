require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)



//middlewares imports
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const client = require('./middlewares/db')



//routes

const routes = require('./routes/index')

//utils

const dataHandller = require('./utils/dataHandller')


// redis pub sub

const {publisher, subscriber} = require("./middlewares/redis")

//constants

const PORT = process.env.PORT || 5000

subscriber.subscribe("iot-web")


// middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: "true"
}))
app.use(helmet())
app.use(compression())
app.use(cors({
    origin: 'http://localhost:8080',
    methods: "GET,PUT,PATCH,POST,DELETE",
}))


//routes

app.use("/api", routes)



//ws entry point


io.on("connection", (socket)=>{

    console.log(`user ${socket.id} connected`)


    socket.on("disconnect", ()=>{
        console.warn(`user ${socket.id} disconnected`)
    })
})



// recieve messages from iot-server

subscriber.on("message", (channel, message) => {

    const sensorData = (JSON.parse(message))

    //save data to db and send to client
    
    dataHandller(client, sensorData, io)

})


// app.get("/create-table", (req, res)=>{
//     const query = `CREATE TABLE SensorData ( 
//         id SERIAL PRIMARY KEY,
//         date TIMESTAMP, 
//         value INT, 
//         state BOOLEAN DEFAULT false
//     );`
//     client.query(query,(err)=>{
//         if(err){
//           console.error(err)
//           res.send(err)
//         }
//         else{
//          console.log("succuess")
//          res.send("created")
//         }
//     })
    
// })





client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('PostgreSQl server connected')
      server.listen(PORT, ()=>{
         console.log(`Web Server started on port ${PORT}`)
       })
    }
})

