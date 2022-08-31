import React, {useEffect} from "react";
import history from "../History";
import Navigate from "../Navigate";
import "./NewImagePost.css";
import globalVar from "../GlobalVar";
import {toast} from "react-toastify";

export default function NewImagePost() {
    const [imageData, setImageData] = React.useState({})
    const [formData, setFormData] = React.useState({
        text:"",
        birdImageId:""
    })
    const [labelText, setLabelText] = React.useState("")

    useEffect(()=>{
        if(sessionStorage.getItem("is_login") === '0')
        {
            history.push('/login')
            history.go()
        }
        setLabelText("Upload Image")
    },[])

    function updateLabel() {
        if(imageData.length === 0) {
            setLabelText("Upload Image")
        }
        else {
            setLabelText("Image Uploaded")
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        if(formData.text.length === 0) {
            toast.error("Post text can't be empty!", {
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
        else if(labelText === "Upload Image") {
            toast.error("Haven't uploaded image yet!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
        })
            return 0;
        }

        const tempForm = new FormData()
        tempForm.append('birdImage', imageData)

        const url = globalVar.apiServer + "birdImages/upload-image/" + sessionStorage.getItem("userId")
        fetch(url, {
            method: 'POST',
            body: tempForm
        })
            .then(res => res.json())
            .then(data => {
                if (data.state !== 'Success') {
                    console.log("something went wrong1")
                }
                else {
                    let tempForm = {
                        "text" : '',
                        "birdImageId" : ''
                    }
                    let tempForm2 = {
                        "id" : '',
                        "postId" : ''
                    }
                    tempForm2.id = data.imageId
                    tempForm.text = formData.text
                    tempForm.birdImageId = data.imageId
                    console.log(tempForm)

                    const url = globalVar.apiServer + "post/image/" + sessionStorage.getItem("userId")
                    fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(tempForm),
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if(data.state === "Success") {
                                tempForm2.postId = data.id
                                console.log(tempForm2)
                                const url = globalVar.apiServer + "birdImages/update-image-postid"
                                fetch(url, {
                                    method: 'POST',
                                    body: JSON.stringify(tempForm2),
                                    headers: { 'Content-Type': 'application/json' }
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.state !== 1) {
                                            console.log("something went wrong2")
                                        }
                                    })
                                history.go()
                            }
                            else {
                                console.log("oops")
                            }
                        })
                }
            })
    }

    function onFileChange(e) {
        updateLabel()
        setImageData(e.target.files[0])
        console.log(imageData)
    }

    function onTextChange(e) {
        const {name, value} = e.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    return (
        <form className="new-image-post" onSubmit={handleSubmit} >
            <textarea className="textarea--post" name="text" onChange={onTextChange}></textarea>
            <button className="button--cancel" onClick={()=>{history.go()}}>Cancel</button>
            <label className="image-uploader" for="birdImage">{labelText}</label>
            <input type="file" className="input--image" accept="image/*" id="birdImage" name="birdImage" onChange={onFileChange}/>
            <button className="button--post">Post</button>
        </form>
    )
}