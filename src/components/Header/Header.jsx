import { useContext } from "react";
import Navbar from '../Navbar/Navbar';
import { AuthContext } from "../../containers/AuthContext";
// import styles from './Header.module.scss';

export default function Header() {
    const authContext = useContext(AuthContext);
    console.log(authContext.token);
    return (
        <header>
            <div className="container">
                <p>Header </p>
                {(authContext.token)?<p>Hello, {authContext.token}</p>:''}
                <Navbar/>
            </div>
        </header>
    )
}
