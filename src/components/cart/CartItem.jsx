import { Link } from 'react-router-dom';
import { formatPriceUAH, truncateText } from '@/util/formatters';
import QuantityControls from './QuantityControls';
import PriceDisplay from './PriceDisplay';
import styles from './CartItem.module.scss';

export default function CartItem({ cartItem }) {
  if (!cartItem) {
    return null;
  }

  const {
    cartItemId,
    product,
    seller,
    price,
    unit,
    quantity,
    subtotal,
    currency = 'UAH'
  } = cartItem;

  const productImage = product?.images?.thumbnail || '';
  const productName = truncateText(product?.name || '', 50);
  const unitName = unit?.name || '';
  const pricePerUnit = price?.price || 0;
  const sellerName = seller?.name || '';
  const productId = product?.id;

  const handleQuantityIncrement = () => {
    console.log(`Increment quantity for cart item ${cartItemId}`);
  };

  const handleQuantityDecrement = () => {
    console.log(`Decrement quantity for cart item ${cartItemId}`);
  };

  return (
    <div className={styles.container}>
      {/* Seller name */}
      <div className={styles.sellerName}>{sellerName}</div>

      <div className={styles.content}>
        {/* Product image and info section */}
        <div className={styles.productSection}>
          {/* Product image */}
          <div className={styles.imageWrapper}>
            {productImage ? (
              <Link to={`/products/${productId}`} className={styles.imageLink}>
                <img
                  src={productImage}
                  alt={productName}
                  className={styles.productImage}
                />
              </Link>
            ) : (
              <div className={styles.imagePlaceholder} />
            )}
          </div>

          {/* Product info */}
          <div className={styles.infoSection}>
            <div className={styles.productInfo}>
              <span className={styles.productName}>{productName}</span>
              {unitName && <span className={styles.unitName}>{unitName}</span>}
            </div>
          </div>
        </div>

        {/* Controls and prices section */}
        <div className={styles.controlsSection}>
          <QuantityControls
            quantity={quantity}
            onIncrement={handleQuantityIncrement}
            onDecrement={handleQuantityDecrement}
          />

          <div className={styles.pricesWrapper}>
            <PriceDisplay
              label="Price per unit"
              price={pricePerUnit}
              currency={currency}
            />
            <PriceDisplay
              label="Subtotal"
              price={subtotal}
              currency={currency}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
