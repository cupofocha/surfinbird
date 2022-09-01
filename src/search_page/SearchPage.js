import {useParams} from "react-router-dom";
import Navigate from "../Navigate";
import "./SearchPage.css"
import Seagull from "../images/seagull.png"
import {useEffect, useState} from "react";
import GlobalVar     from "../GlobalVar";
import globalVar from "../GlobalVar";
import History from "../History";
import history from "../History";
import Loading from "../Loading";
import { useTimer } from 'react-timer-hook';

export default function SearchPage() {
    const keyword = useParams().keyword
    const [resultsData, setResultsData] = useState([])
    const [postResults, setPostResults] = useState([])
    const [userResults, setUserResults] = useState([])
    const [noResults, setNoResults] = useState(false)
    function MyTimer({ expiryTimestamp }) {
        const {
            seconds,
            start,
        } = useTimer({ expiryTimestamp, onExpire: () => {
                if(userResults.length === 0 && postResults.length === 0) {
                    console.log("Time out!")
                    setNoResults(true)
                }
            } })
    };

    useEffect(()=>{
        const url = globalVar.apiServer + "search/" + keyword
        fetch(url)
            .then(res => res.json())
            .then(data => setResultsData(data))
    }, [])

    useEffect(()=>{
        if(resultsData.searchPostDtoList !== undefined){
            setPostResults(resultsData.searchPostDtoList.map(post => {
                return (<PostCard
                    postId = {post.id}
                    path ={post.birdImage.path}
                    posterName = {post.posterName}
                    text = {post.text}
                />)
            }))
        }
    }, [resultsData])

    useEffect(()=>{
        if(resultsData.userInfoDtoList !== undefined){
            setUserResults(resultsData.userInfoDtoList.map(user => {
                return (<UserCard
                    userName = {user.displayName}
                    email = {user.email}
                    userId = {user.userId}
                />)
            }))
        }
    }, [resultsData])

    function PostCard(props) {
        const postId = props.postId
        return (
            <div className="post-card" onClick={() => {history.push({pathname:"/post/image/" + postId})
                history.go()}}>
                <div className="search-post-img-container">
                    <img className="search-post-img" src={props.path}/>
                </div>
                <div className="search-post-card-right">
                    <div className="search-post-poster-info">
                        <img className="search-post-poster-avatar" src={Seagull} width={60} height={60}/>
                        <h2 className="search-post-poster-name">{props.posterName}</h2>
                    </div>
                    <h4 className="search-post-text">{props.text}</h4>
                </div>
            </div>
        )
    }
    function UserCard(props) {
        const userId = props.userId
        return (
            <div className="user-card" onClick={() => {history.push({pathname:"/user/" + userId})
                history.go()}}>
                <div className="search-user-avatar-container">
                    <img className="search-user-avatar" src={Seagull}/>
                </div>
                <div className="search-user-info">
                    <h2 className="search-user-name">{props.userName}</h2>
                    <h3 className="search-user-email">{props.email}</h3>
                </div>
            </div>
        )
    }

    return (
        <>
            <MyTimer expiryTimestamp={new Date().setSeconds(5)}/>
            <Navigate />
            {userResults.length === 0 && postResults.length === 0 && !noResults && <Loading/>}
            <div className="search-list">
                {
                    noResults &&
                    <h2 className="no-result">No Result!</h2>
                }
                {userResults}
                {postResults}
            </div>
        </>
    )
}