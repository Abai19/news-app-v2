import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.logoBlock}>
            <Link className={styles.logo} to="/newsPage">
              Your Logo
            </Link>
          </div>
          <div className={styles.footerLinks}>
            <Link className={styles.profileLink} to="/userPage">
              Мой профиль
            </Link>
            <Link className={styles.favoritesLink} to="#">
              Избранные новости
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
