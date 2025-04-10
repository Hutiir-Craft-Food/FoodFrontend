import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import fetchCarousel from '/src/services/fetchCarousel'

export default function CustomCarousel({ title, carouselCategory }) {
  const [carouselItems, setCarouselItems] = useState(null)

  useEffect(() => {
    fetchCarousel(setCarouselItems, carouselCategory)
  }, [carouselCategory])

  if (!carouselItems) {
    return <div>Завантаження...</div>
  }

  return (
    <div>
      <h2>{title}</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
        className='mySwiper'
      >
        {carouselItems.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
