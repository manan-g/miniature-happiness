import React from "react";
import CheckBox from "./CheckBox";
import RemoveItem from "./RemoveItem";

export default function TodoItem(props) {
    return (
        <div>
            <div className={props.classPrefix + "_right_item"}>
                <CheckBox arr={props.arr}
                    _onChange={props._onChange}
                />

                <label className={props.classPrefix + "_right_item_label"}>
                    {props.arr.title}
                </label>
                <RemoveItem id={props.arr._id}
                deleteItem = {props.deleteItem}
                 />
                
            </div>
        </div>
    );
}
