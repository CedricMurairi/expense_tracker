export default function formatNumber(num) {
  if (!num || num === 0) return 0;
  if (num >= 10000 && num < 1000000) {
    const formatted = (num / 1000).toFixed(1);
    return formatted.replace(/\.0$/, "") + "K";
  } else if (num >= 1000000) {
    const formatted = (num / 1000000).toFixed(1);
    return formatted.replace(/\.0$/, "") + "M";
  } else {
    return num.toString();
  }
}
