import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from './ProductGallery.module.scss'
import { useSwipe } from './useSwipe'
import { useParams } from 'react-router-dom'

export default function ProductGallery({ productId: propProductId }) {
  const maxSlides = 5
  const [images, setImages] = useState([])
  const [index, setIndex] = useState(1)
  const [instant, setInstant] = useState(false)
  const { id: routeProductId } = useParams()
  const productId = propProductId || routeProductId

  const { ref } = useSwipe({
    onSwipeLeft: () => paginate(1),
    onSwipeRight: () => paginate(-1),
  })

  const paginate = (dir) => {
    if (images.length === 1) return
    setInstant(false)
    setIndex((prev) => {
      let next = prev + dir
      if (next < 0) next = images.length
      if (next > images.length + 1) next = 1
      return next
    })
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (!productId) return

        const res = await fetch(`/api/v1/products/${productId}/images`)

        const data = await res.json()

        const valid = (data.images || [])
          .flatMap((img) => Object.values(img.links || {}).filter(Boolean))
          .slice(0, maxSlides)

        setImages(valid)
        setIndex(1)
      } catch (err) {
        console.error('Помилка при завантаженні картинок', err)
        setImages([])
        setIndex(1)
      }
    }

    fetchImages()
  }, [productId, maxSlides])

  const slideCount = images.length

  const extended = useMemo(() => {
    if (slideCount > 0) return [images[slideCount - 1], ...images, images[0]]
    return [null]
  }, [images, slideCount])

  const thumbnails = useMemo(() => {
    return Array(maxSlides)
      .fill(null)
      .map((_, i) => images[i] || null)
  }, [images])

  const handleAnimationComplete = () => {
    if (slideCount === 1) return

    if (index === slideCount + 1) {
      setInstant(true)
      setIndex(1)
    } else if (index === 0) {
      setInstant(true)
      setIndex(slideCount)
    }

    setTimeout(() => setInstant(false), 0)
  }

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
          onAnimationComplete={handleAnimationComplete}
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
            <button
              className={styles.leftNav}
              onClick={() => paginate(-1)}
              aria-label="Попереднє зображення"
            />
            <button
              className={styles.rightNav}
              onClick={() => paginate(1)}
              aria-label="Наступне зображення"
            />
          </>
        )}
      </div>
    </div>
  )
}
