import { useState } from 'react'
import { useAuthStore } from '../store/AuthStore'
import XCircle from '~/icons/XCircle.jsx'
// import ClosedEyeIcon from '~/icons/ClosedEyeIcon.jsx'
// import OpenEyeIcon from '~/icons/OpenEyeIcon.jsx'
import styles from './EmailField.module.scss'

export default function EmailField() {
  const { email, setEmail } = useAuthStore()
  // const { password, setPassword } = useAuthStore()
  // const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  // const handleEyeButtonClick = (e) => {
  //   setIsPasswordVisible((prevValue) => !prevValue)
  // }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleEmailClear = (e) => {
    setEmail('')
  }

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value)
  // }

  return (
    <div className={styles.emailContainer}>
      <label htmlFor="email">E-mail</label>
      <br />
      <div className={styles.inputContainer}>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={handleEmailChange}
          autoFocus
        />
        {email && (
          <button
            type="button"
            className={styles.buttonXCircle}
            onClick={handleEmailClear}
          >
            <XCircle />
          </button>
        )}
      </div>
    </div>
  )
}
