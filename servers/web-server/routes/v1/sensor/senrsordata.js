const express = require('express')

const client = require('../../../middlewares/db')

const router = express.Router()

router.get("/", (req,res)=>{
    const query = `SELECT date, value, state from sensordata order by date desc;`
    client.query(query, (err, data)=>{
        if(err){
            console.error(err)
            res.send(err)
        }else{
            console.table(data.rows)
            console.log(data.rows)
            res.send(data.rows)
        }
  
    })
})



module.exports = router