// jshint esversion:6
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import "./Welcome.css";
import { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import Logout from "../components/Logout";
import { change_wallpaper, percentage_time_left } from "./Utils";

function Welcome() {
    var [time_per, setTime_per] = useState(percentage_time_left);
    var [loading,setLoading] = useState(true);
    var [user,,userLoading] = useStateValue();

    //this hook is used to execute a function when some variable changes
    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
          try {
            if (!isCancelled) {
                if(document.getElementById("welcome_b").style.backgroundImage === "")
                    await change_wallpaper("welcome","welcome_b");
                setLoading(false)
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
      }, []);

    useEffect(() => {
        const interval = setInterval(function () {
            let p = percentage_time_left();
            setTime_per(p);
        }, 60000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    
    useEffect(() => {
        const interval = setInterval(function () {
            change_wallpaper("welcome","welcome_b");
        }, 60*60*1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div id="welcome_b" className="welcome">
            <div style={{ flexGrow: "1" }}></div>
            <Loader loading={(loading || userLoading)} />
            <p className="welcome_time">
                {time_per}
                <span id="welcome_subscript">%</span>
            </p>
            <p style={{ flexGrow: "1" }} className="welcome_greeting">
                Just Do It{user && "," + user.firstName}
            </p>
            {/* <button onClick={change_wallpaper}>change!</button> */}

            {!user && (
                <Link className="welcome_link" to="/register">
                    Register
                </Link>
            )}
            {!user && (
                <Link className="welcome_link" to="/signin">
                    Sign In
                </Link>
            )}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "95vw",
                    marginBottom: "19px",
                }}
            >
                {user && (
                    <Link className="welcome_link" to="/todo">
                        To Do
                    </Link>
                )}
                {user && <Logout class_name="welcome_logout" />}
            </div>
        </div>
    );
}

export default Welcome;
