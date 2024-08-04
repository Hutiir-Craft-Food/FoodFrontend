import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className="container">
        <Link to="#"></Link>
        <Link to="#"></Link>
        <Link to="#"></Link>
      </div>
    </nav>
  );
}
