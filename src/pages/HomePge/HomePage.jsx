import { useState, useEffect } from "react";
import ListOfCards from "../../components/ListOfCards/ListOfCards"
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel"
import styles from './HomePage.module.scss';

export default function HomePage() {
	const [products, setProducts] = useState([]);
	const [sellers, setSellers] = useState([]);

	useEffect(() => {
		fetch('./products.json')
			.then(res => res.json())
			.then(data => setProducts(data))
			.catch(err => console.log('error: ', err)
			);
	}, []);

	useEffect(() => {
		fetch('./sellers.json')
			.then(res => res.json())
			.then(data => setSellers(data))
			.catch(err => console.log('error: ', err)
			);
	}, []);

	const CarouselItems = [
		{
			id: 1,
			image: 'https://i.pinimg.com/564x/96/3e/7e/963e7eb66e98723f8ed386fa37988b2e.jpg',
			name: 'Слайд 1'
		},
		{
			id: 2,
			image: 'https://i.pinimg.com/564x/96/3e/7e/963e7eb66e98723f8ed386fa37988b2e.jpg',
			name: 'Слайд 2'
		},
		{
			id: 3,
			image: 'https://i.pinimg.com/564x/96/3e/7e/963e7eb66e98723f8ed386fa37988b2e.jpg',
			name: 'Слайд 3'
		},
		{
			id: 4,
			image: 'https://i.pinimg.com/564x/96/3e/7e/963e7eb66e98723f8ed386fa37988b2e.jpg',
			name: 'Слайд 4'
		}
	];

	return (
		<div className="container">
			<h1>Khutir Craftu</h1>
			{/* {products.length > 0 && <Carousel items={products} />} */}
			<CustomCarousel title='' items={CarouselItems} />
			<ListOfCards items={products} title="Новинки" />
			<ListOfCards items={products} title="Сезонні пропозиції" />
			<ListOfCards items={products} title="Рекомендуємо спробувати" />
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
			<ListOfCards items={sellers} title="Наші виробники" />
			<CustomCarousel title='Блог' items={CarouselItems} />
		</div>
	)
}

