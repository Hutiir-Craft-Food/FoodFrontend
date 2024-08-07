import Navbar from "../Navbar/Navbar";
import SiteNavigation from "./SiteNavigation";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <p></p>
        <Navbar />
        <SiteNavigation />
      </div>
    </header>
  );
}
