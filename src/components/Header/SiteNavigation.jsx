import { Link } from "react-router-dom";
import styles from "./SiteNavigation.module.scss";

const SiteNavigation = () => {
  return (
    <nav className={styles.mainNavigation}>
      <ul>
        <li>
          <Link to="/catalog">Каталог</Link>
        </li>
        <li>
          <Link to="/delivery">Доставка і оплата</Link>
        </li>
        <li>
          <Link to="/manufacturers">Виробники</Link>
        </li>
        <li>
          <Link to="/partnership">Співпраця</Link>
        </li>
        <li>
          <Link to="/blog">Блог</Link>
        </li>
        <li>
          <Link to="/about-us">Про нас</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SiteNavigation;
