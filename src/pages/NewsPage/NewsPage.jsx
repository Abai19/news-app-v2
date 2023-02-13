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

function NewsPage() {
  const token = localStorage.getItem("token");
  const [newsList, setNewList] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      getAllNews();
      getAllTags();
    }
  }, []);

  const getAllTags = async () => {
    const response = await fetch(API.posts.tagList, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const list = await response.json();
    if (list) {
      setTags(list);
    }
  };

  const getAllNews = async () => {
    const response = await fetch(API.posts.newsList, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const list = await response.json();
    if (list) {
      setNewList(list);
    }
  };
  const putLike = async (id) => {
    const response = await fetch(API.posts.likeList, {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
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
            {newsList.length > 0 ? (
              <div className={styles.post}>
                {newsList.map((item) => (
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
