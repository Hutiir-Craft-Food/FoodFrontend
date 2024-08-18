const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

async function fetchCarouselItemsFunction (setCarouselItems, carouselCategory) {
	await fetch(`${API_BASE_URL}/${carouselCategory}`)
		.then(res => res.json())
		.then(data => setCarouselItems(data.carouselItems))
		.catch(err => console.log('error: ', err)
		);
}

export default fetchCarouselItemsFunction;