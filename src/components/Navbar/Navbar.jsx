import { Link } from "react-router-dom";
import styles from './Navbar.module.scss';

export default function Navbar() {


    return (
        <nav className={styles.navbar}>
            <div className='container'>
                <Link to="#">
                    page1
                </Link>
                <Link to="#">
                    page2
                </Link>
                <Link to="#">
                    page3
                </Link>
            </div>
        </nav>
    )
}