import { useState } from 'react';
import styles from './SingUpSellerForm.module.scss';

export default function SingUpSellerrForm() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleEyeButton = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    return (
        <div className={styles.signInContainer}>
            <div>
                <img src={`${process.env.PUBLIC_URL}/images/sign-in.png`} alt="food" className={styles.imgFood} />
            </div>
            <div className={styles.formContainer} >
                <h2>Реєстрація</h2>
                <div className={styles.buttonContainer}>
                    <button className={styles.button}> Хочу купити </button>
                    <button className={`${styles.button} ${styles.currentButton}`}> Хочу продати </button>
                </div>
                <form action="/login" method="POST">
                    <label for="username">Назва компанії/Ім'я та прізвище</label>
                    <input type="text" id="username" name="username" required className="mb-3" />
                    <label for="email">E-mail</label>
                    <input type="email" id="email" name="email" required className="mb-3" />
                    <label for="phone">Номер телефона</label>
                    <input type='tel' id="phone" name="phone" required className="mb-3" />

                    <label for="password">Пароль</label>
                    <div class={styles.passwordContainer}>
                        <input type={isPasswordVisible ? 'text' : 'password'} id="password" name="password" required />
                        <button id="togglePassword" className={`${styles.toggleEye} ${isPasswordVisible ? styles.openEye : styles.closeEye}`} onClick={handleEyeButton}>
                        </button>
                    </div>
                    <p>Введіть пароль, який містить мінімум 8 символів </p>
                    <label for="passwordСonfirm">Підтвердження паролю</label>
                    <div class={styles.passwordContainer}>
                        <input type={isPasswordVisible ? 'text' : 'password'} id="passwordСonfirm" name="passwordСonfirm" required />
                        <button id="togglePassword" className={`${styles.toggleEye} ${isPasswordVisible ? styles.openEye : styles.closeEye}`} onClick={handleEyeButton}>
                        </button>
                    </div>

                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span>
                            Бажаю отримувати новини та спеціальні пропозиції
                            <a href="#">
                                <img src={`${process.env.PUBLIC_URL}/images/infoIcon.svg`} alt="info icon" />
                            </a>
                        </span>
                    </label>

                    <span className={styles.userAgreement}>
                        Підтверджуючи реєстрацію, я приймаю
                        <a href='#' className={styles.userAgreementLink}> умови користувацької угоди</a>
                    </span>


                    <button className={`${styles.button} ${styles.signUpButton}`} type="submit">Зареєструватись</button>
                </form>
                <a className={styles.signInLink} href="#">Вже маю акаунт</a>
            </div>
        </div>
    )
}