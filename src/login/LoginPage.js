import React, {useEffect} from "react";
import seagull from "../images/seagull.png"
import "./LoginPage.css"
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import history from '../History';
import globalVar from "../GlobalVar";


export default function LoginPage() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    })

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        function sleep(ms){
            for(let t = Date.now(); Date.now() - t <= ms;);
        }

        let url = globalVar.apiServer + "user/login"
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(data => {
                if(data.state === "Successful") {
                    loginSuccessful()
                    sessionStorage.setItem("is_login", '1')
                    sessionStorage.setItem("userId", data.userId)
                    window.history.back(-1)
                }
                else if (data.state === "Wrong_password")
                    toast.error('Wrong password!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                else if (data.state === "Wrong_email")
                    toast.error("User doesn't exist!", {
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

    function loginSuccessful(){
        toast.success('Logged in successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    return (
        <div className="login-page">
            <div className="login-sign">
                <span className="login-logo">
                    <img src={seagull} width={80} onClick={() => {history.push({pathname:"/"})
                        history.go()}} />
                    Surfin' Bird
                </span>
                <a className="login-slogan" href="https://www.youtube.com/watch?v=9Gc4QTqslN4&ab_channel=VDJMikeyMike">Everybody's heard about the bird</a>
            </div>
            <form className="form card" onSubmit={handleSubmit}>
                <div className="card_header">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path fill="currentColor"
                              d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
                    </svg>
                    <h1 className="form_heading">Sign in</h1>
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input className="input"
                           name="email"
                           type="email"
                           placeholder="Email"
                           id="email"
                           value={formData.email}
                           onChange={handleChange} />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input className="input"
                           name="password"
                           type="password"
                           placeholder="Password"
                           id="password"
                           value={formData.password}
                           onChange={handleChange} />
                </div>
                <div className="field">
                    <button className="button--submit">Sign in</button>
                    <button className="button--register" onClick={() => {
                        history.push({pathname:"/register"})
                        history.go()}}>Sign up</button>
                </div>
            </form>
        </div>
    )
}