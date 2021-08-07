import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from '@fluentui/react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { socket } from '../utils/socketConnect';


interface IItems{
  date : string,
  value : number,
  state : boolean
}


const Tables : React.FunctionComponent =  ()=>{

    const [items, setItems] = useState<IItems[]>([])


    useEffect(()=>{
        (async ()=>{
           await fetch("http://localhost:5000/api/v1/sensor-data").then((response)=> response.json()).then((data)=> setItems(data))
        })()
        // eslint-disable-next-line 
    },[])

    useEffect(()=>{
        socket.on("new-data", (data : IItems)=>{
              setItems((prev) => [data, ...prev])
        })
        // eslint-disable-next-line 
    },[])


    const columns = [
        { key: 'column1', name: 'Date', fieldName: 'date', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Time', fieldName: 'date', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'LDR Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column4', name: 'LED Status', fieldName: 'state', minWidth: 100, maxWidth: 200, isResizable: true },
      ];






      const renderItems = (item: IItems, index?: any, column?: IColumn)=>{

        switch (column?.key){
             case "column1":
               return <span>{new Date(item.date).toDateString()}</span>
              case "column2":
                return <span>{new Date(item.date).toLocaleTimeString()}</span>
             case "column3":
               return <span>{item.value}</span>
             case "column4":
               return <span style={{color : item.state ? "red" : "black"}}>{item.state ? "ON" : "OFF"}</span>
             default :
                return <span></span>
         }

      }

    return(
        <>
          <h1>Previous Data</h1>

          <DetailsList 
             items={items}
             columns={columns}
             selectionMode={SelectionMode.none}
             layoutMode={DetailsListLayoutMode.justified}
             onRenderItemColumn={renderItems}
          />

        </>
    )

}



export default Tables
