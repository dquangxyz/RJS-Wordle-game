import React, {useContext} from 'react'
import {AppContext} from '../App'

function KeyFunction(props) {
    const {onSelect, onEnter, onDelete} = useContext(AppContext)
    const selectLetter = () => {
        if (props.keyValue === "Enter"){
            onEnter()
        } else if (props.keyValue === "Delete"){
            onDelete()
        } else {
            onSelect(props.keyValue)
        }
      
    }

    return (
        <div 
            className="key"
            id={props.bigSize ? "big" : props.disabled && "disabled"}
            onClick={selectLetter}
        >
            {props.keyValue}
        </div>
    )
}

export default KeyFunction