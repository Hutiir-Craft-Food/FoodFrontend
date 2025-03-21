import { useState, useEffect, useCallback } from 'react'
import styles from './SignUpSellerForm.module.scss'

export default function SignUpSellerForm({ setFormData }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({})

  const validateFullName = useCallback(() => {
    const pattern = /^[A-Z a-z а-я А-Я іїєґІЇЄҐ]{3,50}$/
    if (pattern.test(fullName)) {
      setErrors((errors) => ({
        ...errors,
        fullName: { valid: true },
      }))

      return
    }

    setErrors((errors) => ({
      ...errors,
      fullName: {
        valid: false,
        errorMessage: 'Від 3 до 50 літер у розкладці UA чи EN',
      },
    }))
  }, [fullName])

  const validateEmail = useCallback(() => {
    const pattern = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/
    if (pattern.test(email)) {
      setErrors((errors) => ({
        ...errors,
        email: { valid: true },
      }))

      return
    }

    setErrors((errors) => ({
      ...errors,
      email: {
        valid: false,
        errorMessage: 'Вкажіть корректний email',
      },
    }))
  }, [email])

  const validatePassword = useCallback(() => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/
    if (pattern.test(password)) {
      setErrors((errors) => ({
        ...errors,
        password: { valid: true },
      }))

      return
    }

    setErrors((errors) => ({
      ...errors,
      password: {
        valid: false,
        errorMessage: 'Від 8 літер та 1 числовий символ',
      },
    }))
  }, [password])

  const handleFullNameChange = (event) => {
    const newFullName = event.target.value
    setFullName(newFullName)

    setFormData((prevFormData) => ({
      ...prevFormData,
      fullName: newFullName,
    }))
  }

  const handleEmailChange = (event) => {
    const newEmail = event.target.value
    setEmail(newEmail)

    setFormData((prevFormData) => ({
      ...prevFormData,
      email: newEmail,
    }))
  }

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value
    setPassword(newPassword)

    setFormData((prevFormData) => ({
      ...prevFormData,
      password: newPassword,
    }))
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const handleEyeButton = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  useEffect(() => {
    const hasErrors = Object.values(errors).some(({ valid }) => valid === false)

    setFormData((prevFormData) => ({
      ...prevFormData,
      hasErrors,
    }))
  }, [errors])

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsWrapper}>
        {' '}
        <label htmlFor='fullName'>ПІБ</label>
        <input
          type='text'
          id='fullName'
          name='fullName'
          placeholder='Василь Іванович Глушко'
          minLength='3'
          required
          value={fullName}
          onChange={handleFullNameChange}
          onBlur={validateFullName}
        />
        {!errors.fullName?.valid && (
          <span className={styles.errors}>{errors.fullName?.errorMessage}</span>
        )}
      </div>

      <div className={styles.inputsWrapper}>
        <label htmlFor='email'>E-mail</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='e.g.example@gmail.com'
          required
          value={email}
          onChange={handleEmailChange}
          onBlur={validateEmail}
        />
        {!errors.email?.valid && (
          <span className={styles.errors}>{errors.email?.errorMessage}</span>
        )}
      </div>

      <div className={`${styles.passwordContainer} ${styles.inputsWrapper}`}>
        <label htmlFor='password'>Пароль</label>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id='password'
          name='password'
          minLength='9'
          required
          value={password}
          placeholder='Створіть пароль'
          onChange={handlePasswordChange}
          onBlur={validatePassword}
        />
        <button
          id='togglePassword'
          className={`${styles.toggleEye} ${
            isPasswordVisible ? styles.openEye : styles.closeEye
          }`}
          onClick={handleEyeButton}
        ></button>
        <br />
        {!errors.password?.valid && (
          <span className={styles.errors}>{errors.password?.errorMessage}</span>
        )}
      </div>
    </div>
  )
}
