import styles from './MissionSection.module.scss'

export default function MissionSection() {
  return (
    <div className="container">
      <h2>Локальне. Крафтове. Найкраще.</h2>
      <p className={styles.missionText}>
        Наша місія – підтримувати локальних виробників та розвивати крафтову
        культуру в Україні.
        <br />
        Ми створили маркетплейс, де поціновувачі якісної їжі можуть легко знайти
        унікальні продукти, а місцеві майстри – продавати свої товари без зайвих
        перешкод.
      </p>
    </div>
  )
}
