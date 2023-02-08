import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import HeaderSecond from "../../components/HeaderSecond/HeaderSecond";
import Post from "../../components/Post/Post";
import styles from './FavoriteNews.module.css'
function FavoriteNews () {
    const [likeList, setLikeList] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    useEffect(()=>{
        if(!token){
            navigate('/')
        }
        else {
            getMyLikeList()
        }
    },[])
    const getMyLikeList = async () => {
        const response = await fetch(API.posts.likeList, {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const list = await response.json();
        if (list) {
            setLikeList(list);
        }
      };
    return (
        <div className={styles.container}>
                <HeaderSecond/>
                <div className={styles.titleBox}>
                <Typography variant="h4" component="h4">
                Избранные новости
            </Typography>
                </div>
             
                <div className={styles.myPosts}>
          {likeList.length > 0 ? (
            likeList.map((item) => (
              <Post
                image={item.image}
                key={item.id}
                text={item.text}
                title={item.title}
                id={item.id}
                show="myFavorite"
              />
            ))
          ) : (
            <Typography variant="h2" component="h2" className={styles.noPosts}>
              У вас нет избранных постов !
            </Typography>
          )}
        </div>
        </div>
        
    )
}
export default FavoriteNews