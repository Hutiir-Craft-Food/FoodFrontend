import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import fetchProducts from '../../services/fetchProducts';
import styles from './OfferProducts.module.scss';

export default function OfferProducts() {
	const [offers, setOffers] = useState(null);
	const [offset, setOffset] = useState(0);
	const filterString = "is_offer";

	const showMoreProducts = () => {
		fetchProducts(offset, setOffset, offers, setOffers, filterString);
	};

	useEffect(() => {
		fetchProducts(offset, setOffset, offers, setOffers, filterString);
	}, []);


	return (
		<div className="container">
			<h2>Сезонні пропозиції </h2>
			<div className="row">
				{offers && offers.length > 0 ? offers.map(function (offer) {
					return (
						<div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={offer.id}>
							<div className="rounded flex-column h-100">
								<ProductCard itemCard= {offer}/>
							</div>
						</div>
					);
				}) : "is loading..."
				}
			</div>
			<div className="d-flex justify-content-end">
				<button onClick={showMoreProducts} className={styles.buttonShowMore}>
					Показати ще
				</button>
			</div>
		</div>
	)
}

