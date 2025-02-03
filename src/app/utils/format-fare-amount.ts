const currencyCodeMapper: Record<string, string> = {
  'Brazilian Real': 'BRL',
  'US Dollar': 'USD',
  'Canadian Dollar': 'CAD',
  Euro: 'EUR',
  'Swiss Francs': 'CHF',
  'Moroccan Dirham': 'MAD',
  'Argentine Peso': 'ARS',
};

export function formatFareAmount(amount: number, currency: string) {
  return currencyCodeMapper[currency]
    ? amount.toLocaleString(undefined, {
        style: 'currency',
        currency: currencyCodeMapper[currency],
      })
    : `${amount} - ${currency}`;
}
