import React, {useEffect} from "react";
import seagull from "../images/seagull.png"
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import history from '../History';
import "./RegisterPage.css"
import globalVar from "../GlobalVar";

export default function RegisterPage() {
    const [formData, setFormData] = React.useState({
        displayName: "",
        password: "",
        email: "",
        role: "LOGIN",
    })

    const [tempFormData, setTempFormData] = React.useState({
        displayName: "",
        password: "",
        confirmPassword: "",
        email: "",
        role: "LOGIN",
    })

    function handleChange(event) {
        const {name, value} = event.target
        setTempFormData(prevTempFormData => ({
            ...prevTempFormData,
            [name]: value
        }))
    }

    useEffect(()=>{
        if(sessionStorage.getItem("is_login") === '1')
        {
            history.push('/')
            history.go()
        }
    },[1])

    function handleSubmit(event) {
        event.preventDefault()
        if(tempFormData.password !== tempFormData.confirmPassword) {
            toast.error('Passwords do not match!', {
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
        else if(tempFormData.displayName.length === 0) {
            toast.error('Display name is empty!', {
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

        let newState = tempFormData
        delete newState["confirmPassword"]

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newState)
        };

        let url = globalVar.apiServer + "user/register"
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.state === "Success") {
                    sessionStorage.setItem("is_login", '1');
                    sessionStorage.setItem("userId", data.userId)
                    history.push({pathname:"/"})
                    history.go()
                    toast.success('Registered successfully', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
            }
                else if (data.state === "User-exists")
                    toast.error('User using this Email already Exists!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                else
                    toast.error("Unknown Error!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
            })

    }

    return (
        <div className="register-page">
            <div className="register-sign">
                <span className="register-logo">
                    <img src={seagull} width={80} onClick={() => {history.push({pathname:"/"})
                        history.go()}} />
                    Surfin' Bird
                </span>
                <a className="register-slogan" href="https://www.youtube.com/watch?v=9Gc4QTqslN4&ab_channel=VDJMikeyMike">Everybody's heard about the bird</a>
            </div>
            <form className="register-form-card" onSubmit={handleSubmit}>
                <div className="register-card_header">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path fill="currentColor"
                              d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
                    </svg>
                    <h1 className="register-form_heading">Sign up</h1>
                </div>
                <div className="register-field">
                    <label htmlFor="displayName">Display Name</label>
                    <input className="register-input"
                           name="displayName"
                           type="text"
                           placeholder="Display Name"
                           id="displayName"
                           value={tempFormData.displayName}
                           onChange={handleChange} />
                </div>
                <div className="register-field">
                    <label htmlFor="email">Email</label>
                    <input className="register-input"
                           name="email"
                           type="email"
                           placeholder="Email"
                           id="email"
                           value={tempFormData.email}
                           onChange={handleChange} />
                </div>
                <div className="register-field">
                    <label htmlFor="password">Password</label>
                    <input className="register-input"
                           name="password"
                           type="password"
                           placeholder="Password"
                           id="password"
                           value={tempFormData.password}
                           onChange={handleChange} />
                </div>
                <div className="register-field">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input className="register-input"
                           name="confirmPassword"
                           type="password"
                           placeholder="Confirm Password"
                           id="confirmPassword"
                           value={tempFormData.confirmPassword}
                           onChange={handleChange} />
                </div>
                <div className="register-field">
                    <button className="register-button--submit">Sign up</button>
                </div>
            </form>
        </div>
    )
}