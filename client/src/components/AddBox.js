import axios from "axios";
import React, { useState } from "react";
import { useStateValue } from "../pages/StateProvider";

import "./AddBox.css";


export default function AddBox(props) {
    var [item, setItem] = useState("");
    var  [,,,,setPageError] = useStateValue();
    
    function addItem(e) {
        e.preventDefault();
        if(item!=="")
        {
            let item_data = item;
            setItem("");
            axios
            .post(
                process.env.REACT_APP_API_DOMAIN + "/additem",
                { title: item_data },
                { withCredentials: true }
            )
            .then((data) => {
                props.setTodo([...props.todo, data.data.item]);
            })
            .then(() => {
                setItem("");
            })
            .catch((err) => {
                // console.log(err);
                setPageError({status:err.response.status,message:err.response.data})
            });
        }
    }
    return (
        <div className="addbox">
            <form
                onSubmit={(e) => addItem(e)}>
                <input
                    id="todo_input"
                    value={item}
                    autoComplete="off"
                    onChange={(e) => {
                        setItem(e.target.value);
                    }}>
                </input>
                <input
                    id="todo_input_add_button"
                    value="+"
                    type="submit"
                ></input>
                
            </form>
        </div>
    );
}
