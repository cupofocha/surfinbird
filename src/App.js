import './App.css';
import MainPage from "./mainpage/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./login/LoginPage";
import history from './History';



function App() {
  return (
        <BrowserRouter>
              <Routes history={history}>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/login" element={<LoginPage />} />
              </Routes>
        </BrowserRouter>
  )
  ;
}

export default App;
