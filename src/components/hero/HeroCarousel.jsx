import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import { useNavigate } from 'react-router-dom'
import styles from './HeroCarousel.module.scss'

const HeroCarousel = () => {
  const navigate = useNavigate()

  const slideStyle = styles.slideImage

  return (
    <div className={styles.heroContainer}>
      <div className={styles.leftBlock}>
        <div className={styles.promoBlock}>
          Від ферми <br /> до столу
          <p className={styles.subtitle}>
            маркетплейс крафтових виробів <br /> від найкращих фермерів
          </p>
        </div>

        <div className={styles.sellerBlock}>
          <div className={styles.sellerText}>
            Продавайте з нами <br /> по всій Україні
          </div>

          <div className={styles.imageWrapper}>
            <img
              src='/images/woman.svg'
              alt='Дівчина'
              className={styles.image}
            />
          </div>

          <button
            className={styles.sellerButton}
            onClick={() => navigate('/seller/register')}
          >
            Створити магазин
          </button>
        </div>
      </div>

      <div className={styles.rightBlock}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className={styles.swiper}
        >
          <SwiperSlide>
            <video
              src='/videos/animation.mp4'
              autoPlay
              muted
              playsInline
              preload='auto'
              className={slideStyle}
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src='/images/slide2.svg'
              alt='Смачні продукти'
              className={slideStyle}
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src='/images/slide3.svg'
              alt='Смачні продукти'
              className={slideStyle}
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src='/images/slide4.svg'
              alt='Смачні продукти'
              className={slideStyle}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default HeroCarousel
