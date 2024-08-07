import { Link } from "react-router-dom";
import styles from "./ProductCategory.module.scss";
import productIcon from "./Icons/Icons.png";

const ProductCategory = () => {
  return (
    <nav className={styles.mainNavigation}>
      <ul>
        <li>
          <Link to="/meat" className={styles.categoryLink}>
            <div className={styles.iconContainer}>
              <img
                src={productIcon}
                alt="М'ясо та м'ясні вироби"
                className={styles.icon}
              />
            </div>
            <span className={styles.categoryText}>М'ясо та м'ясні вироби</span>
          </Link>
        </li>
        <li>
          <Link to="/culinary" className={styles.categoryLink}>
            <div className={styles.iconContainer}>
              <img src={productIcon} alt="Кулінарія" className={styles.icon} />
            </div>
            <span className={styles.categoryText}>Кулінарія</span>
          </Link>
        </li>
        <li>
          <Link to="/sweets" className={styles.categoryLink}>
            <div className={styles.iconContainer}>
              <img src={productIcon} alt="Солодощі" className={styles.icon} />
            </div>
            <span className={styles.categoryText}>Солодощі</span>
          </Link>
        </li>
        <li>
          <Link to="/partnership" className={styles.categoryLink}>
            <div className={styles.iconContainer}>
              <img src={productIcon} alt="Співпраця" className={styles.icon} />
            </div>
            <span className={styles.categoryText}>Співпраця</span>
          </Link>
        </li>
        <li>
          <Link to="/bakery" className={styles.categoryLink}>
            <div className={styles.iconContainer}>
              <img src={productIcon} alt="Пекарня" className={styles.icon} />
            </div>
            <span className={styles.categoryText}>Пекарня</span>
          </Link>
        </li>
        <li>
          <Link to="/drinks" className={styles.categoryLink}>
            <div className={styles.iconContainer}>
              <img src={productIcon} alt="Напої" className={styles.icon} />
            </div>
            <span className={styles.categoryText}>Напої</span>
          </Link>
        </li>
        <li>
          <Link to="/certificates" className={styles.categoryLink}>
            <div className={styles.iconContainer}>
              <img
                src={productIcon}
                alt="Сертифікати"
                className={styles.icon}
              />
            </div>
            <span className={styles.categoryText}>Сертифікати</span>
          </Link>
        </li>
        <li>
          <Link to="/boxes" className={styles.categoryLink}>
            <div className={styles.iconContainer}>
              <img src={productIcon} alt="Бокси" className={styles.icon} />
            </div>
            <span className={styles.categoryText}>Бокси</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ProductCategory;
