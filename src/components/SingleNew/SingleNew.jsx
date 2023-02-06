import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../api";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "./SingleNew.module.css";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import notIcon from "../Post/images/notIconImage.png";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function SingleNew() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [singleNew, setsingleNew] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getSengleNew();
    }
  }, []);

  const getSengleNew = async () => {
    const response = await fetch(`${API.posts.newsList}${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const list = await response.json();
    if (list) {
      setsingleNew(list);
    }
  };
  console.log(singleNew);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Link className={styles.regLink} to="/newsPage">
          <KeyboardBackspaceIcon />
        </Link>
        <div className={styles.CardMainContent}>
          <div className={styles.textContentTop}>
            <Typography
              variant="p"
              component="p"
              className={styles.textContentTopDate}
            >
              September 14, 2016
            </Typography>
            <Checkbox
              {...label}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          </div>
          <div className={styles.singleNewTitle}>
            <Typography
              variant="subtitle1"
              component="p"
              className={styles.title}
            >
              {singleNew.title}
            </Typography>
          </div>
          <div className={styles.singleNewshortDesc}>
            <Typography variant="p" component="p" className={styles.shortDesc}>
              {singleNew.short_desc}
            </Typography>
          </div>
          <div className={styles.cardImageBlock}>
            {singleNew.image ? (
              <img
                className={styles.cardImage}
                src={`https://megalab.pythonanywhere.com/${singleNew.image}`}
                alt=""
              />
            ) : (
              <img src={notIcon} alt="noyIconImage" className={styles.notIconImage} />
            )}
          </div>
          <>{singleNew.text}</>
          <IconButton aria-label="share" className={styles.shareIcon}>
            <ShareIcon />
          </IconButton>
        </div>
        <div className={styles.comments}>
          <Typography
            variant="h5"
            component="h5"
            className={styles.commentsTitle}
          >
            Комментарии
          </Typography>
          <div className={styles.commentsInner}>
            {/* <Typography
              variant="p"
              component="p"
              className={styles.commentNickname}
            >
              <>
                {singleNew.comment[0].user.nickname
                  ? singleNew.comment[0].user.nickname
                  : ""}
              </>
            </Typography> */}
            {/* <Typography
              variant="p"
              component="p"
              className={styles.commentText}
            >
              {`${singleNew.comment[0].text}`}
            </Typography> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleNew;
