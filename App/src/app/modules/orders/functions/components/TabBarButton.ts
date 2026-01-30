import { ProductRate } from "../../../product/models/product_model";

export const splitProductName = (name: string): [string, string] => {
  const words = name.split(' ');
  let firstPart = '';
  let secondPart = '';
  let totalLength = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (totalLength + word.length + (firstPart ? 1 : 0) <= 26) {
      firstPart += (firstPart ? ' ' : '') + word;
      totalLength = firstPart.length;
    } else {
      secondPart = words.slice(i).join(' ');
      break;
    }
  }

  return [firstPart, secondPart];
};

export function sortRatesBySelected(
  rates: ProductRate[] | null | undefined,
  selectedRateId: number
): ProductRate[] {
  const safeRates = Array.isArray(rates) ? rates : [];
  return [...safeRates].sort((a, b) => {
    if (a.rateId === selectedRateId) return -1;
    if (b.rateId === selectedRateId) return 1;
    return 0;
  });
}
