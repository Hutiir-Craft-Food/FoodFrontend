import { useState, useEffect, useCallback } from 'react'
import styles from './SignUpSellerForm.module.scss'

export default function SignUpSellerForm({ setFormData }) {
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
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

  const validateCompanyName = useCallback(() => {
    const pattern = /^[A-Z a-z а-я А-Я іїєґІЇЄҐ]{3,50}$/
    if (pattern.test(companyName)) {
      setErrors((errors) => ({
        ...errors,
        companyName: { valid: true },
      }))

      return
    }

    setErrors((errors) => ({
      ...errors,
      companyName: {
        valid: false,
        errorMessage: 'Вкажіть лише буквенні символи',
      },
    }))
  }, [companyName])

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

  const validatePhone = useCallback(() => {
    const pattern =
      /^((\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))$/
    if (pattern.test(phone)) {
      setErrors((errors) => ({
        ...errors,
        phone: { valid: true },
      }))

      return
    }

    setErrors((errors) => ({
      ...errors,
      phone: {
        valid: false,
        errorMessage: 'Вкажіть у форматі ХХХ ХХХ ХХ ХХ',
      },
    }))
  }, [phone])

  function formatPhoneNumber(phone) {
    const cleanNum = ('' + phone.toString()).replace(/\D/g, '')
    const match = cleanNum.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/)
    if (match) {
      return [
        '+38 ',
        '(',
        match[1],
        ') ',
        match[2],
        '-',
        match[3],
        '-',
        match[4],
      ].join('')
    }
    return cleanNum
  }

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

  const handleCompanyNameChange = (event) => {
    const newCompanyName = event.target.value
    setCompanyName(newCompanyName)

    setFormData((prevFormData) => ({
      ...prevFormData,
      companyName: newCompanyName,
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

  const handlePhoneChange = (event) => {
    const newPhone = event.target.value
    setPhone(newPhone)

    setFormData((prevFormData) => ({
      ...prevFormData,
      phone: formatPhoneNumber(newPhone),
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
        <label htmlFor="fullName">ПІБ</label>
        <input
          type="text"
          // id="fullName"
          name="fullName"
          placeholder="Василь Іванович Глушко"
          // minLength="3"
          // maxLength="50"
          required="required"
          value={fullName}
          onChange={handleFullNameChange}
          onBlur={validateFullName}
        />
        {!errors.fullName?.valid && (
          <span className={styles.errors}>{errors.fullName?.errorMessage}</span>
        )}
      </div>

      <div className={styles.inputsWrapper}>
        <label htmlFor="companyName">Назва компанії</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          placeholder="ТОВ Фермер"
          // maxLength="50"
          value={companyName}
          onChange={handleCompanyNameChange}
          onBlur={validateCompanyName}
        />
        {!errors.companyName?.valid && (
          <span className={styles.errors}>
            {errors.companyName?.errorMessage}{' '}
          </span>
        )}
      </div>

      <div className={styles.inputsWrapper}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="e.g.example@gmail.com"
          required
          value={email}
          onChange={handleEmailChange}
          onBlur={validateEmail}
        />
        {!errors.email?.valid && (
          <span className={styles.errors}>{errors.email?.errorMessage}</span>
        )}
      </div>

      <div className={styles.inputsWrapper}>
        <label htmlFor="phone">Номер телефону</label>
        <input
          type="phone"
          id="phone"
          name="phone"
          placeholder="+38(___)___-__-__"
          // maxLength={13}
          required
          value={phone}
          onChange={handlePhoneChange}
          onBlur={validatePhone}
        />
        {!errors.phone?.valid && (
          <span className={styles.errors}>{errors.phone?.errorMessage}</span>
        )}
      </div>

      <div className={`${styles.passwordContainer} ${styles.inputsWrapper}`}>
        <label htmlFor="password">Пароль</label>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          name="password"
          minLength={9}
          required
          value={password}
          placeholder="Створіть пароль"
          onChange={handlePasswordChange}
          onBlur={validatePassword}
        />
        <button
          id="togglePassword"
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
