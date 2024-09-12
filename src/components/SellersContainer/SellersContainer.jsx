import { useState, useEffect } from "react";
import SellerCard from "../SellerCard/SellerCard";
import styles from './SellersContainer.module.scss';

export default function SellersContainer() {
	const [sellers, setSellers] = useState(null);
	const [visibleCount, setVisibleCount] = useState(4);
	const showMoreProducts = () => {
		setVisibleCount((prevCount) => prevCount + 4);
	};

	async function fetchSellers() {
		try {
			const response = await fetch(`/api/v1/sellers`);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			setSellers(data.sellers);
		} catch (err) {
			console.log('Error: ', err.message);
		}
	}

	useEffect(() => {
		fetchSellers()
	}, []);

	return (
		<div className="container">
			<h2>Наші виробники </h2>
			<div className="row">
				{sellers && sellers.length > 0 ? sellers.slice(0, visibleCount).map(function (seller) {
					return (
						<div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={seller.id}>
							<div className="p-3 rounded bg-warning-subtle flex-column h-100">
								<SellerCard itemCard= {seller}/>
							</div>
						</div>
					);
				}) : "is loaded..."
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

