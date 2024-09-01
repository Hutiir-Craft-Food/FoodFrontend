
async function fetchCarouselItemsFunction(setCarouselItems, carouselCategory) {
	try {
		const response = await fetch(`/api/v1/${carouselCategory}`);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		setCarouselItems(data.carouselItems);
	} catch (err) {
		console.log('Error: ', err.message);
	}
}

export default fetchCarouselItemsFunction;