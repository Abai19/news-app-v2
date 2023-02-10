import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import NewsPage from "./components/NewsPage/NewsPage";
import Registration from "./components/Registration/Registration";
import SingleNew from "./components/SingleNew/SingleNew";
import UserPage from "./components/UserPage/UserPage";
import { Route, Routes } from "react-router-dom";
import ModalCreatePost from "./components/ModalCreatePost/ModalCreatePost";
import FavoriteNews from "./pages/FavoriteNews/FavoriteNews";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/newsPage" element={<NewsPage />} />
        <Route path="/newsPage/:id" element={<SingleNew />} />
        <Route path="/userPage" element={<UserPage />} />
        <Route path ="/createPost" element={<ModalCreatePost/>}/>
        <Route path ="/favoriteNews" element={<FavoriteNews/>}/>
      </Routes>
      <ToastContainer />
  </BrowserRouter>
  // </React.StrictMode>
);
