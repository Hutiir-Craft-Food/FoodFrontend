import { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import styles from './ProductGallery.module.scss'

export default function ProductGallery() {
  const fallback = '/images/image-not-found.png'
  const [images, setImages] = useState([])

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

  const galleryItems = images.map((src) => ({
    original: src,
    thumbnail: src,
  }))

  return (
    <div className={styles.productGallery}>
      <ImageGallery
        items={galleryItems}
        showFullscreenButton={false}
        showPlayButton={false}
        thumbnailPosition="left"
      />
    </div>
  )
}
