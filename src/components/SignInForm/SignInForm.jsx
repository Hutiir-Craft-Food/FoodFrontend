import { useContext, useState, useCallback } from "react";
import styles from "./SignInForm.module.scss";
import { AuthContext } from "../../containers/AuthContext";

const SignInForm = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEyeButtonClick = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: null }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: null }));
  };

  const validateEmail = useCallback(() => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: { valid: false, message: "Не правильна адреса" },
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: { valid: true },
    }));
    return true;
  }, [email]);

  const validatePassword = useCallback(() => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;
    if (!pattern.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: {
          valid: false,
          message:
            "Не менше 8 буквенних та 1 числовий символи",
        },
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: { valid: true },
    }));
    return true;
  }, [password]);

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (errors.email?.valid === false || errors.password?.valid === false) {
      setIsSubmitting(false);
      return;
    }
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
        setPassword("");
        setErrors({});
      } else {
        const errorMessage =
          data.message ||
          "Такого користувача не існує, перевірте правильність введених даних";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Failed:", error);
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
            <label htmlFor="email">E-mail</label>
            <br />
            <input
              style={{
                border: errors.email?.valid === false ? "1px solid #E02D3C" : "",
              }}
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={handleEmailChange}
              onBlur={validateEmail}
              autoFocus
            />
            {errors.email?.valid === false && (
              <p className={styles.incorrectInputMessage}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.passwordContainer}>
            <label htmlFor="password">Пароль</label>
            <input
              style={{
                border: errors.password?.valid === false ? "1px solid #E02D3C" : "",
              }}
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              required
              onChange={handlePasswordChange}
              onBlur={validatePassword}
            />
            <button
              id="togglePassword"
              className={`${styles.toggleEye} ${isPasswordVisible ? styles.openEye : styles.closeEye}`}
              aria-label={isPasswordVisible ? "Приховати пароль" : "Показати пароль"}
              onClick={handleEyeButtonClick}
            ></button>
            {errors.password?.valid === false && (<p className={styles.incorrectInputMessage}>{errors.password.message}</p>)}
          </div>
          <br />
          <a className={styles.fogetPasswordLink} href="#">
            Забули пароль?
          </a>
          <br />
          <button
            className={styles.signInButton}
            type="submit"
            disabled={isSubmitting}
          >
            Увійти
          </button>
          <br />
        </form>
        <a className={styles.signUpLink} href="#">
          Зареєструватись
        </a>
      </div>
    </div>
  );
};

export default SignInForm;