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
import SearchPage from "./search_page/SearchPage"
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
                      <Route path="/search/:keyword" element={<SearchPage />}/>
                  </Routes>
            </BrowserRouter>
            <ToastContainer/>
      </>
  )
  ;
}

export default App;
