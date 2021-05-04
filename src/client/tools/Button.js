import React from 'react'

export function Button(props) {
    return (
        <div className={`btn ${props.addClasses}`} onClick={props.onClick}>
            { props.children}
        </div>
    )
}