import { useState, useEffect } from 'react'
import styles from './ProductGallery.module.scss'
import { useSwipe } from './useSwipe'

export default function ProductGallery() {
  const fallback = '/images/image-not-found.png'
  const [images, setImages] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  const { ref } = useSwipe({
    onSwipeLeft: () => setActiveIndex((i) => (i + 1) % images.length),
    onSwipeRight: () =>
      setActiveIndex((i) => (i - 1 + images.length) % images.length),
  })

  useEffect(() => {
    const fetchImagesFromApi = async () => {
      try {
        const res = await fetch(
          '/api/v1/products?filter=is_new&offset=0&limit=4'
        )
        const data = await res.json()
        const firstProduct = data.products?.[0]

        let valid = firstProduct?.images?.slice(0, 5) || []

        if (!valid.length && firstProduct?.image) {
          valid = Array(5).fill(firstProduct.image)
        }

        if (!valid.length) valid = [fallback]

        setImages(valid)
      } catch (err) {
        console.error('Помилка при завантаженні картинок', err)
        setImages([fallback])
      }
    }

    fetchImagesFromApi()
  }, [])

  if (!images.length) return null

  return (
    <div className={styles.productGallery}>
      <div className={styles.thumbnails}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`thumbnail-${index}`}
            className={index === activeIndex ? styles.active : ''}
            onClick={() => setActiveIndex(index)}
            onError={(e) => (e.target.src = fallback)}
          />
        ))}
      </div>

      <div className={styles.mainImage} ref={ref}>
        <img
          src={images[activeIndex]}
          alt="product"
          onError={(e) => (e.target.src = fallback)}
        />
        <button
          className={styles.leftNav}
          aria-label="Попереднє фото"
          onClick={() =>
            setActiveIndex((i) => (i - 1 + images.length) % images.length)
          }
        >
          ‹
        </button>
        <button
          className={styles.rightNav}
          aria-label="Наступне фото"
          onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
        >
          ›
        </button>
      </div>
    </div>
  )
}
