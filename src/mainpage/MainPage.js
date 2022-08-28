import React, {useEffect} from "react";
import Navigate from "../Navigate";
import Images from "./Images";
import "./MainPage.css"

export default function MainPage() {
    return (
        <div className="main-page">
            <Navigate />
            <Images />
        </div>
    )
}