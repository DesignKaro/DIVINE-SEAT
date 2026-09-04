"use client";

import { useEffect } from "react";
import { isLocalhost, loadRecaptchaScript } from "@/lib/recaptcha";

export default function RecaptchaProvider() {
  useEffect(() => {
    // Preload reCAPTCHA v3 script strictly on live production domains.
    // Zero script injection or network calls on localhost.
    if (!isLocalhost()) {
      loadRecaptchaScript();
    }
  }, []);

  return null;
}
