import styles from './ThumbnailImages.module.scss'

export default function ThumbnailImages({
  thumbnails,
  selectedId,
  setSelectedId,
}) {
  return (
    <div className={styles.thumbnails}>
      {thumbnails.map((link, idx) =>
        link ? (
          <img
            key={idx}
            src={link}
            alt={`thumbnail-${idx}`}
            className={idx === selectedId ? styles.active : ''}
            onClick={() => setSelectedId(idx)}
            onError={(e) => (e.target.src = '/images/image-not-found.png')}
          />
        ) : (
          <div key={idx} className={`${styles.placeholder} ${styles.small}`} />
        )
      )}
    </div>
  )
}
