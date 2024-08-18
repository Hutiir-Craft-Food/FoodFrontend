const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const fetchProductsFunction = (offset, setOffset, filteredCategory, setFilteredCategory, filter) => {
	fetch(`${API_BASE_URL}/products?filter=${filter}&offset=${offset}&limit=4`)
		.then(res => res.json())
		.then(data => filteredCategory ? setFilteredCategory(filteredCategory => [...filteredCategory, ...data.products]) : setFilteredCategory(data.products))
		.catch(err => console.log('error: ', err)
		);
	setOffset(offset + 4);
}

export default fetchProductsFunction;