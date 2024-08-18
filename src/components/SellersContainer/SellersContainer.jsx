import { useState, useEffect } from "react";
import SellerCard from "../SellerCard/SellerCard";
import styles from './SellersContainer.module.scss';

export default function SellersContainer() {
	const [sellers, setSellers] = useState(null);
	const [visibleCount, setVisibleCount] = useState(4);
	const showMoreProducts = () => {
		setVisibleCount((prevCount) => prevCount + 4);
	};

	useEffect(() => {
		fetch('http://localhost:8080/sellers')
			.then(res => res.json())
			.then(data => setSellers(data.sellers))
			.catch(err => console.log('error: ', err)
			);
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

