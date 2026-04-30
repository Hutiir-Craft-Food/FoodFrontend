import styles from './ThumbnailImages.module.scss'

export default function ThumbnailImages({
  thumbnails,
  index,
  setIndex,
  slideCount,
}) {
  if (slideCount === 0) {
    return (
      <div className={styles.thumbnails}>
        <div className={`${styles.placeholder} ${styles.small}`} />
      </div>
    )
  }

  return (
    <div className={styles.thumbnails}>
      {thumbnails.map(({ id, link }, idx) =>
        link ? (
          <img
            key={id}
            src={link}
            alt={`thumbnail-${idx + 1}`}
            className={idx === index - 1 ? styles.active : ''}
            onClick={() => setIndex(idx + 1)}
            onError={(e) => {
              e.target.src = '/images/image-not-found.png'
            }}
          />
        ) : (
          <div key={id} className={`${styles.placeholder} ${styles.small}`} />
        )
      )}
    </div>
  )
}
