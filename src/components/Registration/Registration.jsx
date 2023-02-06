import styles from "./Registration.module.css";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API } from "../../api";
// import { FullscreenExit } from "@mui/icons-material";

function Registration() {
  const [data, setData] = useState({
    nickname: "",
    name: "",
    last_name: "",
    profile_image: "",
    password: "",
    password2: "",
  });

  const onChangeInfo = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const changeFile = (e) => {
    setData({
      ...data,
      profile_image: e.target.files[0],
    });
  };
  console.log(data);
  const submitData = async (e) => {
    let formData = new FormData();
    formData.append("last_name", data.last_name);
    formData.append("name", data.name);
    formData.append("nickname", data.nickname);
    formData.append("password", data.password);
    formData.append("password2", data.password2);
    formData.append("profile_image", data.profile_image);

    const response = fetch(API.users.registration, {
      method: "POST",
      body: formData,
    });
    const info = await response.json();
    console.log(info);
    if (info) {
      alert("User was created");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.forCentr}>
          <Link className={styles.logo} to="#">
            Your Logo
          </Link>
        </div>
        <div className={styles.avatar}>
          <Typography variant="subtitle1" component="p">
            Выберите аватар
          </Typography>
          <TextField
            className={styles.chooseFail}
            id="outlined-basic"
            variant="outlined"
            size="small"
            type="file"
            onChange={changeFile}
          />
        </div>
        <div className={styles.lastNameEnt}>
          <Typography variant="subtitle1" component="p">
            Фамилия
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            name="last_name"
            value={data.last_name}
            onChange={onChangeInfo}
          />
        </div>
        <div className={styles.firNameEnt}>
          <Typography variant="subtitle1" component="p">
            Имя
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            name="name"
            value={data.name}
            onChange={onChangeInfo}
          />
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
            onChange={onChangeInfo}
          />
        </div>
        <div className={styles.passEnt}>
          <Typography variant="subtitle1" component="p">
            Пароль
          </Typography>
          <div className={styles.pass1}>
            <FormControl>
              <TextField
                id="outlined-passwordEnt2"
                type="password"
                autoComplete="current-password"
                size="small"
                name="password"
                value={data.password}
                onChange={onChangeInfo}
              />
            </FormControl>
            <div className={styles.limitSim}>
              <Typography variant="subtitle1" component="p">
                Лимит на символы
              </Typography>
            </div>
          </div>
        </div>
        <div className={styles.passEnt2}>
          <Typography variant="subtitle1" component="p">
            Подтверждение пароля
          </Typography>
          <FormControl>
            <TextField
              id="outlined-passwordEnt3"
              type="password"
              autoComplete="current-password"
              size="small"
              name="password2"
              value={data.password2}
              onChange={onChangeInfo}
            />
          </FormControl>
        </div>
        <div className={styles.forCentr}>
          <Button variant="contained" size="small" onClick={submitData}>
            Регистрация
          </Button>
        </div>
        <Typography
          className={styles.noAccLabel}
          variant="subtitle1"
          component="p"
        >
          Уже есть логин?
          <Link className={styles.regLink} to="/">
            Войти
          </Link>
        </Typography>
      </div>
    </>
  );
}

export default Registration;
