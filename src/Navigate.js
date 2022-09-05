import React, {useEffect, useState} from 'react';
import "./Navigate.css";
import seagull from "./images/seagull.png"
import history from "./History";
import NewImagePost from "./post/NewImagePost";
import Expanse from "react-expanse";
import Search from "./images/icons8-search-30.png"


export default function Navigate() {
    const userId = sessionStorage.getItem("userId")
    const [imagePost, setImagePost] = useState(false)
    const [show, setShow] = useState(false)
    const [showSearchIcon, setShowSearchIcon] = useState(true)
    const [width2Small, setWidth2Smaill] = useState(false)
    const [search, setSearch] = useState()
    let windowWidth = window.innerWidth

    const handleImagePostClick = () => {
        setImagePost(prevState => {
            return !prevState
        })
    }

    useEffect(()=>{
        setWidth2Smaill(windowWidth < 1200)
        function watchWidth() {
            windowWidth = window.innerWidth
            setWidth2Smaill(windowWidth < 1200)
        }
        window.addEventListener("resize", watchWidth)
        return function() {
            window.removeEventListener("resize", watchWidth)
        }
    },[])

    function handleSubmit(e) {
        e.preventDefault()
        history.push("/search/"+search)
        history.go()
    }

    return (
        <>
            <nav className="navigate">
                <img id="logo" className="logo" src={seagull} width={40} height={40} onClick={() => {history.push({pathname:"/"})
                    history.go()}} />
                {!width2Small &&
                    <div className="nav-buttons-left">
                        <button className="button--nav" onClick={handleImagePostClick}>
                            <span>Image</span>
                        </button>
                        <button className="button--nav">
                            <span>Bird</span>
                        </button>
                    </div>
                }
                <form className="from--search" onSubmit={handleSubmit}>
                    <input className="input--search" placeholder="Search"
                           onFocus={()=>setShowSearchIcon(!showSearchIcon)}
                           onBlur={()=>setShowSearchIcon(!showSearchIcon)}
                           onChange={e=>setSearch(e.target.value)}
                    />
                    <button type="submit" className="button--search">
                        {showSearchIcon&&<img src={Search} className="search-icon" height={25}/>}
                    </button>
                </form>
                {!width2Small &&
                    <div className="nav-buttons">
                        {sessionStorage.getItem("is_login") === '1' &&
                            <button className="button--nav" onClick={() => {history.push({pathname:"/user/"+userId})
                                history.go()}}>
                            <span>Profile</span>
                        </button>}
                        {sessionStorage.getItem("is_login") !== '1' &&
                            <button className="button--nav"  onClick={() => {history.push({pathname:"/login"})
                            history.go()}}>
                            <span>Login</span>
                        </button>}
                        {sessionStorage.getItem("is_login") !== '1' &&
                            <button className="button--nav" onClick={() => {history.push({pathname:"/register"})
                                history.go()}}>
                            <span>Register</span>
                        </button>}
                        {sessionStorage.getItem("is_login") === '1' &&
                            <button className="button--nav" onClick={()=>{sessionStorage.setItem("is_login", '0')
                                sessionStorage.setItem("userId", '0')
                                history.push("/")
                                history.go()}}>
                            <span>Logout</span>
                        </button>}
                            <button className="button--nav" onClick={() => {
                                history.push("/about")
                                history.go()
                            }}>
                                <span>About</span>
                            </button>
                        {width2Small && <button onClick={()=>setShow(!show)}>Expanse</button>}
                    </div>
                }
                {
                    width2Small &&
                    <div className="expanse">
                        <button className="expanse-button" onClick={()=>setShow(!show)}>{!show? 'Expanse' : 'Fold'}</button>
                        <Expanse show={show}>
                            <div className="expanse-items">
                                {sessionStorage.getItem("is_login") === '1' &&
                                    <>
                                        <button className="expanse-item" onClick={handleImagePostClick}>Post Image</button>
                                        <button className="expanse-item" >???</button>
                                        <button className="expanse-item" onClick={() => {history.push({pathname:"/user/"+userId})
                                            history.go()}}>Profile</button>
                                        <button className="expanse-item" onClick={()=>{sessionStorage.setItem("is_login", '0')
                                            sessionStorage.setItem("userId", '0')
                                            history.push("/")
                                            history.go()}}>Logout</button>
                                        <button className="expanse-item">???</button>
                                    </>
                                }
                                {sessionStorage.getItem("is_login") !== '1' &&
                                    <>
                                        <button className="expanse-item" onClick={() => {history.push({pathname:"/login"})
                                            history.go()}}>Login</button>
                                        <button className="expanse-item" onClick={()=>{history.push("/register")
                                            history.go()}}>Register</button>
                                        <button className="expanse-item">???</button>
                                    </>
                                }
                            </div>
                        </Expanse>
                    </div>
                }
            </nav>
            {imagePost && <NewImagePost click={handleImagePostClick}/>}
        </>
    )
}