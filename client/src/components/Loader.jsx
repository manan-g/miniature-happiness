import React, { useEffect } from "react";
import "./Loader.css";

export default function Loader(props) {
  useEffect(() => {
    let isCancelled = false;
    const runAsync = async () => {
      try {
        if (!isCancelled) {
          if(props.loading===false)
          {
              let newPromise = new Promise((resolve,reject)=>{
                  // document.getElementById("loader").style.opacity= 0;
                  // setTimeout(()=>{resolve()},1500);
                  document.getElementById("loader").style.display= "none"
              });
              // newPromise.then(()=>{
              //     document.getElementById("loader").style.display= "none"
              // })
          }
          else
          {
            document.getElementById("loader").style.display= "flex"
            // document.getElementById("loader").style.opacity= 1;
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
  }, [props.loading]);

  return (
    <div id="loader">
      <img id="loader_gif" src={"Rolling-0.8s-257px.gif"} alt="loader"></img>
    </div>
  );
}
