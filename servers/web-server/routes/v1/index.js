const express = require('express')

const router = express.Router()


const sensorHandller = require('./sensor/senrsordata')
const stateHandller = require('./sensor/stateHandller')


router.use("/sensor-data", sensorHandller)
router.use("/change-led-state", stateHandller )


module.exports = router