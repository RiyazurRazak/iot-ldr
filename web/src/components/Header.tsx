import { PrimaryButton, Stack, IStackTokens, FocusTrapCallout} from '@fluentui/react'
import React from 'react'
import { useState } from 'react';

const StackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,

};

interface ICallout {
    text : string,
    state : boolean,
    id : string,
}

const Header : React.FunctionComponent = ()=>{

    const [showCallout, setShowCallout]=useState<ICallout>(
        {
          text : "",
          state : false,
          id : "",
        }
    )


    const lightHandller = async(type: string, id: string)=>{
        setShowCallout(
            {
              text : type,
              state : true,
              id : id,
            }
        )

        const data = {
            state : type === "ON" ? true : false
        }

        const res = await fetch("http://localhost:5000/api/v1/change-led-state",
           {
              method : "POST",
              headers: {
                 'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
           }
        )

        res.status === 200 && setTimeout(()=>{
            setShowCallout(
                {
                    text : "",
                    state : false,
                    id : "",
                }
            )
        },5000)

    }

    return(
        <div>
            <h2>LDR Light System</h2>
            <Stack horizontal tokens={StackTokens}>
            <PrimaryButton id="on-btn" onClick={() => lightHandller("ON", "#on-btn")}>Turn ON Light Manually</PrimaryButton>
            <PrimaryButton id="off-btn" onClick={()=> lightHandller("OFF", "#off-btn")}>Turn OFF Light Manually</PrimaryButton>
            {
                showCallout.state && 
                <FocusTrapCallout
                  role="alertdialog"
                  target={showCallout.id}
                  setInitialFocus
                  style={{padding: "30px"}}
                >
                  {`Manually Turning ${showCallout.text} Light......`}
                </FocusTrapCallout>
            }
            </Stack>
           
        </div>
    )
}

export default Header