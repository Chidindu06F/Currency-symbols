/**
 * Currency dataset.
 *
 * Each entry pairs a country with its currency's ISO 4217 code, a human-readable
 * currency name, and the text symbol most commonly used to represent it.
 *
 * Notes:
 * - Some currencies legitimately share a symbol (e.g. several use "$" or "kr").
 * - A handful of currencies have no single-character symbol, so the symbol falls
 *   back to a short text token (e.g. "CFA", "RM").
 * - This list is the single source of truth: the main thread posts it to the UI
 *   on launch, so the UI never hard-codes its own copy.
 */
export interface CurrencyEntry {
  /** Country or region the currency belongs to. */
  country: string;
  /** Human-readable currency name, e.g. "Nigerian Naira". */
  name: string;
  /** ISO 4217 currency code, e.g. "NGN". */
  code: string;
  /** Text symbol used to represent the currency, e.g. "₦". */
  symbol: string;
}

export const currencies: CurrencyEntry[] = [
  { country: "United States", name: "US Dollar", code: "USD", symbol: "$" },
  { country: "European Union", name: "Euro", code: "EUR", symbol: "€" },
  { country: "United Kingdom", name: "British Pound", code: "GBP", symbol: "£" },
  { country: "Japan", name: "Japanese Yen", code: "JPY", symbol: "¥" },
  { country: "Canada", name: "Canadian Dollar", code: "CAD", symbol: "$" },
  { country: "Australia", name: "Australian Dollar", code: "AUD", symbol: "$" },
  { country: "Switzerland", name: "Swiss Franc", code: "CHF", symbol: "CHF" },
  { country: "China", name: "Chinese Yuan", code: "CNY", symbol: "¥" },
  { country: "India", name: "Indian Rupee", code: "INR", symbol: "₹" },
  { country: "Nigeria", name: "Nigerian Naira", code: "NGN", symbol: "₦" },
  { country: "Mexico", name: "Mexican Peso", code: "MXN", symbol: "$" },
  { country: "Brazil", name: "Brazilian Real", code: "BRL", symbol: "R$" },
  { country: "South Africa", name: "South African Rand", code: "ZAR", symbol: "R" },
  { country: "South Korea", name: "South Korean Won", code: "KRW", symbol: "₩" },
  { country: "Turkey", name: "Turkish Lira", code: "TRY", symbol: "₺" },
  { country: "Russia", name: "Russian Ruble", code: "RUB", symbol: "₽" },
  { country: "Indonesia", name: "Indonesian Rupiah", code: "IDR", symbol: "Rp" },
  { country: "Saudi Arabia", name: "Saudi Riyal", code: "SAR", symbol: "﷼" },
  { country: "United Arab Emirates", name: "UAE Dirham", code: "AED", symbol: "د.إ" },
  { country: "Argentina", name: "Argentine Peso", code: "ARS", symbol: "$" },
  { country: "Sweden", name: "Swedish Krona", code: "SEK", symbol: "kr" },
  { country: "Norway", name: "Norwegian Krone", code: "NOK", symbol: "kr" },
  { country: "Denmark", name: "Danish Krone", code: "DKK", symbol: "kr" },
  { country: "Poland", name: "Polish Złoty", code: "PLN", symbol: "zł" },
  { country: "Israel", name: "Israeli New Shekel", code: "ILS", symbol: "₪" },
  { country: "Egypt", name: "Egyptian Pound", code: "EGP", symbol: "£" },
  { country: "Philippines", name: "Philippine Peso", code: "PHP", symbol: "₱" },
  { country: "Thailand", name: "Thai Baht", code: "THB", symbol: "฿" },
  { country: "Malaysia", name: "Malaysian Ringgit", code: "MYR", symbol: "RM" },
  { country: "Singapore", name: "Singapore Dollar", code: "SGD", symbol: "$" },
  { country: "New Zealand", name: "New Zealand Dollar", code: "NZD", symbol: "$" },
  { country: "Vietnam", name: "Vietnamese Dong", code: "VND", symbol: "₫" },
  { country: "Chile", name: "Chilean Peso", code: "CLP", symbol: "$" },
  { country: "Colombia", name: "Colombian Peso", code: "COP", symbol: "$" },
  { country: "Peru", name: "Peruvian Sol", code: "PEN", symbol: "S/" },
  { country: "Czech Republic", name: "Czech Koruna", code: "CZK", symbol: "Kč" },
  { country: "Hungary", name: "Hungarian Forint", code: "HUF", symbol: "Ft" },
  { country: "Iceland", name: "Icelandic Króna", code: "ISK", symbol: "kr" },
  { country: "Ukraine", name: "Ukrainian Hryvnia", code: "UAH", symbol: "₴" },
  { country: "Romania", name: "Romanian Leu", code: "RON", symbol: "lei" },
  { country: "Bangladesh", name: "Bangladeshi Taka", code: "BDT", symbol: "৳" },
  { country: "Pakistan", name: "Pakistani Rupee", code: "PKR", symbol: "₨" },
  { country: "Sri Lanka", name: "Sri Lankan Rupee", code: "LKR", symbol: "₨" },
  { country: "Morocco", name: "Moroccan Dirham", code: "MAD", symbol: "د.م." },
  { country: "Kenya", name: "Kenyan Shilling", code: "KES", symbol: "KSh" },
  { country: "Ghana", name: "Ghanaian Cedi", code: "GHS", symbol: "₵" },
  { country: "Ethiopia", name: "Ethiopian Birr", code: "ETB", symbol: "Br" },
  { country: "Tunisia", name: "Tunisian Dinar", code: "TND", symbol: "د.ت" },
  { country: "Algeria", name: "Algerian Dinar", code: "DZD", symbol: "دج" },
  { country: "Kazakhstan", name: "Kazakhstani Tenge", code: "KZT", symbol: "₸" },
  { country: "Belarus", name: "Belarusian Ruble", code: "BYN", symbol: "Br" },
  { country: "Bolivia", name: "Bolivian Boliviano", code: "BOB", symbol: "Bs." },
  { country: "Venezuela", name: "Venezuelan Bolívar", code: "VES", symbol: "Bs." },
  { country: "Croatia", name: "Euro", code: "EUR", symbol: "€" },
  { country: "Bulgaria", name: "Bulgarian Lev", code: "BGN", symbol: "лв" },
  { country: "Slovenia", name: "Euro", code: "EUR", symbol: "€" },
  { country: "Slovakia", name: "Euro", code: "EUR", symbol: "€" },
  { country: "Latvia", name: "Euro", code: "EUR", symbol: "€" },
  { country: "Lithuania", name: "Euro", code: "EUR", symbol: "€" },
  { country: "Estonia", name: "Euro", code: "EUR", symbol: "€" },
  { country: "Cyprus", name: "Euro", code: "EUR", symbol: "€" },
  { country: "Malta", name: "Euro", code: "EUR", symbol: "€" },
  { country: "Afghanistan", name: "Afghan Afghani", code: "AFN", symbol: "AFN" },
  { country: "Armenia", name: "Armenian Dram", code: "AMD", symbol: "֏" },
  { country: "Azerbaijan", name: "Azerbaijani Manat", code: "AZN", symbol: "₼" },
  { country: "Bahrain", name: "Bahraini Dinar", code: "BHD", symbol: "BD" },
  { country: "Barbados", name: "Barbadian Dollar", code: "BBD", symbol: "$" },
  { country: "Belize", name: "Belize Dollar", code: "BZD", symbol: "$" },
  { country: "Bhutan", name: "Bhutanese Ngultrum", code: "BTN", symbol: "Nu." },
  { country: "Brunei", name: "Brunei Dollar", code: "BND", symbol: "$" },
  { country: "Cambodia", name: "Cambodian Riel", code: "KHR", symbol: "៛" },
  { country: "Cameroon", name: "Central African CFA Franc", code: "XAF", symbol: "FCFA" },
  { country: "Central African Republic", name: "Central African CFA Franc", code: "XAF", symbol: "FCFA" },
  { country: "Chad", name: "Central African CFA Franc", code: "XAF", symbol: "FCFA" },
  { country: "Comoros", name: "Comorian Franc", code: "KMF", symbol: "CF" },
  { country: "Côte d’Ivoire", name: "West African CFA Franc", code: "XOF", symbol: "CFA" },
  { country: "Djibouti", name: "Djiboutian Franc", code: "DJF", symbol: "Fdj" },
  { country: "Dominican Republic", name: "Dominican Peso", code: "DOP", symbol: "RD$" },
  { country: "Fiji", name: "Fijian Dollar", code: "FJD", symbol: "$" },
  { country: "Guatemala", name: "Guatemalan Quetzal", code: "GTQ", symbol: "Q" },
  { country: "Honduras", name: "Honduran Lempira", code: "HNL", symbol: "L" },
  { country: "Iraq", name: "Iraqi Dinar", code: "IQD", symbol: "ع.د" },
  { country: "Jordan", name: "Jordanian Dinar", code: "JOD", symbol: "د.ا" },
  { country: "Kuwait", name: "Kuwaiti Dinar", code: "KWD", symbol: "د.ك" },
  { country: "Laos", name: "Lao Kip", code: "LAK", symbol: "₭" },
  { country: "Lebanon", name: "Lebanese Pound", code: "LBP", symbol: "ل.ل" },
  { country: "Libya", name: "Libyan Dinar", code: "LYD", symbol: "ل.د" },
  { country: "North Macedonia", name: "Macedonian Denar", code: "MKD", symbol: "ден" },
  { country: "Moldova", name: "Moldovan Leu", code: "MDL", symbol: "L" },
  { country: "Monaco", name: "Euro", code: "EUR", symbol: "€" },
  { country: "Montenegro", name: "Euro", code: "EUR", symbol: "€" },
  { country: "Namibia", name: "Namibian Dollar", code: "NAD", symbol: "$" },
  { country: "Oman", name: "Omani Rial", code: "OMR", symbol: "ر.ع." },
  { country: "Panama", name: "Panamanian Balboa", code: "PAB", symbol: "B/." },
  { country: "Paraguay", name: "Paraguayan Guaraní", code: "PYG", symbol: "Gs" },
  { country: "Qatar", name: "Qatari Riyal", code: "QAR", symbol: "ر.ق" },
  { country: "Seychelles", name: "Seychellois Rupee", code: "SCR", symbol: "₨" },
  { country: "Suriname", name: "Surinamese Dollar", code: "SRD", symbol: "$" },
  { country: "Tanzania", name: "Tanzanian Shilling", code: "TZS", symbol: "TSh" },
  { country: "Uganda", name: "Ugandan Shilling", code: "UGX", symbol: "USh" },
  { country: "Uzbekistan", name: "Uzbekistani Som", code: "UZS", symbol: "soʻm" },
  { country: "Zambia", name: "Zambian Kwacha", code: "ZMW", symbol: "ZK" },
  { country: "Zimbabwe", name: "Zimbabwean Dollar", code: "ZWL", symbol: "Z$" },
];
