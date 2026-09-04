"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isLocalhost, loadRecaptchaScript } from "@/lib/recaptcha";

export default function RecaptchaProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Preload reCAPTCHA v3 script strictly on live production domains.
    if (!isLocalhost()) {
      loadRecaptchaScript();
    }

    let observer: IntersectionObserver | null = null;
    const observedForms = new Set<Element>();
    const intersectingForms = new Set<Element>();

    const updateVisibility = () => {
      // Always show on contact page as it is dedicated to inquiry form
      if (window.location.pathname.includes("/contact")) {
        document.body.classList.add("show-recaptcha");
        return;
      }

      // Check if any dialog/modal form is active and visible
      const modalForms = document.querySelectorAll(
        'div[role="dialog"] form, [data-modal="true"] form'
      );
      const isModalFormOpen = Array.from(modalForms).some(
        (form) => form.getBoundingClientRect().height > 0
      );

      if (intersectingForms.size > 0 || isModalFormOpen) {
        document.body.classList.add("show-recaptcha");
      } else {
        document.body.classList.remove("show-recaptcha");
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingForms.add(entry.target);
          } else {
            intersectingForms.delete(entry.target);
          }
        });
        updateVisibility();
      },
      {
        rootMargin: "0px 0px 50px 0px",
        threshold: 0.05,
      }
    );

    const observeAllForms = () => {
      const forms = document.querySelectorAll("form");
      forms.forEach((form) => {
        if (!observedForms.has(form)) {
          observedForms.add(form);
          observer?.observe(form);
        }
      });
      updateVisibility();
    };

    // Initial check
    observeAllForms();

    // Observe dynamic modal popups and DOM changes
    const mutationObserver = new MutationObserver(() => {
      observeAllForms();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also listen to scroll/resize events as backup
    const handleScroll = () => {
      updateVisibility();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("show-recaptcha");
    };
  }, [pathname]);

  return null;
}
