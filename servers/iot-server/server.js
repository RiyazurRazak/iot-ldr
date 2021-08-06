require('dotenv').config()

const express = require('express')
const app = express()

//middlewares imports
const compression = require('compression')
const helmet = require('helmet')

//redis
const redis = require('redis')

const publisher = redis.createClient()
const subscriber = redis.createClient()


//middlewares

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded(
    {
        extended : true
    }
))
app.use(helmet())
app.use(compression())



//constants
const PORT = process.env.PORT || 3000

subscriber.subscribe("web-iot")



let state = false;


//routes


// post route to catch esp8266 module sended data

app.post("/values", (req, res)=>{
    const body = req.body
    console.log(body)
    res.send("success")
    //send message to web server
    publisher.publish("iot-web", JSON.stringify(body))
})



// send the custom led status to esp8266 module

app.get("/values", (req, res)=>{
    res.send(state)
})


//subcriber

//recieving message from web server

subscriber.on("message", (channel, message) => {
    console.log("Received data :" + message)
    state = message.toLowerCase() === "true"
})



app.listen(PORT,()=>{
    console.log(`Server listerning on port ${PORT}`)
})