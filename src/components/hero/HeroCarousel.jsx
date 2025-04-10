import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'

const HeroCarousel = () => {
  return (
    <div
      style={{
        width: '1200px',
        height: '544px',
        padding: '48px',
        display: 'flex',
        gap: '16px',
      }}
    >
      {/* left*/}
      <div
        style={{
          width: '451px',
          height: '544px',
          gap: '16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            backgroundColor: '#F4E5D3',
            padding: '24px',
            borderRadius: '12px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#511F4A',
            flex: 1,
          }}
        >
          Від ферми <br /> до столу
          <p
            style={{ fontSize: '16px', fontWeight: 'normal', marginTop: '8px' }}
          >
            маркетплейс крафтових виробів <br /> від найкращих фермерів
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#6A0D45',
            color: '#fff',
            padding: '20px',
            borderRadius: '12px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            Продавайте з нами <br /> по всій Україні
          </div>
          <button
            style={{
              marginTop: '16px',
              backgroundColor: '#fff',
              color: '#6A0D45',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: 'fit-content',
            }}
            onClick={() => (window.location.href = '/seller/register')}
          >
            Створити магазин
          </button>
        </div>
      </div>

      {/* right */}
      <div
        style={{
          width: '777px',
          height: '544px',
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          style={{ width: '100%', height: '100%' }}
        >
          <SwiperSlide>
            <video
              src='/videos/animation.mp4'
              autoPlay
              muted
              playsInline
              preload='auto'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px',
              }}
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src='/images/slide2.svg'
              alt='Смачні продукти'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px',
              }}
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src='/images/slide3.svg'
              alt='Смачні продукти'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px',
              }}
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src='/images/slide4.svg'
              alt='Смачні продукти'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px',
              }}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default HeroCarousel
