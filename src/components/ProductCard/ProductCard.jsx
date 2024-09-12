import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from 'react-rating-stars-component';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import styles from './ProductCard.module.scss';

export default function ProductCard({ itemCard }) {
	const [isFavorite, setIsFavorite] = useState(false);

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};


	return (
		<div className={`card `}>
			<div className="card-body">
				<div className= "text-end" onClick={toggleFavorite} style={{ cursor: 'pointer' }}>
					{isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
				</div>
				<div className={`card-icon ${styles.cardImage}`}>
					<img src={itemCard.image || `./images/imageNotFound.png`} alt="product image" />
				</div>
				<h5 className="card-title mt-3">{itemCard.name}</h5>
				<div className="card-text">
					<span>{itemCard.manufacturer}</span>
					<br />
					<Rating
						count={5}
						value={itemCard.rating}
						size={24}
						activeColor="#ffd700"
						edit={false}
						isHalf={true}
					/>

					<div className="d-flex justify-content-between">
						<div>
							<span>{itemCard.sale_price} грн.</span>
							<br />
							<span className="text-decoration-line-through" >{itemCard.regular_price} грн.</span>
						</div>
						<Link className={`btn btn-outline-danger`} to={`#`}>В кошик</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

