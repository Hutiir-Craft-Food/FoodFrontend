import { useContext } from "react";
import Navbar from '../Navbar/Navbar';
import { AuthContext } from "../../containers/AuthContext";
// import styles from './Header.module.scss';

export default function Header() {
    const authContext = useContext(AuthContext);
    return (
        <header>
            <div className="container">
                <p>Header </p>
                <Navbar/>
            </div>
        </header>
    )
}
