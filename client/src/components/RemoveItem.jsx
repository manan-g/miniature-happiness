import React from 'react';
import './RemoveItem.css'
export default function RemoveItem({id,deleteItem})
{
    
    return <div className="removeitem_box">
         <svg onClick={(e)=>{deleteItem(id)}} className="removeitem_svg" viewBox="0 0 40 40">
            <path 
            className="removeitem_close-x" 
            d="M10 10 L30 30 M30 10 L10 30" />
        </svg>
    </div>
}