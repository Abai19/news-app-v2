import styles from "./Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {ReactComponent as Logo} from './images/logo.svg'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIconMenu from "../FavoriteIconMenu/FavoriteIconMenu";
function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoBlock}>
            <Link className={styles.logo} to="/newsPage">
              <Logo/>
            </Link>
          </div>
          <div className={styles.headerRightContent}>
            <SearchIcon className={styles.searchIcon} />
            <AccountCircleRoundedIcon
              className={styles.accountCircleRoundedIcon}
              onClick={() => navigate("/userPage")}
            />
           <FavoriteIconMenu color="white"/>
            {/* <MenuRoundedIcon className={styles.menuRoundedIcon} /> */}
          </div>
        </div>
        <Typography className={styles.headerTitle} variant="h1" component="h1">
          Новости
        </Typography>
      </header>
    </>
  );
}

export default Header;
