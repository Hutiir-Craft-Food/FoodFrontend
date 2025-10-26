export default function PreviewImage() {
  return <div>PreviewImage</div>
}

/**
 *
  const [instant, setInstant] = useState(false)
  const { ref } = useSwipe({
    onSwipeLeft: () => paginate(1),
    onSwipeRight: () => paginate(-1),
  })

  const paginate = (dir) => {
    if (productImages.length === 1) return
    setInstant(false)
    setSelectedId((prev) => {
      let next = prev + dir
      if (next < 0) next = productImages.length
      if (next > productImages.length + 1) next = 1
      return next
    })
  }

  const extended = useMemo(() => {
    if (slideCount > 0)
      return [productImages[slideCount - 1], ...productImages, productImages[0]]
    return [null]
  }, [productImages, slideCount])

  const handleAnimationComplete = () => {
    if (slideCount === 1) return

    if (selectedId === slideCount + 1) {
      setInstant(true)
      setSelectedId(1)
    } else if (selectedId === 0) {
      setInstant(true)
      setSelectedId(slideCount)
    }

    setTimeout(() => setInstant(false), 0)
  }

  ------ return
  <div className={styles.mainImage} ref={ref}>
      <motion.div
        className={styles.sliderWrapper}
        animate={{ x: -selectedId * 100 + '%' }}
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
                  (e.target.src = '/productImages/image-not-found.png')
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

 *
 *
 */
