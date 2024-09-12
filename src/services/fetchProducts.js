
const fetchProducts = async (offset, setOffset, filteredCategory, setFilteredCategory, filter) => {
	try {
		const response = await fetch(`/api/v1/products?filter=${filter}&offset=${offset}&limit=4`);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();

		if (filteredCategory) {
			setFilteredCategory(filteredCategory => [...filteredCategory, ...data.products]);
		} else {
			setFilteredCategory(data.products);
		}
		setOffset(offset + 4);

	} catch (err) {
		console.log('Error: ', err.message);
	}
};

export default fetchProducts;