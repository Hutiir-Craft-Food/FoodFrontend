import { Link } from "react-router-dom";
import Rating from 'react-rating-stars-component';
import styles from './SellerCard.module.scss';

export default function SellerCard({ seller }) {
	// console.log(product);

	return (
		<div className={`card `}>
			<div className="card-body">
				<div className={`card-icon ${styles.cardImage}`}>
					<img src={seller.image || `./images/imageNotFound.png`} alt="seller image" />
				</div>
				<h5 className="card-title mt-3">{seller.name}</h5>
				<div className="card-text">
					<span>{seller.city}</span>
					<br />
					<Rating
						count={5}
						value={seller.rating}
						size={24}
						activeColor="#ffd700"
						edit={false}
						isHalf={true}
					/>
					<Link className={`btn btn-outline-danger`} to={`#`}>На ферму</Link>
				</div>
			</div>
		</div>
	)
}
