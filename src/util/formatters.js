/**
 * Formats a price value as Ukrainian Hryvnia (UAH)
 * @param {number|string} price - The price to format
 * @returns {string} Formatted price (e.g., "150.99 ₴")
 */
export const formatPriceUAH = (price) => {
  if (price === null || price === undefined) {
    return '0.00 ₴';
  }

  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numPrice)) {
    return '0.00 ₴';
  }

  return `${numPrice.toFixed(2)} ₴`;
};

/**
 * Truncates text to a maximum length and adds ellipsis if truncated
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length (default: 50)
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) {
    return '';
  }

  if (typeof text !== 'string') {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
};
