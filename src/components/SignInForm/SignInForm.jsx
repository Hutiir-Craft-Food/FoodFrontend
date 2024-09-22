import { useContext, useState } from "react";
import styles from "./SignInForm.module.scss";
import { AuthContext } from "../../containers/AuthContext";

const SignInForm = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isVisibleMessage, setIsVisibleMessage] = useState(false);

  const handleEyeButton = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsVisibleMessage(true);
      return false;
    }
    return true;
  }

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regex.test(password)) {
      alert('Пароль повинен містити принаймні 8 символів, хоч би 1 велику та 1 маленьку літери латинського алфавіту, хоч би 1 цифру і 1 спеціальний символ')
      return false;
    }
    return true;
  }

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (validateEmail(email) && validatePassword(password)) {
      try {
        const response = await fetch("/api/v1/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          authContext.setToken(data.jwt);
          setEmail("");
          setPassword("")
          setIsVisibleMessage(false);

        } else {
          const errorMessage =
            data.message ||
            "Такого користувача не існує, перевірте правильність введених даних";
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error("Failed:", error);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.signInContainer}>
      <div>
        <img src="/images/sign-in.png" alt="food" className={styles.imgFood} />
      </div>
      <div className={styles.formContainer}>
        <h2>Вхід</h2>
        <form onSubmit={handleSignIn}>
          <div className={styles.emailContainer}>
            <label htmlFor="username">E-mail</label>
            <br />
            <input
              style={{ border: isVisibleMessage ? '1px solid #E02D3C' : ''}}
              type="text"
              id="username"
              name="username"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setIsVisibleMessage(false); }}
              autoFocus
            />
            <p className={styles.wrongEmailMessage} style={{ visibility: isVisibleMessage ? 'visible' : 'hidden' }}>Не правильна адреса</p>
          </div>
          <div className={styles.passwordContainer}>
            <label htmlFor="password">Пароль</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              id="togglePassword"
              className={`${styles.toggleEye} ${isPasswordVisible ? styles.openEye : styles.closeEye
                }`}
              onClick={handleEyeButton}
            ></button>
          </div>
          <br />
          <a className={styles.fogetPasswordLink} href="#">
            Забули пароль?
          </a>
          <br />
          <button className={styles.signInButton} type="submit" disabled={isSubmitting}>
            Увійти
          </button>
          <br />
        </form>
        <a className={styles.signUpLink} href="#">Зареєструватись</a>
      </div>
    </div>
  );
};
export default SignInForm;
