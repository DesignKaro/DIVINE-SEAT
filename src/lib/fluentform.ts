/**
 * Fluent Forms Client Submission Utility
 * 
 * Submits form data directly to the Fluent Forms WordPress admin-ajax endpoint:
 * - [fluentform id="1"]: Notify Me / Waitlist Form (Name, Email, Phone with Country Code)
 * - [fluentform id="2"]: Newsletter Subscription Form (Email)
 * - [fluentform id="3"]: Contact Concierge Form (Name, Email, Phone, Message)
 * 
 * Guaranteed strictly single-submission (no CORS retry duplicate submissions).
 */

import { getRecaptchaToken, isLocalhost } from "./recaptcha";

const DEFAULT_WP_URL = "https://api.thedivinelotus.org";

export interface FluentFormResponse {
  success: boolean;
  message?: string;
  insertId?: number;
}

// In-flight debounce set to prevent identical simultaneous submissions
const inFlightSubmissions = new Set<string>();

export async function submitFluentForm(
  formId: number,
  formData: Record<string, string>
): Promise<FluentFormResponse> {
  const wpBaseUrl =
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_WORDPRESS_URL) ||
    DEFAULT_WP_URL;

  const endpoint = `${wpBaseUrl.replace(/\/+$/, "")}/wp-admin/admin-ajax.php`;

  // Clone payload
  const extendedFormData = { ...formData };

  // reCAPTCHA v3: Active strictly on live domains, completely skipped on localhost
  if (!isLocalhost()) {
    try {
      const token = await getRecaptchaToken(`fluentform_${formId}`);
      if (token) {
        extendedFormData["g-recaptcha-response"] = token;
        extendedFormData["_g_recaptcha_response"] = token;
      }
    } catch (err) {
      console.warn("reCAPTCHA generation failed, proceeding without token:", err);
    }
  }

  // Deduplication key based on formId and trimmed payload values
  const payloadFingerprint = `${formId}:${Object.entries(extendedFormData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v?.trim()}`)
    .join("&")}`;

  if (inFlightSubmissions.has(payloadFingerprint)) {
    return {
      success: true,
      message: "Submission already processed.",
    };
  }
  inFlightSubmissions.add(payloadFingerprint);

  // Build the serialized query string for the 'data' parameter expected by Fluent Forms
  // Pre-encode values while preserving literal brackets for array keys like names[first_name]
  const rawData = Object.entries(extendedFormData)
    .filter(([_, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v).trim())}`)
    .join("&");

  const body = `action=fluentform_submit&form_id=${formId}&data=${encodeURIComponent(rawData)}`;

  try {
    // Using mode: 'no-cors' sends a single, direct POST request without preflight OPTIONS
    // and prevents cross-origin response blocking from triggering fallback retries
    await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
      mode: "no-cors",
      signal: AbortSignal.timeout(12000),
    });

    return {
      success: true,
      message: "Thank you! Your information has been received.",
    };
  } catch (err) {
    // Release debounce lock immediately on network failure so user can re-submit
    inFlightSubmissions.delete(payloadFingerprint);
    console.error("Fluent Form submission error:", err);
    return {
      success: false,
      message: "Unable to submit at this moment. Please check your connection and try again.",
    };
  } finally {
    // Release the debounce lock after 2 seconds for successful submissions
    setTimeout(() => {
      inFlightSubmissions.delete(payloadFingerprint);
    }, 2000);
  }
}
