import React from "react"
import "./Image.css"
import history from "../History";

export default function Image(props) {
    function handleClick(){
        let url = "/post/image/" + props.postId
        history.push(url)
        history.go()
    }

    return (
        <div className="image">
            <div className="image-info">
                <h4 className="display-name">{props.displayName}</h4>
            </div>
            <img src={props.path} id={props.id} onClick={handleClick} />
        </div>
    )
}