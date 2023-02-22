import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewsPage.module.css";
import { CircularProgress } from "@mui/material";
import { API } from "../../api";
import Post from "../../components/Post/Post";
import Filter from "../../components/Filter/Filter";
import TuneIcon from "@mui/icons-material/Tune";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer"
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { useSelector,useDispatch } from "react-redux";
import {getNewsListFunction } from '../../redux/newsSlice'
function NewsPage() {
  //const token = localStorage.getItem("token");
  const token = useSelector(state=> state.token.token);
  console.log(token)
  //const [newsList, setNewList] = useState([]);
  const newsList = useSelector(state=> state.news.newsList)
  console.log(newsList)
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      //getAllNews();
      dispatch(getNewsListFunction({token}))
      getAllTags();
    }
  }, []);

  const getAllTags = async () => {
    const response = await fetch(API.posts.tagList, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const list = await response.json();
    if (list) {
      setTags(list);
    }
  };

  // const getAllNews = async () => {
  //   const response = await fetch(API.posts.newsList, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Token ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   const list = await response.json();
  //   if (list) {
  //     setNewList(list);
  //   }
  // };
  const putLike = async (id) => {
    const response = await fetch(API.posts.likeList, {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`,
       "Content-Type": "application/json",
      },
      body: JSON.stringify({post: id}),
    });
    const info = await response.json();
    console.log(info)
    if (info) {
  
      toast.success("Добавлено в избранные");
    }
    else {
      toast.error("Системная ошибка");
    }
  };
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 5;
  const currentItems = newsList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(newsList.length / 5);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % newsList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className={styles.main}>
        <Header />
        <div className={styles.container}>
          <div className={styles.mainFilter}>
            <Filter tags={tags} className={styles.filter} />
          </div>
          <div className={styles.mainTuneIcon}>
            <TuneIcon className={styles.tuneIcon} />
          </div>

          <div className={styles.mainNewsContent}>
            {currentItems.length > 0 ? (
              <div className={styles.post}>
                {currentItems.map((item) => (
                  <Post
                    image={item.image}
                    key={item.id}
                    text={item.text}
                    title={item.title}
                    id={item.id}
                    isLiked={item.is_liked}
                    putLike={putLike}
                  />
                ))}
                  <ReactPaginate
                      breakLabel="..."
                      nextLabel="след >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel="< пред"
                      renderOnZeroPageCount={null}
                      containerClassName="pagination"
                      activeClassName="active"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                  />
              </div>
            ) : (
              <div className={styles.circularBlock}>
                <CircularProgress className={styles.circularProgress} />
              </div>
            )}
            
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default NewsPage;
