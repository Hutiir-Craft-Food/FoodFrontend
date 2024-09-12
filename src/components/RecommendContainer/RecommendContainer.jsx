import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import fetchProducts from "../../services/fetchProducts";
import styles from './RecommendContainer.module.scss';

export default function RecommendContainer() {
	const [recommendProducts, setRecommendProducts] = useState(null);
	const [offset, setOffset] = useState(0);
	const filterString = "is_recommend";

	const showMoreProducts = () => {
		fetchProducts(offset, setOffset, recommendProducts, setRecommendProducts, filterString);
	};

	useEffect(() => {
		fetchProducts(offset, setOffset, recommendProducts, setRecommendProducts, filterString);
	}, []);

	return (
		<div className="container">
			<h2>Рекомендуємо спробувати </h2>
			<div className="row">
				{recommendProducts && recommendProducts.length > 0 ? recommendProducts.map(function (recommendProduct) {
					return (
						<div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={recommendProduct.id}>
							<div className="p-3 rounded bg-warning-subtle flex-column h-100">
								<ProductCard itemCard={recommendProduct}/>
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

