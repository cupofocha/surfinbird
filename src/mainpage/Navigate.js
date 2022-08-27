import React, {useEffect, useState} from 'react';
import "./Navigate.css";
import seagull from "../images/seagull.png"
import history from "../History";
import {useRoutes} from "react-router-dom";

export default function Navigate() {

    return (
        <nav className="navigate">
            <img id="logo" className="logo" src={seagull} width={40} height={40}/>
            <div className="search-bar">
                <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                    <g>
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                </svg>
                <input placeholder="Search" type="search" className="input" />
            </div>
            {sessionStorage.getItem("is_login") === '1' &&
                <button className="button--nav">
                <span>Profile</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
            </button>}
            {sessionStorage.getItem("is_login") !== '1' &&
                <button className="button--nav"  onClick={() => {history.push({pathname:"/login"})
                history.go()}}>
                <span>Login</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
            </button>}
            {sessionStorage.getItem("is_login") !== '1' &&
                <button className="button--nav" onClick={() => {history.push({pathname:"/register"})
                    history.go()}}>
                <span>Register</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
            </button>}
            {sessionStorage.getItem("is_login") === '1' &&
                <button className="button--nav" onClick={()=>{sessionStorage.setItem("is_login", '0')
                history.push("/")
                history.go()}}>
                <span>Logout</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
            </button>}
            <button className="button--nav" onClick={()=>{
                history.push("/about")
                history.go()}}>
                <span>About</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
            </button>
        </nav>
    )
}