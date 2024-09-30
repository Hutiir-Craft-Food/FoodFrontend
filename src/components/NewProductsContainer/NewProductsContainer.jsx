import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import fetchProducts from "../../services/fetchProducts";
import styles from './NewProductsContainer.module.scss';

export default function NewProductsContainer() {
	const [newProducts, setNewProducts] = useState(null);
	const [offset, setOffset] = useState(0);
	const filterString = "is_new";

	const showMoreProducts = () => {
		fetchProducts(offset, setOffset, newProducts, setNewProducts, filterString);
	};

	useEffect(() => {
		fetchProducts(offset, setOffset, newProducts, setNewProducts, filterString);
	}, []);


	return (
		<div className="container">
			<h2>Новинки </h2>
			<div className="row">
				{newProducts && newProducts.length > 0 ? newProducts.map(function (newProduct) {
					return (
						<div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={newProduct.id}>
							<div className="rounded flex-column h-100">
								<ProductCard itemCard= {newProduct}/>
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

