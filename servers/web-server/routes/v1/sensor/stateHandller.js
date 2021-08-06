const express = require('express')

const {publisher} = require('../../../middlewares/redis')

const router = express.Router()


router.post("/", (req,res)=>{

    const {state} = req.body

    publisher.publish("web-iot", state)
    res.send("send")

})


module.exports = router