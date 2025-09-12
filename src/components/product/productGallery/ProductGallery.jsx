import { useState, useEffect, useRef } from 'react'
import styles from './ProductGallery.module.scss'

export default function ProductGallery({ fetchImages }) {
  const fallback = '/images/image-not-found.png'
  const [images, setImages] = useState([])
  const [mainImage, setMainImage] = useState(fallback)
  const thumbRef = useRef(null)

  useEffect(() => {
    if (fetchImages) {
      fetchImages()
        .then((data) => {
          const validImages = data.filter(Boolean).slice(0, 5)
          setImages(validImages)
          setMainImage(validImages[0] || fallback)
        })
        .catch(() => {
          setImages([])
          setMainImage(fallback)
        })
    }
  }, [fetchImages])

  const scrollUp = () => {
    thumbRef.current?.scrollBy({ top: -88, behavior: 'smooth' })
  }

  const scrollDown = () => {
    thumbRef.current?.scrollBy({ top: 88, behavior: 'smooth' })
  }

  return (
    <div className={styles.productGallery}>
      <div className={styles.thumbnails}>
        {images.length > 4 && (
          <>
            <button
              className={`${styles.thumbButton} ${styles.up}`}
              onClick={scrollUp}
            />
            <button
              className={`${styles.thumbButton} ${styles.down}`}
              onClick={scrollDown}
            />
          </>
        )}
        <div className={styles.thumbWrapper} ref={thumbRef}>
          {images.length > 0
            ? images.map((img, index) => (
                <img
                  key={index}
                  src={img || fallback}
                  alt={`thumb-${index}`}
                  className={`${styles.thumbnail} ${
                    img === mainImage ? styles.active : ''
                  }`}
                  onClick={() => setMainImage(img || fallback)}
                />
              ))
            : [1, 2].map((i) => (
                <img
                  key={i}
                  src={fallback}
                  alt={`thumb-not-found-${i}`}
                  className={styles.thumbnail}
                />
              ))}
        </div>
      </div>

      <img
        src={mainImage || fallback}
        alt="main product"
        className={styles.mainImage}
      />
    </div>
  )
}
