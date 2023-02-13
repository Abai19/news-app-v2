import styles from "./HeaderSecond.module.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIconMenu from "../FavoriteIconMenu/FavoriteIconMenu";
import {ReactComponent as Logo} from './logoPurple.svg'
function HeaderSecond(){
    const navigate = useNavigate();
    return (
        <header>
        <div className={styles.logoBlock}>
          <Link  to="/newsPage">
            <Logo/>
          </Link>
        </div>
        <div className={styles.headerRightContent}>
          <SearchIcon className={styles.searchIcon} color="primary" />
          <AccountCircleRoundedIcon
            className={styles.accountCircleRoundedIcon}
            color="primary"
            onClick={() => navigate("/userPage")}
          />
          {/* <MenuRoundedIcon className={styles.menuRoundedIcon} /> */}
          <FavoriteIconMenu color="#7e5bc2"/>
        </div>
      </header>
    )
}
export default HeaderSecond