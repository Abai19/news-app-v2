import styles from "./Login.module.css";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { getTokenFunction } from "../../redux/tokenSlice";

function Login() {
 // const token = localStorage.getItem("token");
  const token = useSelector(state=> state.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/newsPage");
    }
  }, []);
  const [data, setData] = useState({
    nickname: "",
    password: "",
  });
  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async () => {
    if (data.nickname && data.password === "") {
      alert("Enter your nickname or password");
      return;
    }
    dispatch(getTokenFunction({data,navigate}))
  };
   console.log(token);
  return (
    <div className={styles.container}>
      <div className={styles.forCentr}>
        <Link className={styles.logo} to="#">
          Your Logo
        </Link>
      </div>
      <div className={styles.nickEnt}>
        <Typography variant="subtitle1" component="p">
          Никнейм
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          name="nickname"
          value={data.nickname}
          onChange={onChange}
        />
      </div>
      <div className={styles.passEnt}>
        <Typography variant="subtitle1" component="p">
          Пароль
        </Typography>
        <FormControl>
          <TextField
            id="outlined-passwordEnt"
            type="password"
            autoComplete="current-password"
            size="small"
            name="password"
            value={data.password}
            onChange={onChange}
          />
        </FormControl>
      </div>
      <div className={styles.forCentr}>
        <Button variant="contained" size="small" onClick={onSubmit}>
          Войти
        </Button>
      </div>
      <Typography
        className={styles.noAccLabel}
        variant="subtitle1"
        component="p"
      >
        Если у вас нет аккаунта, то перейдите по
        <Link className={styles.regLink} to="/registration">
          ссылке
        </Link>
      </Typography>
    </div>
  );
}

export default Login;
