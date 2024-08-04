import Navbar from "../Navbar/Navbar";
import HeaderNavigation from "../HeaderNavigation/HeaderNavigation";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <p></p>
        <Navbar />
        <HeaderNavigation />
      </div>
    </header>
  );
}
