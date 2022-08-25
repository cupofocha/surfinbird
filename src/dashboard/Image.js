import React from "react"

export default function Image(props) {
    return (
        <div className="image">
            <img src={props.path} className="image--image" />
        </div>
    )
}