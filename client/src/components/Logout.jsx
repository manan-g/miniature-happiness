import axios from "axios";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { useStateValue } from "../pages/StateProvider";

export default function Logout(props) {
    const history = useHistory();
    const location = useLocation();
    const [, setUser] = useStateValue();
    return (
        <div className={props.class_name + "_div"}>
            <form
                className={props.class_name + "_form"}
                onSubmit={(e) => {
                    e.preventDefault();
                    axios
                        .get(process.env.REACT_APP_API_DOMAIN + "/logout", {
                            withCredentials: true,
                        })
                        .then(() => {
                            setUser(null);
                            if (location.pathname !== "/")
                                history.push("/");
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }}
            >
                <button className={props.class_name + "_button"}>Logout</button>
            </form>
        </div>
    );
}
