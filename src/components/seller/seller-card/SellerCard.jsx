import { Link } from 'react-router-dom'
import Rating from 'react-rating-stars-component'
import styles from './SellerCard.module.scss'

export default function SellerCard({ itemCard }) {
  // console.log(product);

  return (
    <div className={`card `}>
      <div className='card-body'>
        <div className={`card-icon ${styles.cardImage}`}>
          <img
            src={itemCard.image || `./images/image-not-found.png`}
            alt='seller image'
          />
        </div>
        <h5 className='card-title mt-3'>{itemCard.name}</h5>
        <div className='card-text'>
          <span>{itemCard.city}</span>
          <br />
          <Rating
            count={5}
            value={itemCard.rating}
            size={24}
            activeColor='#ffd700'
            edit={false}
            isHalf={true}
          />
          <Link className={`btn btn-outline-danger`} to={`#`}>
            На ферму
          </Link>
        </div>
      </div>
    </div>
  )
}
