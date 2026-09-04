/**
 * Google reCAPTCHA v3 Utility
 * 
 * Rules:
 * - Active strictly on live domains (e.g. thedivinelotus.org, production deployments).
 * - Completely skipped on localhost / 127.0.0.1 (no scripts loaded, no captcha token requested).
 */

export const RECAPTCHA_SITE_KEY =
  (typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) ||
  "6LeSxagtAAAAAKeIROu1U9IDNiSg_82B47wY69rK";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

/**
 * Checks if running on a local development host.
 */
export function isLocalhost(): boolean {
  if (typeof window === "undefined") return false;
  const hostname = window.location.hostname;
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".local") ||
    hostname === ""
  );
}

let scriptLoadingPromise: Promise<void> | null = null;

/**
 * Loads the reCAPTCHA v3 script dynamically.
 * Completely no-ops on localhost or server-side.
 */
export function loadRecaptchaScript(): Promise<void> {
  if (typeof window === "undefined" || isLocalhost()) {
    return Promise.resolve();
  }

  if (window.grecaptcha) {
    return Promise.resolve();
  }

  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }

  scriptLoadingPromise = new Promise((resolve) => {
    // Check if script element was already injected
    const existingScript = document.getElementById("recaptcha-v3-script");
    if (existingScript) {
      if (window.grecaptcha) {
        resolve();
      } else {
        existingScript.addEventListener("load", () => resolve());
        existingScript.addEventListener("error", () => resolve());
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "recaptcha-v3-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(
      RECAPTCHA_SITE_KEY
    )}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = (err) => {
      console.warn("reCAPTCHA failed to load from Google CDN:", err);
      resolve(); // Graceful degradation: never crash or block form submissions
    };

    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

/**
 * Retrieves a reCAPTCHA v3 token for form submissions.
 * Returns null immediately on localhost.
 */
export async function getRecaptchaToken(action = "submit"): Promise<string | null> {
  if (isLocalhost()) {
    return null;
  }

  try {
    await loadRecaptchaScript();

    if (!window.grecaptcha) {
      return null;
    }

    const tokenPromise = new Promise<string | null>((resolve) => {
      try {
        window.grecaptcha?.ready(async () => {
          try {
            const token = await window.grecaptcha?.execute(RECAPTCHA_SITE_KEY, {
              action,
            });
            resolve(token || null);
          } catch (execErr) {
            console.warn("reCAPTCHA execute failed:", execErr);
            resolve(null);
          }
        });
      } catch (readyErr) {
        console.warn("reCAPTCHA ready failed:", readyErr);
        resolve(null);
      }
    });

    // Enforce 3.5s maximum wait time so form submission never hangs on slow connections
    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => {
        console.warn("reCAPTCHA token request timed out; proceeding gracefully.");
        resolve(null);
      }, 3500)
    );

    return await Promise.race([tokenPromise, timeoutPromise]);
  } catch (err) {
    console.warn("reCAPTCHA token generation error:", err);
    return null;
  }
}
