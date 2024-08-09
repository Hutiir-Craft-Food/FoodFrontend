import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCategory.module.scss";
import productIcon from "./Icons/Icons.png";

const ProductCategory = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  return (
    <nav className={styles.mainNavigation}>
      <ul>
        <li>
          <div
            className={styles.categoryLink}
            onClick={() => toggleDropdown("meat")}
          >
            <img
              src={productIcon}
              alt="М'ясо та м'ясні вироби"
              className={styles.icon}
            />
            <span className={styles.categoryText}>М'ясо та м'ясні вироби</span>
          </div>
          {openDropdown === "meat" && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/meat/sausages1">Ковбаси 1</Link>
              </li>
              <li>
                <Link to="/meat/sausages2">Ковбаси 2</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div
            className={styles.categoryLink}
            onClick={() => toggleDropdown("culinary")}
          >
            <img src={productIcon} alt="Кулінарія" className={styles.icon} />
            <span className={styles.categoryText}>Кулінарія</span>
          </div>
          {openDropdown === "culinary" && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/culinary/recipes">Рецепти</Link>
              </li>
              <li>
                <Link to="/culinary/tips">Поради</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div
            className={styles.categoryLink}
            onClick={() => toggleDropdown("sweets")}
          >
            <img src={productIcon} alt="Солодощі" className={styles.icon} />
            <span className={styles.categoryText}>Солодощі</span>
          </div>
          {openDropdown === "sweets" && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/sweets/cakes">Торти</Link>
              </li>
              <li>
                <Link to="/sweets/candies">Цукерки</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div
            className={styles.categoryLink}
            onClick={() => toggleDropdown("partnership")}
          >
            <img src={productIcon} alt="Співпраця" className={styles.icon} />
            <span className={styles.categoryText}>Співпраця</span>
          </div>
          {openDropdown === "partnership" && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/partnership/become-a-partner">Стати партнером</Link>
              </li>
              <li>
                <Link to="/partnership/programs">Програми співпраці</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div
            className={styles.categoryLink}
            onClick={() => toggleDropdown("bakery")}
          >
            <img src={productIcon} alt="Пекарня" className={styles.icon} />
            <span className={styles.categoryText}>Пекарня</span>
          </div>
          {openDropdown === "bakery" && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/bakery/bread">Хліб</Link>
              </li>
              <li>
                <Link to="/bakery/pastries">Випічка</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div
            className={styles.categoryLink}
            onClick={() => toggleDropdown("drinks")}
          >
            <img src={productIcon} alt="Напої" className={styles.icon} />
            <span className={styles.categoryText}>Напої</span>
          </div>
          {openDropdown === "drinks" && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/drinks/coffee">Кава</Link>
              </li>
              <li>
                <Link to="/drinks/tea">Чай</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div
            className={styles.categoryLink}
            onClick={() => toggleDropdown("certificates")}
          >
            <img src={productIcon} alt="Сертифікати" className={styles.icon} />
            <span className={styles.categoryText}>Сертифікати</span>
          </div>
          {openDropdown === "certificates" && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/certificates/gift">Подарункові сертифікати</Link>
              </li>
              <li>
                <Link to="/certificates/discount">Знижки</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div
            className={styles.categoryLink}
            onClick={() => toggleDropdown("boxes")}
          >
            <img src={productIcon} alt="Бокси" className={styles.icon} />
            <span className={styles.categoryText}>Бокси</span>
          </div>
          {openDropdown === "boxes" && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/boxes/gift">Подарункові бокси</Link>
              </li>
              <li>
                <Link to="/boxes/subscription">Бокси за підпискою</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default ProductCategory;
