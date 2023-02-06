import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import styles from "./Post.module.css";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import notIcon from "../Post/images/notIconImage.png"

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Post({ title, text, image, id, show }) {
  return (
    <>
      <Card className={styles.CardMainContent}>
        <div className={styles.imgContent}>
          <div className={styles.cardImageBlock}>
            {
              image ?
               <img
                className={styles.cardImage}
                src={`https://megalab.pythonanywhere.com/${image}`}
                alt=""
              />
              :
              <img src={notIcon} alt="notIconImage" className={styles.notIcon}/>
            }
          </div>
        </div>
        <div className={styles.textContent}>
          <div className={styles.textContentTop}>
            <Typography
              variant="subtitle1"
              component="p"
              className={styles.textContentTopDate}
            >
              September 14, 2016
            </Typography>
            {show === "myPage" ? (
              <DeleteIcon className={styles.trashIcon} />
            ) : (
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
            )}
          </div>
          <div className={styles.textContentBottom}>
            <Typography
              variant="h4"
              component="p"
              className={styles.textContentTitle}
            >
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              className={styles.textContentText}
            >
              {text}
            </Typography>
            <Link to={`${id}`} className={styles.readMore}>
              Читать дальше <ArrowRightAltIcon fontSize="small" />
            </Link>
            <IconButton aria-label="share" className={styles.shareIcon}>
              <ShareIcon />
            </IconButton>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Post;
