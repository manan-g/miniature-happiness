import React, { useEffect, useState } from "react";
import { useStateValue } from "../pages/StateProvider";
import "./ErrorBox.css";

let lock = false;
export default function ErrorBox()
{
    const [showMe,setShowMe] = useState(false);
    const [,,,PageError,setPageError] = useStateValue();
    
  
    const SyncTimeOut = async ()=>{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setShowMe(null);
                setPageError({status:0});
                lock = false;
                resolve();
            }, 2000);
        });
    }

    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
          try 
          {
            if (!isCancelled) 
            {
                if(lock===false)
                {   
                    if(PageError!==null)
                    {   lock=true;
                        setShowMe(PageError);
                        await SyncTimeOut();
                    }
                }
            }
          } catch (e) {
            if (!isCancelled) {
              console.log(e)
            }
          }
        };
        runAsync();
        return () => {
          isCancelled = true;
        };
    }, [PageError]);

    return <div >
    {/* <button onClick={e=>{setPageError({status:100})}}></button> */}
    {showMe && <div className="error_box">{showMe.message}</div>}
    </div>
}
