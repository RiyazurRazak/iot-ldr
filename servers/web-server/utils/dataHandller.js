


const dataHandller = (client, data, io) =>{

    const query = `INSERT INTO sensordata (date, value, state) VALUES ($1, $2, $3)`
    const sensorValue = data ? parseInt(data) : 0
    const state = data.value && parseInt(data) < 300 ? true : false
    const timeStamp = new Date()
    const values = [timeStamp, sensorValue, state]
    client.query(query, values,(err,table)=>{
        if(err){
            console.error(err)
          }
          else{
           console.log("succuess", table)
           console.log(table.rows)
          }
    })
    io.emit("data-ubdate", {
        timestamp : values[0],
        sensorvalue : values[1],
        ledstate : values[2]
    } )

}



module.exports = dataHandller;