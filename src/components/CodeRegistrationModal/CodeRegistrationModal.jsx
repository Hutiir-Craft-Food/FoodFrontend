import { useState } from 'react';
import OtpInput from 'react-otp-input';
import styles from './CodeRegistrationModal.module.scss'

export default function CodeRegistrationModal({ onVerify, onSkip }) {
  const [code, setCode] = useState("");

  const handleChange = (code) => {
    setCode(code);
  }

  const handleVerify = () => {
    if (/^\d{6}$/.test(code)) {
      onVerify(code)
    } else{
      setCode("");
      console.log('код повинен складатись з 6 цифр')
    }
  }

  const handleNewCode = () => { };

  return (
    <div className={styles.modal_content}>
      <h3>Залишився один крок</h3>
      <p>
        Ми надіслали тимчасовий код на вашу електронну адресу
        <a href="#"> email@example.com </a>
        Введіть його, щоб підтвердити реєстрацію.
      </p>
      <p>Код підтвердження</p>
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
          fontSize: "12px",
          color: "#000",
          fontWeight: "400",
          caretColor: "blue"
        }}
        focusStyle={{
          border: "1px solid #CFD3DB",
          outline: "none"
        }}
      />
      <button onClick={handleVerify}>Підтвердити email</button>
      <p>
        Не отримали код?
        <button onClick={handleNewCode}> Надіслати новий код </button>
        або
        <button onClick={onSkip}> Пропустити </button>
        Ви можете підтвердити вашу пошту пізніше, у вашому профілі
      </p>
    </div>
  )
}

