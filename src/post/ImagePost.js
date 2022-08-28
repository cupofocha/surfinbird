import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import "../Navigate.css"
import Navigate from "../Navigate";
import globalVar from "../GlobalVar"
import "./ImagePost.css"
import seagull from "../images/seagull.png"
import history from "../History";
import {toast} from "react-toastify";

export default function ImagePost(props) {
    const postId = useParams().postId
    const [posterInfo, setPosterInfo] = useState([])
    const [image, setImage] = useState([])
    const [text, setText] = useState({})
    const [comments, setComments] = useState([])
    const [commenterInfo, setCommenterInfo] = useState({})
    const [formData, setFormData] = React.useState({
        commenterId: "",
        text: "",
    })

    let displayName = {}

    useEffect(() => {
        formData.commenterId = sessionStorage.getItem("userId")

        let url = globalVar.apiServer + "post/image/" + postId.toString()
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let url = globalVar.apiServer + "user/" + data.posterId.toString()
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        setPosterInfo(data)
                    })
                setImage(data.birdImage)
                setText(data.text)
            })

        let url_2 = globalVar.apiServer + "comment/image/" + postId.toString()
        fetch(url_2)
            .then(res => res.json())
            .then(data => {
                setComments(
                    data.map(comment => {
                        return(
                            <Comment
                                name = {comment.commenterName}
                                text = {comment.text}
                                id = {comment.id}
                            />)
                    })
                )
            }
        )
    }, [])

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(sessionStorage.getItem("is_login") === '0')
        {
            toast.error('Please Login first!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            history.push('/login')
            history.go()
            return 0
        }
        else if(formData.text.length === 0) {
            toast.error('Empty Comment!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return 0
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        let url = globalVar.apiServer + "comment/image/" + postId.toString()
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

        history.go()
    }

    function Comment(props) {
        return (
            <div className="comment-list-item" key={props.id}>
                <div className="commenter-info">
                    <img className="commenter-pic" src={seagull} width={40} height={40} />
                    <h5 className="commenter-name">{props.name}</h5>
                </div>
                <h5 className="comment-text">{props.text}</h5>
            </div>
        )
    }

    return (
        <div className="post">
            <Navigate />
            <div className="post-content">
                <div className="post-image-container">
                    <img className="post-image" src={image.path}/>
                </div>
                <div className="post-main">
                    <div className="user-info">
                        <img className="user-pic" src={seagull} width={40} height={40} />
                        <h3 className="user-name">{posterInfo.displayName}</h3>
                    </div>
                    {image.bird==="NULL" ? (
                        <h3 className="bird-name">Uncategorized</h3>
                    ) : (
                        <h3 className="bird-name">{image.bird}</h3>
                    )}
                    <h4 className="post-text">{text.toString()}</h4>
                    <div className="comment">
                        <form className="form--comment" onSubmit={handleSubmit}>
                            <textarea className="textarea--comment"
                                      name="text"
                                      type="text"
                                      placeholder="Leave a comment"
                                      id="comment"
                                      value={formData.text}
                                      onChange={handleChange}
                            />
                            <button>Comment</button>
                        </form>
                        <div className="comment-list">
                            {comments}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}