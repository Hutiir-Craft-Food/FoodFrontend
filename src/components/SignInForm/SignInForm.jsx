import { useContext, useState } from "react";
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: {
          valid: false,
          message:
            "Не меньше 8 символів",
        },
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: { valid: true },
    }));
    return true;
  };

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
          authContext.loginCurrentUser(data.jwt);
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
              onBlur={() => validateEmail(email)}
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
              onBlur={() => validatePassword(password)}
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