import { useState } from 'react';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import SingInForm from '../../components/SingInForm/SingInForm';
import SingUpForm from '../../components/SignUpForm/SingUpForm';
// import styles from './Home.module.scss';



export default function Home() {
    const [showSignInForm, setShowSignInForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    const handleShowSignIn = () => setShowSignInForm(true);
    const handleShowSignUp = () => setShowSignUpForm(true);

    const handleClose = () => {
        setShowSignInForm(false);
        setShowSignUpForm(false);

    }

    
    return (
        <div className="container">
            <p>Home Page </p>
            <button variant="primary" onClick={handleShowSignIn}>
                Вхід
            </button>
            <button variant="primary" onClick={handleShowSignUp}>
                Реєстрація
            </button>
            <ModalWindow show={showSignInForm} handleClose={handleClose} form = {<SingInForm/>} />
            <ModalWindow show={showSignUpForm} handleClose={handleClose} form={<SingUpForm />} />
        </div>
    )
}

