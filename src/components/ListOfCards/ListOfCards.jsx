import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard"
import SellerCard from "../SellerCard/SellerCard";
import styles from './ListOfCards.module.scss';

export default function ListOfCards({ items, title }) {
	const [visibleCount, setVisibleCount] = useState(4);
	const showMoreProducts = () => {
		setVisibleCount((prevCount) => prevCount + 4);
	};

	return (
		<div className="container">
			<h2>{title} </h2>
			<div className="row">
				{items && items.length > 0 ? items.slice(0, visibleCount).map(function (item) {
					return (
						<div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={item.id}>
							<div className="p-3 rounded bg-warning-subtle flex-column h-100">
								{title === 'Наші виробники' ? <SellerCard seller={item} /> : <ProductCard product={item} />}
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

