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
  const currencyCode = currencyCodeMapper[currency] ?? currency;

  try {
    return amount.toLocaleString(undefined, {
      style: 'currency',
      currency: currencyCode,
    });
  } catch {
    return `${amount} - ${currency}`;
  }
}
