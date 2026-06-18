import HeroCarousel from '~/components/hero/HeroCarousel'
import FeaturedProducts from '~/components/product/featured-products/FeaturedProducts'
import NewProducts from '~/components/product/new-products/NewProducts'
import MarketplaceBenefitsSection from '~/components/marketplace-benefits-section/new-products/MarketplaceBenefitsSection'
import MissionSection from '~/components/mission-section/marketplace-benefits-section/new-products/MissionSection'
import ArticlesSection from '~/components/articles-section/marketplace-benefits-section/new-products/ArticlesSection'
import SocialLinksSection from '~/components/social-links-section/mission-section/marketplace-benefits-section/new-products/SocialLinksSection'
import styles from './HomePage.module.scss'

export default function HomePage() {
  return (
    <div className="container">
      <HeroCarousel />
      <FeaturedProducts />
      <MarketplaceBenefitsSection />
      <NewProducts />
      <ArticlesSection />
      <MissionSection />
      <SocialLinksSection />
    </div>
  )
}
