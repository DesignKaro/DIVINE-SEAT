"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "INR" | "EUR";

export interface PricingDetails {
  price: string;
  originalPrice: string;
  discountBadge: string;
  ctaText: string;
}

export interface CurrencyContextType {
  currency: Currency;
  currencySymbol: string;
  isIndia: boolean;
  setCurrency: (c: Currency) => void;
  standard: PricingDetails;
  custom: PricingDetails;
}

const PRICING_MAP: Record<
  Currency,
  {
    symbol: string;
    standard: PricingDetails;
    custom: PricingDetails;
  }
> = {
  INR: {
    symbol: "₹",
    standard: {
      price: "₹14,999",
      originalPrice: "₹21,499",
      discountBadge: "30% OFF",
      ctaText: "ORDER NOW • ₹14,999",
    },
    custom: {
      price: "₹19,999",
      originalPrice: "₹28,499",
      discountBadge: "30% OFF",
      ctaText: "CUSTOMISE NOW • ₹19,999",
    },
  },
  EUR: {
    symbol: "€",
    standard: {
      price: "€149",
      originalPrice: "€215",
      discountBadge: "30% OFF",
      ctaText: "ORDER NOW • €149",
    },
    custom: {
      price: "€199",
      originalPrice: "€285",
      discountBadge: "30% OFF",
      ctaText: "CUSTOMISE NOW • €199",
    },
  },
};

const STORAGE_KEY = "divine_lotus_currency_pref";

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "EUR",
  currencySymbol: "€",
  isIndia: false,
  setCurrency: () => {},
  standard: PRICING_MAP.EUR.standard,
  custom: PRICING_MAP.EUR.custom,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("EUR");
  const [hasManuallySet, setHasManuallySet] = useState(false);

  useEffect(() => {
    // 1. Check saved preference in localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "INR" || saved === "EUR") {
        setCurrencyState(saved);
        setHasManuallySet(true);
        return;
      }
    } catch {
      // localStorage error (e.g. private mode)
    }

    // 2. Instant client-side detection (0ms latency via Timezone & Offset)
    let detectedAsIndia = false;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offset = new Date().getTimezoneOffset(); // -330 is IST (UTC+5:30)
      if (
        tz === "Asia/Kolkata" ||
        tz === "Asia/Calcutta" ||
        tz.includes("Kolkata") ||
        tz.includes("Calcutta") ||
        offset === -330
      ) {
        detectedAsIndia = true;
        setCurrencyState("INR");
      }
    } catch {
      // ignore
    }

    // 3. Network verification via server headers or fast geo IP lookup
    const verifyGeo = async () => {
      try {
        // Try internal endpoint first
        const localRes = await fetch("/api/geo").catch(() => null);
        if (localRes && localRes.ok) {
          const data = await localRes.json();
          if (data?.country) {
            const isIN = data.country.toUpperCase() === "IN";
            setCurrencyState(isIN ? "INR" : "EUR");
            return;
          }
        }

        // Fast fallback to country.is if local header not provided
        const remoteRes = await fetch("https://api.country.is", {
          signal: AbortSignal.timeout(3500),
        }).catch(() => null);
        if (remoteRes && remoteRes.ok) {
          const geo = await remoteRes.json();
          if (geo?.country) {
            const isIN = geo.country.toUpperCase() === "IN";
            setCurrencyState(isIN ? "INR" : "EUR");
            return;
          }
        }
      } catch {
        // Keep detectedAsIndia state if network check fails
      }
    };

    verifyGeo();
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    setHasManuallySet(true);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // ignore
    }
  };

  const activePricing = PRICING_MAP[currency];

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencySymbol: activePricing.symbol,
        isIndia: currency === "INR",
        setCurrency,
        standard: activePricing.standard,
        custom: activePricing.custom,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
