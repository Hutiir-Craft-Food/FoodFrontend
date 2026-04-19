import { useState, useMemo } from 'react'
import styles from './ProductGallery.module.scss'
import ThumbnailImages from './thumbnail-images/ThumbnailImages'
import PreviewImage from './preview-image/PreviewImage'

export default function ProductGallery({ product }) {
  const maxSlides = 5
  const productImages = product.images
  const [activeIndex, setActiveIndex] = useState(1)
  const slideCount = productImages.length

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
