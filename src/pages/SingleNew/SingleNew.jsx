import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../api";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "./SingleNew.module.css";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import notIcon from "../../components/Post/images/notIconImage.png";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { toast } from 'react-toastify';

import { TextFields } from "@mui/icons-material";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function SingleNew() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText]= useState({
    id: 0,
    text: ''
  })
  const [singleNew, setsingleNew] = useState({
    author: '',
    comment: [],
    id: 0,
    image:'',
    is_liked: false,
    short_desc: '',
    tag:'',
    text: '',
    title: '',
  });
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
  const postComment = async ()=> {
    const response = await fetch(API.comment.postComment, {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
       "Content-Type": "application/json",
      },
      body: JSON.stringify({post: id, text: commentText}),
    });
    const info = await response.json();
    console.log(info)
    if (info) {
      getSengleNew();
      toast.success("Комментарий успешно создан");
    }
    else {
      toast.error("Системная ошибка");
    }
  }
  const sendReply= async(idParrent)=> {
       const response = await fetch(API.comment.postComment, {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
       "Content-Type": "application/json",
      },
      body: JSON.stringify({post: id, text: replyText.text, parent: idParrent}),
    });
    const info = await response.json();
    console.log(info)
    if (info) {
      getSengleNew();
      toast.success("Ответ успешно добавлен!");
    }
    else {
      toast.error("Системная ошибка");
    }
  }

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
         
              <>
                {singleNew.comment.length> 0 ? 
                  singleNew.comment.map(comment=>(
                    <div className={styles.commentBlock}>
                      <Typography
                      variant="p"
                      component="h4"
                      className={styles.commentNickname}
                      >
                        {`${comment.user.name} ${comment.user.last_name}`}
                      </Typography> 
                       <Typography
                       variant="p"
                       component="p"
                      //  className={styles.commentNickname}
                       >
                         {comment.text}
                      
                        </Typography> 
                        <div className={styles.replyBlock}>
                                  <Typography
                          variant="p"
                          component="p"
                          className={styles.textContentTopDate}
                        >
                          September 14, 2016
                        </Typography>
                          <Button className={styles.replyBtn}>
                            ответить
                            </Button>
                            <TextField size="small" 
                            value={replyText.id == comment.id ? replyText.text : ""} 
                            onChange={(e)=> setReplyText({text: e.target.value, id:comment.id})} />
                            <Button variant="contained" className={styles.replyBtn} 
                            onClick={()=>sendReply(comment.id)}>
                              отправить
                            </Button>
                          </div>
                          {comment.child.length > 0 ? 
                              comment.child.map(child=> (
                                    <div class={styles.childContainer}>
                                                    <Typography
                                  variant="p"
                                  component="h4"
                                  className={styles.commentNickname}
                                  >
                                    {`${child.user.name} ${child.user.last_name}`}
                                  </Typography> 
                                          <Typography
                                      variant="p"
                                      component="p"
                                      className={styles.textContentTopDate}
                                    >
                                      {child.text}
                                    </Typography>
                                    <div className={styles.replyBlock}>
                                                <Typography
                                        variant="p"
                                        component="p"
                                        className={styles.textContentTopDate}
                                      >
                                        September 14, 2016
                                      </Typography>
                                        {/* <Button className={styles.replyBtn}>
                                          ответить
                                          </Button> */}
                                          {/* <TextField size="small" ></TextField>
                                          <Button variant="contained" className={styles.replyBtn}>
                                            отправить
                                          </Button> */}
                                    </div>
                                        </div>

                              )) : ""
                          }
                       </div>
                  ))
              
                  
                  : ""
                  }
              </>
              <TextField size="small" value={commentText} onChange={(e)=> setCommentText(e.target.value)}></TextField>
                                          <Button variant="contained" className={styles.replyBtn} onClick={postComment}>
                                            отправить
                                          </Button>
                  
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleNew;
