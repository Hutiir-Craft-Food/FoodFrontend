import styles from './SingUpForm.module.scss';


export default function SingUpForm() {
    return (
        <div className={styles.signInContainer}>
            <div>
                <img src={`${process.env.PUBLIC_URL}/images/sign-in.png`} alt="food" className={styles.imgFood} />
            </div>
            <div className={styles.formContainer} >
                <h2>Реєстрація</h2>
                <form action="/login" method="POST">
                    <label for="username">E-mail</label>
                    <br />
                    <input type="text" id="username" name="username" required className="mb-3" />
                    <label for="password">Пароль</label>
                    <br />
                    <input type="password" id="password" name="password" required />
                    <br />
                    <a className={styles.fogetPasswordLink} href="#">Забули пароль?</a>
                    <br />
                    <button className={styles.signInButton} type="submit">Увійти</button>
                    <div className={styles.separator}>
                        <hr /> 
                        <span>або</span> 
                        <hr/>
                    </div>
                    <button className={styles.button}>
                        <img src={`${process.env.PUBLIC_URL}/images/icon-google.png`} alt="icon google" />
                        <span className="ms-2">Увійти за допомогою</span>
                    </button>
                </form>
                <a className={styles.signUpLink} href="#">Зареєструватись</a>
            </div>
        </div>
    )
}