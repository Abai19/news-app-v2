import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import NewsPage from './pages/NewsPage/NewsPage'
import Registration from "./components/Registration/Registration";
import SingleNew from "./pages/SingleNew/SingleNew";
import UserPage from "./pages/UserPage/UserPage";
import { Route, Routes } from "react-router-dom";
import ModalCreatePost from "./components/ModalCreatePost/ModalCreatePost";
import FavoriteNews from "./pages/FavoriteNews/FavoriteNews";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { store } from './redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/newsPage" element={<NewsPage />} />
          <Route path="/:title/:id" element={<SingleNew />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path ="/createPost" element={<ModalCreatePost/>}/>
          <Route path ="/favoriteNews" element={<FavoriteNews/>}/>
        </Routes>
        <ToastContainer />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
