import { useState } from 'react';
import OtpInput from 'react-otp-input';
import styles from './CodeRegistrationModal.module.scss'
import iconQuestion from "../../images/iconQuestion.png"
import arrow from '../../images/arrow.svg';

export default function CodeRegistrationModal({ onVerify, onSkip, handleBack }) {
  const [code, setCode] = useState("");

  const handleChange = (code) => {
    setCode(code);
  }
  const pattern = /^\d{6}$/;

  const handleVerify = () => {
    if (pattern.test(code)) {
      onVerify(code)
    } else {
      setCode("");
      console.log('код повинен складатись з 6 цифр')
    }
  }

  const handleNewCode = () => { };

  return (
    <div className={styles.modal_content}>
      <img src={arrow} alt='arrow icon' className={styles.arrowIcon} onClick={handleBack} />
      <h3>Залишився один крок</h3>
      <p className={styles.message}>
        Ми надіслали тимчасовий код на вашу  <br /> електронну адресу
        <span> email@example.com </span>
        <br />
        Введіть його, щоб підтвердити реєстрацію.
      </p>
      <span>
        Код підтвердження
        <img src={iconQuestion} alt="icon question" />
      </span>
      <OtpInput
        value={code}
        onChange={handleChange}
        numInputs={6}
        renderSeparator={<span style={{ width: "8px" }}></span>}
        isInputNum={true}
        shouldAutoFocus={true}
        renderInput={(props) => <input {...props} />}
        inputStyle={{
          border: "1px solid grey",
          borderRadius: "8px",
          width: "54px",
          height: "54px",
          fontSize: "18px",
          color: "#111815",
          fontWeight: "700",
          margin: "0 auto",
        }}
        focusStyle={{
          border: "1px solid #537A67",
          outline: "none"
        }}
      />

      {
        (pattern.test(code)) ? (
          <button className={`${styles.button} ${styles.buttonActiv}`} onClick={handleVerify}>Перевіряємо код</button>
        ) : (
          <button className={styles.button} onClick={handleVerify}>Підтвердити email</button>
        )}

      <p className={styles.text}>
        Не отримали код?
        <button className={styles.buttonLikeText} onClick={handleNewCode}> Надіслати новий код </button>
        або
        <button className={styles.buttonLikeText} onClick={onSkip}>Пропустити</button>
        Ви можете підтвердити вашу пошту пізніше, у Вашому профілі
      </p>
    </div >
  )
}

