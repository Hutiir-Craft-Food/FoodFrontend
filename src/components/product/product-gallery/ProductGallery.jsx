import { useState, useEffect, useMemo } from 'react'
import styles from './ProductGallery.module.scss'
import ThumbnailImages from './thumbnail-images/ThumbnailImages'
import PreviewImage from './preview-image/PreviewImage'

export default function ProductGallery({ productId }) {
  const maxSlides = 5
  const [productImages, setProductImages] = useState([])
  const [activeIndex, setActiveIndex] = useState(1)

  const slideCount = productImages.length

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        if (!productId) return

        const res = await fetch(`/api/v1/products/${productId}/images`)

        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`)
        }

        const data = await res.json()

        const images = (data.images || [])
          .toSorted((img1, img2) => (img1.position || 0) - (img2.position || 0))
          .slice(0, maxSlides)

        setProductImages(images)
        setActiveIndex(images.length > 0 ? 1 : 0)
      } catch (err) {
        console.error('Помилка при завантаженні картинок', err)
        setProductImages([])
        setActiveIndex(0)
      }
    }

    fetchProductImages()
  }, [productId])

  const thumbnails = useMemo(() => {
    return productImages.map((img, index) => ({
      id: img.uid || img.id || index,
      link: img.links?.thumbnail || null,
    }))
  }, [productImages])

  const thumbnailsToRender =
    thumbnails.length > 0 ? thumbnails : [{ id: 'placeholder', link: null }]

  const largeImages = useMemo(() => {
    return productImages.length > 0
      ? productImages.map((img) => img.links?.large || null)
      : []
  }, [productImages])

  return (
    <div className={styles.productGallery}>
      <ThumbnailImages
        thumbnails={thumbnailsToRender}
        index={activeIndex}
        setIndex={setActiveIndex}
        slideCount={slideCount}
      />

      <PreviewImage
        productImages={largeImages}
        slideCount={slideCount}
        index={activeIndex}
        setIndex={setActiveIndex}
      />
    </div>
  )
}
