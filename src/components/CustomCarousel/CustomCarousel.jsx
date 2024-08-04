import Carousel from 'react-multi-carousel';
import styles from "./CustomCarousel";

export default function CustomCarousel ({ title, items }) {
	// console.log(items);
	return (
		<div className={styles.customCarousel}>
			<h2>{title}</h2>
			<Carousel
				additionalTransfrom={0}
				arrows
				autoPlaySpeed={3000}
				centerMode={false}
				className=""
				// containerClass={`w-full`}
				containerClass="container-with-dots"
				dotListClass=""
				draggable
				focusOnSelect={false}
				infinite
				itemClass=""
				keyBoardControl
				minimumTouchDrag={80}
				pauseOnHover
				renderArrowsWhenDisabled={false}
				renderButtonGroupOutside={false}
				renderDotsOutside={false}
				responsive={{
					desktop: {
						breakpoint: {
							max: 3000,
							min: 1024
						},
						items: 3,
						partialVisibilityGutter: 40
					},
					mobile: {
						breakpoint: {
							max: 464,
							min: 0
						},
						items: 1,
						partialVisibilityGutter: 30
					},
					tablet: {
						breakpoint: {
							max: 1024,
							min: 464
						},
						items: 2,
						partialVisibilityGutter: 30
					}
				}}
				rewind={false}
				rewindWithAnimation={false}
				rtl={false}
				shouldResetAutoplay
				showDots={false}
				sliderClass=""
				slidesToSlide={1}
				swipeable
			>
				{items.map((item, index) => (
					<div key={index} >
						<img src={item.image} alt={item.name} />
						{/* <h3>{item.name}</h3> */}
					</div>
				))}
			</Carousel>
		</div>
	)
}


