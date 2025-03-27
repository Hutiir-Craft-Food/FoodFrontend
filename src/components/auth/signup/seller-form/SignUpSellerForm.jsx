import { useState, useEffect, useCallback } from 'react'
import styles from './SignUpSellerForm.module.scss'

export default function SignUpSellerForm({ setFormData }) {
  const [sellerName, setSellerName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [errors, setErrors] = useState({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const validateSellerName = useCallback(() => {
    const pattern = /^[a-zA-Zа-яА-ЯІіЇїЄєҐґ\d&,`'\-\s"]{3,50}$/
    if (pattern.test(sellerName)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        sellerName: { valid: true },
      }))
      return
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      sellerName: {
        valid: false,
        errorMessage: 'Від 3 до 50 літер у розкладці UA чи EN',
      },
    }))
  }, [sellerName])

  const validateEmail = useCallback(() => {
    const pattern = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/
    if (pattern.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: { valid: true },
      }))
      return
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: {
        valid: false,
        errorMessage: 'Вкажіть корректний email',
      },
    }))
  }, [email])

  const validatePassword = useCallback(() => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/
    if (pattern.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: { valid: true },
      }))
      return
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: {
        valid: false,
        errorMessage: 'Від 8 літер та 1 числовий символ',
      },
    }))
  }, [password])

  const handleSellerNameChange = (event) => {
    setSellerName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleEyeButton = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  useEffect(() => {
    const formData = {
      details: { sellerName },
      email,
      password,
      marketingConsent,
      role: 'SELLER',
    }

    const hasErrors = Object.values(errors).some(({ valid }) => valid === false)
    if (!hasErrors) {
      setFormData(formData)
    }
  }, [sellerName, email, password, marketingConsent, errors, setFormData])

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsWrapper}>
        <label htmlFor='sellerName'>Назва компанії або ПІБ</label>
        <input
          type='text'
          id='sellerName'
          name='sellerName'
          placeholder="ТОВ 'Фермер'"
          minLength='3'
          required
          value={sellerName}
          onChange={handleSellerNameChange}
          onBlur={validateSellerName}
        />
        {!errors.sellerName?.valid && (
          <span className={styles.errors}>
            {errors.sellerName?.errorMessage}
          </span>
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
        {!errors.password?.valid && (
          <span className={styles.errors}>{errors.password?.errorMessage}</span>
        )}
      </div>
    </div>
  )
}
