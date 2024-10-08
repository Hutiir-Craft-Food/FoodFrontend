import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";
import styles from './HomePage.module.scss';
import NewProductsContainer from "../../components/NewProductsContainer/NewProductsContainer";
import SellersContainer from "../../components/SellersContainer/SellersContainer";
import OffersContainer from "../../components/OffersContainer/OffersContainer";
import RecommendContainer from "../../components/RecommendContainer/RecommendContainer";

export default function HomePage() {

	return (
		<div className="container">
			<h1>Khutir Craftu</h1>
			<CustomCarousel carouselCategory = "advPosts" />
			<NewProductsContainer/>
			<OffersContainer/>
			<RecommendContainer />

			<section>
				<h2>Чомy ми?</h2>
				<div className={styles.plus}>
					<div className="text-center">
						<i className="fa-solid fa-leaf"></i>
						<p>Безкоштовна доставка від 1500 грн.</p>
					</div>
					<div className="text-center">
						<i className="fa-solid fa-leaf"></i>
						<p>Доставка додому</p>
					</div>
					<div className="text-center">
						<i className="fa-solid fa-leaf"></i>
						<p>Гарантія свіжості</p>
					</div>
				</div>
			</section>
			<SellersContainer />
			<CustomCarousel title='Блог' carouselCategory="blogPosts" />
		</div>
	)
}

