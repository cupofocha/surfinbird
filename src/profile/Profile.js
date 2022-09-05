import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import globalVar from "../GlobalVar";
import seagull from "../images/seagull.png"
import Navigate from "../Navigate"
import {toast} from "react-toastify";
import history from "../History";
import 'react-image-crop/dist/ReactCrop.css'
import "./Profile.css"
import next from "../images/next.png"
import dot from "../images/button.png"
import circle from "../images/circle.png"
import DeleteButton from "../delete_button/DeleteButton";

export default function Profile() {
    const userId = useParams().userId
    const inPerson = (userId === sessionStorage.getItem("userId"))
    const [userProfileData, setUserProfileData] = useState({})
    const [commentsData, setCommentsData] = useState([])
    const [formData, setFormData] = useState({
        commenterId: "",
        text: "",})
    const [count, setCount] = useState(0)
    const [pageData, setPageData] = useState([])
    const [image, setImage] = useState([])

    useEffect(()=>{
        formData.commenterId = sessionStorage.getItem("userId")
        let profileUrl = globalVar.apiServer + "user/profile/" + userId
        fetch(profileUrl)
            .then(res => res.json())
            .then(data => setUserProfileData(data))

        let commentsUrl = globalVar.apiServer + "comment/" + userId + "/114514"
        fetch(commentsUrl)
            .then(res => res.json())
            .then(data => {
                    setCommentsData(
                        data.map(comment => {
                            return(
                                <Comment
                                    name = {comment.commenterName}
                                    text = {comment.text}
                                    commenterId = {comment.commenterId}
                                    profileId = {userId}
                                    id = {comment.id}
                                />)
                        })
                    )
                }
            )
    }, [])

    useEffect(()=>{
        if(userProfileData.imageList !== undefined){
            console.log(userProfileData)
            setPageData(paging(userProfileData.imageList, 6))
        }
    }, [userProfileData])

    useEffect(()=>{
        if(pageData[0] !== undefined) {
            setImage(
                pageData[0].map(
                    image => {
                        return <Post id={image.id} path={image.path} postId={image.postId}/>
                    }
                )
            )
        }
    },[pageData])

    const paging = (sourceData, pageSize) => {
        if (sourceData.length === 0) return new Array()
        const pageNum = Math.ceil(sourceData.length / pageSize)
        return new Array(pageNum).fill([]).map((item, index) => (
            sourceData.slice(index * pageSize, (index + 1) * pageSize)
        ))
    }

    function Comment(props) {
        const profileId = props.profileId
        const commenterId = props.commenterId
        return (
            <div className="comment-list-item" key={userId}>
                <div className="commenter-info">
                    <img className="commenter-pic" src={seagull} width={40} height={40} />
                    <h5 className="commenter-name" onClick={() => {history.push({pathname:"/user/"+commenterId})
                    history.go()}}>{props.name}</h5>
                    {(commenterId === sessionStorage.getItem("userId") ||
                        profileId === sessionStorage.getItem("userId")) &&
                        <DeleteButton
                            deletionType = "comment"
                            id = {props.id}
                        />
                    }
                </div>
                <h5 className="comment-text">{props.text}</h5>
            </div>
        )
    }

    function Post(props) {
        function handleClick(){
            let url = "/post/image/" + props.postId
            history.push(url)
            history.go()
        }

        return (
            <div className="profile-post">
                <img className="profile-post-img" id={props.id} src={props.path} onClick={handleClick}/>
            </div>
        )
    }

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(sessionStorage.getItem("is_login") !== '1')
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
            window.history.go()
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

        let url = globalVar.apiServer + "comment/" + userId
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

        history.go()
    }

    function handleClickNext() {
        const tempCount = count + 1
        if(pageData[tempCount] !== undefined) {
            setImage(
                pageData[tempCount].map(
                    image => {
                        return <Post id={image.id} path={image.path} postId={image.postId}/>
                    }
                )
            )
            setCount(tempCount)
        }
    }

    function handleClickPrev() {
        const tempCount = count - 1
        if(pageData[tempCount] !== undefined) {
            setImage(
                pageData[tempCount].map(
                    image => {
                        return <Post id={image.id} path={image.path} postId={image.postId}/>
                    }
                )
            )
            setCount(tempCount)
        }
    }

    return (
        <div>
            <Navigate/>
            <div className="profile">
                <div className="profile-main">
                    <div className="main-info">
                        <img src={seagull} width="60"/>
                        <h2 className="profile-user-name">{userProfileData.displayName}</h2>
                        <h3 className="profile-user-email">{userProfileData.email}</h3>
                    </div>
                    <div className="buttons--profile">
                        {inPerson&&
                            <button>Edit Display Name</button>
                        }
                        {inPerson&&
                            <button>Edit Email</button>
                        }
                        {!inPerson&&
                            <button>Add Friend</button>
                        }
                        {!inPerson&&
                            <button>Message</button>
                        }
                    </div>
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
                            {commentsData}
                        </div>
                    </div>
                </div>
                <div className="profile-posts">
                    <div className="post-container">{image}</div>
                    <nav className="page-jumper">
                        <img src={next} width={20} className="prev-button" onClick={handleClickPrev}/>
                        <img src={next} width={20} className="next-button" onClick={handleClickNext}/>
                    </nav>
                </div>
            </div>
        </div>
    )
}