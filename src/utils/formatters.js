export function formatCurrency(value, currency = 'USD') {
  if (value == null || isNaN(value)) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(value, fractionDigits = 2) {
  if (value == null || isNaN(value)) return '-';
  return `${value.toFixed(fractionDigits)}%`;
}

export function formatMarketCap(value) {
  if (value == null || isNaN(value)) return '-';
  const absValue = Math.abs(value);

  if (absValue >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  } else if (absValue >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (absValue >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else if (absValue >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  } else {
    return value.toString();
  }
}
