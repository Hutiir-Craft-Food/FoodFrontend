import { useState } from "react";

export default function goToWindow() {
  return (
    <div>
      <div className={styles.infoBlock}>
        <h2>Гайда за покупками!!!</h2>
        <p>
          На Вашу пошту надіслано лист. Будь-ласка перейдіть за посиланням для
          закінчення реєстрації
        </p>
      </div>

      <div className={styles.signButtons}>
        <button className={`${styles.button} ${styles.signUpButton}`}>
          Зрозуміло
        </button>
      </div>
    </div>
  );
}
