


const dataHandller = (client, data, io) =>{

    const query = `INSERT INTO sensordata (date, value, state) VALUES ($1, $2, $3)`
    const sensorValue = data ? parseInt(data) : 0
    const state = data && parseInt(data) < 300 ? true : false
    const timeStamp = new Date()
    const values = [timeStamp, sensorValue, state]
    client.query(query, values,(err,table)=>{
        if(err){
            console.error(err)
          }
          else{
            io.emit("new-data", {
                date : values[0],
                value : values[1],
                state : values[2]
            } )
          }
    })


}



module.exports = dataHandller;