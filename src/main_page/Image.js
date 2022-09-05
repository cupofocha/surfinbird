import React, {useEffect, useState} from "react"
import "./Image.css"
import history from "../History";
import DeleteButton from "../delete_button/DeleteButton";
import GlobalVar from "../GlobalVar";

export default function Image(props) {
    const [posterId, setPosterId] = useState()

    function handleClick(){
        let url = "/post/image/" + props.postId
        history.push(url)
        history.go()
    }

    useEffect(()=>{
        let url = GlobalVar.apiServer + "post/image/" + props.postId
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPosterId(data.posterId)})
    },[])

    return (
        <div className="image">
            <div className="image-info">
                <h4 className="display-name"
                    onClick={() => {history.push({pathname:"/user/"+posterId})
                        history.go()}}
                >{props.displayName}</h4>
            </div>
            <img src={props.path} id={props.id} onClick={handleClick} />
        </div>
    )
}