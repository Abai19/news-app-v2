import styles from "./Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoBlock}>
            <Link className={styles.logo} to="/newsPage">
              Your Logo
            </Link>
          </div>
          <div className={styles.headerRightContent}>
            <SearchIcon className={styles.searchIcon} />
            <AccountCircleRoundedIcon
              className={styles.accountCircleRoundedIcon}
              onClick={() => navigate("/userPage")}
            />
            <MenuRoundedIcon className={styles.menuRoundedIcon} />
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
