import './App.css';
import MainPage from "./mainpage/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./login/LoginPage";
import history from './History';
import RegisterPage from "./register/RegisterPage";
import ImagePost from "./post/ImagePost"
import {ToastContainer} from "react-toastify";
import React from "react";
import NewImagePost from "./post/NewImagePost";
import {StaticRouter} from "react-router-dom/server";
import History from "./History";


function App() {
  return (
      <>
            <BrowserRouter>
                  <Routes history={history}>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/post/image/:postId" element={<ImagePost />}/>
                      <Route path="/post/image/new" element={<NewImagePost />}/>
                  </Routes>
            </BrowserRouter>
            <ToastContainer/>
      </>
  )
  ;
}

export default App;
