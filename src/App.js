import './App.css';
import MainPage from "./mainpage/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./login/LoginPage";
import history from './History';
import RegisterPage from "./register/RegisterPage";



function App() {
  return (
        <BrowserRouter>
              <Routes history={history}>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
              </Routes>
        </BrowserRouter>
  )
  ;
}

export default App;
