import './App.css';
import MainPage from "./main_page/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./login/LoginPage";
import history from './History';
import RegisterPage from "./register/RegisterPage";
import ImagePost from "./post/ImagePost"
import {ToastContainer} from "react-toastify";
import React from "react";
import Profile from "./profile/Profile"
import NewImagePost from "./post/NewImagePost";
import {StaticRouter} from "react-router-dom/server";
import History from "./History";
import DeleteButton from "./delete_button/DeleteButton";


function App() {
  return (
      <>
            <BrowserRouter>
                  <Routes history={history}>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/post/image/:postId" element={<ImagePost />}/>
                      <Route path="/user/:userId" element={<Profile />}/>
                      <Route path="/delete" element={<DeleteButton />}/>
                  </Routes>
            </BrowserRouter>
            <ToastContainer/>
      </>
  )
  ;
}

export default App;
