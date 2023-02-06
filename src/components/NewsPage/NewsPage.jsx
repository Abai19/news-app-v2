import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewsPage.module.css";
import { CircularProgress } from "@mui/material";
import { API } from "../../api";
import Post from "../Post/Post";
import Filter from "../Filter/Filter";
import TuneIcon from "@mui/icons-material/Tune";
import Header from "../Header/Header";
import Footer from "../Footer/Footer"

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
