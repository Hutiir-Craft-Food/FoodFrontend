import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSwipe } from '../../../product/product-gallery/useSwipe.js'
import styles from './PreviewImage.module.scss'

export default function PreviewImage({
  productImages,
  slideCount,
  index,
  setIndex,
}) {
  const [instant, setInstant] = useState(true)

  const { ref } = useSwipe({
    onSwipeLeft: () => paginate(1),
    onSwipeRight: () => paginate(-1),
  })

  const paginate = (dir) => {
    if (slideCount <= 1) return

    setInstant(false)

    setIndex((prev) => {
      if (slideCount === 0) return prev

      let next = prev + dir

      if (next < 0) next = slideCount
      if (next > slideCount + 1) next = 1

      return next
    })
  }

  const extended = useMemo(() => {
    if (slideCount > 0) {
      return [productImages[slideCount - 1], ...productImages, productImages[0]]
    }
    return [null]
  }, [productImages, slideCount])

  const handleAnimationComplete = () => {
    if (slideCount === 0) return

    if (index === slideCount + 1) {
      setInstant(true)
      setIndex(1)
      setTimeout(() => setInstant(false), 0)
    }

    if (index === 0) {
      setInstant(true)
      setIndex(slideCount)
      setTimeout(() => setInstant(false), 0)
    }
  }

  const transition = instant
    ? { duration: 0 }
    : { duration: 0.5, ease: 'easeInOut' }

  return (
    <div className={styles.mainImage} ref={ref}>
      <motion.div
        className={styles.sliderWrapper}
        animate={{ x: -index * 100 + '%' }}
        transition={transition}
        onAnimationComplete={handleAnimationComplete}
      >
        {extended.map((src, i) => (
          <div key={i} className={styles.slide}>
            {src ? (
              <img
                src={src}
                alt={`product-image-${i}`}
                onError={(e) => {
                  e.target.src = '/productImages/image-not-found.png'
                }}
              />
            ) : (
              <div className={`${styles.placeholder} ${styles.main}`} />
            )}
          </div>
        ))}
      </motion.div>

      {slideCount > 1 && (
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
  )
}
