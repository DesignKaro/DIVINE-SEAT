export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭" },
  { name: "Austria", code: "AT", dialCode: "+43", flag: "🇦🇹" },
  { name: "Belgium", code: "BE", dialCode: "+32", flag: "🇧🇪" },
  { name: "Denmark", code: "DK", dialCode: "+45", flag: "🇩🇰" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪" },
  { name: "Norway", code: "NO", dialCode: "+47", flag: "🇳🇴" },
  { name: "Finland", code: "FI", dialCode: "+358", flag: "🇫🇮" },
  { name: "Ireland", code: "IE", dialCode: "+353", flag: "🇮🇪" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", flag: "🇳🇿" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", dialCode: "+82", flag: "🇰🇷" },
  { name: "Hong Kong", code: "HK", dialCode: "+852", flag: "🇭🇰" },
  { name: "Portugal", code: "PT", dialCode: "+351", flag: "🇵🇹" },
  { name: "Poland", code: "PL", dialCode: "+48", flag: "🇵🇱" },
  { name: "Greece", code: "GR", dialCode: "+30", flag: "🇬🇷" },
  { name: "Czech Republic", code: "CZ", dialCode: "+420", flag: "🇨🇿" },
  { name: "Hungary", code: "HU", dialCode: "+36", flag: "🇭🇺" },
  { name: "Romania", code: "RO", dialCode: "+40", flag: "🇷🇴" },
  { name: "Israel", code: "IL", dialCode: "+972", flag: "🇮🇱" },
  { name: "Turkey", code: "TR", dialCode: "+90", flag: "🇹🇷" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "🇮🇩" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "Thailand", code: "TH", dialCode: "+66", flag: "🇹🇭" },
  { name: "Philippines", code: "PH", dialCode: "+63", flag: "🇵🇭" },
  { name: "Vietnam", code: "VN", dialCode: "+84", flag: "🇻🇳" },
  { name: "Argentina", code: "AR", dialCode: "+54", flag: "🇦🇷" },
  { name: "Chile", code: "CL", dialCode: "+56", flag: "🇨🇱" },
  { name: "Colombia", code: "CO", dialCode: "+57", flag: "🇨🇴" },
];

// High-speed mapping from standard IANA Timezone to ISO 2-letter Country Code
const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  // India
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",

  // United Kingdom
  "Europe/London": "GB",
  "Europe/Belfast": "GB",

  // United States
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Phoenix": "US",
  "America/Anchorage": "US",
  "America/Detroit": "US",
  "America/Indiana/Indianapolis": "US",
  "Pacific/Honolulu": "US",

  // Canada
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Montreal": "CA",
  "America/Edmonton": "CA",
  "America/Winnipeg": "CA",
  "America/Halifax": "CA",

  // Australia
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Brisbane": "AU",
  "Australia/Perth": "AU",
  "Australia/Adelaide": "AU",

  // Europe
  "Europe/Berlin": "DE",
  "Europe/Busingen": "DE",
  "Europe/Paris": "FR",
  "Europe/Rome": "IT",
  "Europe/Madrid": "ES",
  "Africa/Ceuta": "ES",
  "Atlantic/Canary": "ES",
  "Europe/Amsterdam": "NL",
  "Europe/Zurich": "CH",
  "Europe/Vienna": "AT",
  "Europe/Brussels": "BE",
  "Europe/Copenhagen": "DK",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Helsinki": "FI",
  "Europe/Dublin": "IE",
  "Europe/Lisbon": "PT",
  "Atlantic/Madeira": "PT",
  "Atlantic/Azores": "PT",
  "Europe/Warsaw": "PL",
  "Europe/Athens": "GR",
  "Europe/Prague": "CZ",
  "Europe/Budapest": "HU",
  "Europe/Bucharest": "RO",
  "Europe/Istanbul": "TR",
  "Asia/Istanbul": "TR",

  // Middle East & Asia Pacific
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Singapore": "SG",
  "Asia/Tokyo": "JP",
  "Asia/Seoul": "KR",
  "Asia/Hong_Kong": "HK",
  "Asia/Jerusalem": "IL",
  "Asia/Tel_Aviv": "IL",
  "Asia/Jakarta": "ID",
  "Asia/Pontianak": "ID",
  "Asia/Makassar": "ID",
  "Asia/Jayapura": "ID",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Kuching": "MY",
  "Asia/Bangkok": "TH",
  "Asia/Manila": "PH",
  "Asia/Ho_Chi_Minh": "VN",
  "Pacific/Auckland": "NZ",
  "Pacific/Chatham": "NZ",

  // Americas & Africa
  "America/Sao_Paulo": "BR",
  "America/Fortaleza": "BR",
  "America/Manaus": "BR",
  "America/Mexico_City": "MX",
  "America/Cancun": "MX",
  "America/Monterrey": "MX",
  "America/Tijuana": "MX",
  "Africa/Johannesburg": "ZA",
  "America/Argentina/Buenos_Aires": "AR",
  "America/Santiago": "CL",
  "America/Bogota": "CO",
};

/**
 * Instantly detects the user's country using browser timezone and locale (0 network overhead).
 */
export function detectUserCountry(): Country {
  if (typeof window === "undefined") return COUNTRIES[0];

  try {
    // 1. Check IANA TimeZone resolution
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone && TIMEZONE_TO_COUNTRY[timeZone]) {
      const code = TIMEZONE_TO_COUNTRY[timeZone];
      const match = COUNTRIES.find((c) => c.code === code);
      if (match) return match;
    }

    // 2. Check navigator.languages / language (e.g. "en-IN" -> "IN")
    const languages = navigator.languages || [navigator.language];
    for (const lang of languages) {
      if (lang && lang.includes("-")) {
        const countryCode = lang.split("-")[1]?.toUpperCase();
        if (countryCode) {
          const match = COUNTRIES.find((c) => c.code === countryCode);
          if (match) return match;
        }
      }
    }
  } catch (err) {
    console.debug("Country detection fallback:", err);
  }

  return COUNTRIES[0];
}

/**
 * Asynchronously detects user country via lightweight Geo-IP lookup.
 * Caches in sessionStorage to minimize external requests.
 */
export async function detectCountryFromIP(): Promise<Country | null> {
  if (typeof window === "undefined") return null;

  try {
    const cachedCode = sessionStorage.getItem("dl_detected_country");
    if (cachedCode) {
      const match = COUNTRIES.find((c) => c.code === cachedCode);
      if (match) return match;
    }

    // Fast, lightweight, free Geo-IP lookup with 2.5s timeout
    const res = await fetch("https://api.country.is/", {
      signal: AbortSignal.timeout(2500),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.country) {
        const code = String(data.country).toUpperCase();
        sessionStorage.setItem("dl_detected_country", code);
        const match = COUNTRIES.find((c) => c.code === code);
        if (match) return match;
      }
    }
  } catch {
    // Silently fall back to timezone/locale detection on ad-blocker or network drop
  }

  return null;
}
