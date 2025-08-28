import { useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from 'react-rating-stars-component'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import styles from './ProductCard.module.scss'

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className='card'>
      <div
        className={styles.heart}
        onClick={toggleFavorite}
        style={{ cursor: 'pointer' }}
      >
        {isFavorite ? <FaHeart color='red' /> : <FaRegHeart color='grey' />}
      </div>
      <Link to={`/product/${product.id}`}>
        <div className={`card-icon ${styles.cardImage}`}>
          <img
            src={product.image || `./images/image-not-found.png`}
            alt='product image'
          />
          <h5 className={`card-title mt-3 ${styles.title}`}>{product.name}</h5>
        </div>
      </Link>
      <div className='card-body'>
        <div className={`card-text ${styles.text}`}>
          <a className={styles.manufacturerLink} href="#">
            {product.manufacturer}
          </a>
          <br />
          <div className='d-flex justify-content-between mt-3'>
            <span className={styles.isAvailable}>
              {product.is_available ? 'В наявності' : 'Товар відсутній'}
            </span>
            <Rating
              count={5}
              value={product.rating}
              size={24}
              activeColor='#ffd700'
              edit={false}
              isHalf={true}
            />
            <span>({product.reviews})</span>
          </div>
          <div className='d-flex justify-content-between'>
            <div>
              <span className={styles.regularPrice}>
                {product.regular_price} ₴
              </span>
              <br />
              <span className={styles.salePrice}>{product.sale_price} ₴</span>
            </div>
            <Link className={styles.btn} to={`#`}>
              В кошик
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
