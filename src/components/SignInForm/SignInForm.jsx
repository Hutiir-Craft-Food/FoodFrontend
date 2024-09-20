import { useContext, useState } from "react";
import styles from "./SignInForm.module.scss";
import { AuthContext } from "../../containers/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

const SignInForm = () => {
  // const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleEyeButton = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.signInContainer}>
      <div>
        <img src="/images/sign-in.png" alt="food" className={styles.imgFood} />
      </div>
      <div className={styles.formContainer}>
        <h2>Вхід</h2>
        <form onSubmit={handleSignIn}>
          <label htmlFor="username">E-mail</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            required
            className="mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <label htmlFor="password">Пароль</label>
          <br />

          <div className={styles.passwordContainer}>
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
            {isSubmitting ? 'Увійти...' : 'Увійти'}
          </button>
          <br />
        </form>
        <a className={styles.signUpLink} href="#">Зареєструватись</a>
      </div>
    </div>
  );
};
export default SignInForm;
