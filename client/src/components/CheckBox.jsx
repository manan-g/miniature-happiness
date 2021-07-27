import React from 'react';
import './CheckBox.css'

export default function CheckBox(props)
{
    return <div>
        <span className="checkbox__input">
                    <input
                        checked={props.arr.completed === 1 ? true : false}
                        onChange={(e) =>
                            {
                                // console.log("changed")
                                props._onChange(props.arr._id, e.target.checked)
                            }
                        }
                        type="checkbox"
                        // name="checkbox"
                    ></input>
                    <span className="checkbox__control">
                        <svg
                        viewBox="0 0 24 24" 
                        aria-hidden ="true"
                        focusable = "false"
                        >
                            <path
                                fill='none' 
                                stroke='currentColor' 
                                strokeWidth='3' 
                                d='M3.73 12.91l6.37 4.37L20.79 7.59'
                            />
                        </svg>
                    </span>
                </span>
    </div>
}