import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './ProductGallery.module.scss'
import { useSwipe } from './useSwipe'

export default function ProductGallery() {
  const maxSlides = 5
  const [images, setImages] = useState([])
  const [index, setIndex] = useState(1)
  const [instant, setInstant] = useState(false)

  const { ref } = useSwipe({
    onSwipeLeft: () => paginate(1),
    onSwipeRight: () => paginate(-1),
  })

  const paginate = (dir) => {
    if (images.length === 0) return
    setInstant(false)
    setIndex((prev) => {
      let next = prev + dir
      if (next < 1) next = images.length
      if (next > images.length) next = 1
      return next
    })
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          '/api/v1/products?filter=is_new&offset=0&limit=4'
        )
        const data = await res.json()
        const firstProduct = data.products?.[0]

        let valid = firstProduct?.images?.slice(0, maxSlides) || []
        if (!valid.length && firstProduct?.image) valid = [firstProduct.image]

        setImages(valid)
        setIndex(1)
      } catch (err) {
        console.error('Помилка при завантаженні картинок', err)
        setImages([])
        setIndex(1)
      }
    }

    fetchImages()
  }, [])

  const slideCount = images.length
  const extended =
    slideCount > 0 ? [images[slideCount - 1], ...images, images[0]] : [null]

  const thumbnails = [...images]
  while (thumbnails.length < maxSlides) thumbnails.push(null)

  return (
    <div className={styles.productGallery}>
      <div className={styles.thumbnails}>
        {thumbnails.map((src, idx) =>
          src ? (
            <img
              key={idx}
              src={src}
              alt={`thumbnail-${idx}`}
              className={idx === index - 1 ? styles.active : ''}
              onClick={() => setIndex(idx + 1)}
              onError={(e) => (e.target.src = '/images/image-not-found.png')}
            />
          ) : (
            <div
              key={idx}
              className={`${styles.placeholder} ${styles.small}`}
            />
          )
        )}
      </div>

      <div className={styles.mainImage} ref={ref}>
        <motion.div
          className={styles.sliderWrapper}
          animate={{ x: -index * 100 + '%' }}
          transition={
            instant ? { duration: 0 } : { duration: 0.5, ease: 'easeInOut' }
          }
          onAnimationComplete={() => {
            if (slideCount === 0) return
            if (index === 0) setIndex(slideCount)
            if (index === slideCount + 1) setIndex(1)
          }}
        >
          {extended.map((src, i) => (
            <div key={i} className={styles.slide}>
              {src ? (
                <img
                  src={src}
                  alt={`product-${i}`}
                  onError={(e) =>
                    (e.target.src = '/images/image-not-found.png')
                  }
                />
              ) : (
                <div className={`${styles.placeholder} ${styles.main}`} />
              )}
            </div>
          ))}
        </motion.div>

        {slideCount > 0 && (
          <>
            <button className={styles.leftNav} onClick={() => paginate(-1)}>
              ‹
            </button>
            <button className={styles.rightNav} onClick={() => paginate(1)}>
              ›
            </button>
          </>
        )}
      </div>
    </div>
  )
}
