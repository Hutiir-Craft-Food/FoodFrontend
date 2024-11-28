import axios from 'axios'

async function fetchCarousel(setCarouselItems, carouselCategory) {
  try {
    const { data } = await axios.get(`/api/v1/${carouselCategory}`)

    setCarouselItems(data.carouselItems)
  } catch (err) {
    console.log('Error: ', err.message)
  }
}

export default fetchCarousel
