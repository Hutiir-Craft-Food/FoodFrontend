import { useContext, useState, useCallback } from 'react'
import { AuthContext } from '/src/context/AuthContext'
import SignUpContainer from '../signup/SignUpContainer'
import Modal from '/src/components/modal/Modal'
import styles from './SignInForm.module.scss'

const SignInForm = () => {
  const authContext = useContext(AuthContext)
  const [showSignUpContainer, setShowSignUpContainer] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [errors, setErrors] = useState({})

  const handleClose = () => {
    setShowSignUpContainer(false)
  }

  const handleEyeButtonClick = (e) => {
    e.preventDefault()
    setIsPasswordVisible((prevValue) => !prevValue)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const validateEmail = useCallback(() => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!pattern.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: { valid: false, message: 'Не правильна адреса' },
      }))
      return
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: { valid: true },
    }))
  }, [email])

  const validatePassword = useCallback(() => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/
    if (!pattern.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: {
          valid: false,
          message: 'Не менше 8 буквенних та 1 числовий символи',
        },
      }))
      return
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: { valid: true },
    }))
  }, [password])

  const handleSignIn = async (event) => {
    event.preventDefault()
    const hasErrors = Object.values(errors).some(({ valid }) => valid === false)
    if (hasErrors) {
      return
    }
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (response.ok) {
        authContext.setToken(data.jwt)
        setEmail('')
        setPassword('')
        setErrors({})
      } else {
        const errorMessage =
          data.message ||
          'Такого користувача не існує, перевірте правильність введених даних'
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error('Failed:', error)
    }
  }

  return (
    <div className={styles.signInContainer}>
      <div>
        <img src='/images/sign-in.png' alt='food' className={styles.imgFood} />
      </div>
      <div className={styles.formContainer}>
        <h2>Вхід</h2>
        <form onSubmit={handleSignIn}>
          <div className={styles.emailContainer}>
            <label htmlFor='email'>E-mail</label>
            <br />
            <input
              style={{
                border:
                  errors.email?.valid === false ? '1px solid #E02D3C' : '',
              }}
              type='email'
              id='email'
              name='email'
              required
              value={email}
              onChange={handleEmailChange}
              onBlur={validateEmail}
              autoFocus
            />
            {errors.email?.valid === false && (
              <p className={styles.incorrectInputMessage}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className={styles.passwordContainer}>
            <label htmlFor='password'>Пароль</label>
            <input
              style={{
                border:
                  errors.password?.valid === false ? '1px solid #E02D3C' : '',
              }}
              type={isPasswordVisible ? 'text' : 'password'}
              id='password'
              name='password'
              value={password}
              required
              onChange={handlePasswordChange}
              onBlur={validatePassword}
            />
            <button
              id='togglePassword'
              className={`${styles.toggleEye} ${
                isPasswordVisible ? styles.openEye : styles.closeEye
              }`}
              aria-label={
                isPasswordVisible ? 'Приховати пароль' : 'Показати пароль'
              }
              onClick={handleEyeButtonClick}
            ></button>
            {errors.password?.valid === false && (
              <p className={styles.incorrectInputMessage}>
                {errors.password.message}
              </p>
            )}
          </div>
          <br />
          <a className={styles.fogetPasswordLink} href='#'>
            Забули пароль?
          </a>
          <br />
          <button className={styles.signInButton} type='submit'>
            Увійти
          </button>
          <br />
        </form>
        <div>
          <button
            className={styles.signUpLink}
            onClick={() => {
              setShowSignUpContainer(true)
            }}
          >
            {' '}
            Зареєструватись
          </button>
          {showSignUpContainer && (
            <Modal handleClose={handleClose}>
              <SignUpContainer />
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignInForm
