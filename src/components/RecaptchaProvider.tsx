"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isLocalhost, loadRecaptchaScript } from "@/lib/recaptcha";

export default function RecaptchaProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Only load reCAPTCHA script on pages that actually feature forms (e.g. /contact)
    // Completely avoid loading or injecting Google reCAPTCHA on the homepage
    if (!isLocalhost() && pathname && pathname.includes("/contact")) {
      loadRecaptchaScript();
    }
  }, [pathname]);

  return null;
}
