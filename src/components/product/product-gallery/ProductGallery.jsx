import { useState, useEffect, useMemo } from 'react'
import styles from './ProductGallery.module.scss'
import ThumbnailImages from './thumbnail-images/ThumbnailImages'
import PreviewImage from './preview-image/PreviewImage'

export default function ProductGallery({ productId }) {
  const maxSlides = 5
  const [productImages, setProductImages] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const previewImage = selectedId ? productImages[selectedId] : null

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        // TODO: check if we need throwing an Error here ?
        if (!productId) return

        const res = await fetch(`/api/v1/products/${productId}/images`)

        if (!res.ok) {
          // TODO: localize error message
          // TODO: Show error to user gracefully (taost, banner, etc.)
          throw new Error(`API returned status ${res.status}`)
        }

        const data = await res.json()

        const images = (data.images || [])
          .toSorted((img1, img2) => (img1.position || 0) - (img2.position || 0))
          .slice(0, maxSlides)

        setProductImages(images)
        setSelectedId(0)
      } catch (err) {
        console.error('Помилка при завантаженні картинок', err)
        setProductImages([])
        setSelectedId(null)
      }
    }

    fetchProductImages()
  }, [])

  const thumbnails = useMemo(() => {
    return productImages.map((img) => img.links?.thumbnail || null)
  }, [productImages])

  return (
    <div className={styles.productGallery}>
      <ThumbnailImages
        thumbnails={thumbnails}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <PreviewImage
        previewImage={previewImage}
        // TODO: pass 2 swipers to this component
      />
    </div>
  )
}
