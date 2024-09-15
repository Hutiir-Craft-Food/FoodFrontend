import { useContext, useState } from "react";
import styles from "./SignInForm.module.scss";
import { AuthContext } from "../../containers/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

const SignInForm = () => {
  // const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = response.json();
        authContext.setToken(data.jwt);
        // return res
        //   .status(200)
        //   .json({ status: "logged in", message: "success" });
      } else {
        const erroMessage =
          data.message ||
          "Такого користувача не існує, перевірте правильність введених даних";
        throw new Error(erroMessage);
      }
    } catch (error) {
      console.error("Failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn();

    if (postSignIn) {
      postSignIn();
    }
  };
  // const [state, setState] = useState({
  //   username: " ",
  //   password: "",
  // });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setState((prevProps) => ({
  //     ...prevProps,
  //     [name]: value,
  //   }));
  // };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleEyeButton = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.signInContainer}>
      <div>
        <img src="/images/sign-in.png" alt="food" className={styles.imgFood} />
      </div>
      <div className={styles.formContainer}>
        <h2>Вхід</h2>
        <form metod="POST" onSubmit={handleSignIn}>
          <label htmlFor="username">E-mail</label>
          <br />

          <input
            type="text"
            id="username"
            name="username"
            required
            className="mb-3"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            autoFocus
            // onChange={handleInputChange}
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
              onChange={(ev) => setPassword(ev.target.value)}
              // onChange={handleInputChange}
            />
            <button
              id="togglePassword"
              className={`${styles.toggleEye} ${
                isPasswordVisible ? styles.openEye : styles.closeEye
              }`}
              onClick={handleEyeButton}
            ></button>
          </div>

          <br />
          <a className={styles.fogetPasswordLink} href="#">
            Забули пароль?
          </a>
          <br />
          <button className={styles.signInButton} type="submit">
            Увійти
          </button>
          <br />
        </form>
        <button type="submit">
          <a className={styles.signUpLink} href="#">
            Зареєструватись
          </a>
          {/* <Link to={'/register'}>Create an account</Link> */}
        </button>
      </div>
    </div>
  );
};
export default SignInForm;
