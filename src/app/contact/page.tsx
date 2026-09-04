"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowUpRight, 
  Mail, 
  Clock, 
  MapPin, 
  Globe,
  Check,
  Loader2,
  ChevronDown,
  Search,
  X
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import { submitFluentForm } from "@/lib/fluentform";
import { COUNTRIES, Country, detectUserCountry, detectCountryFromIP } from "@/lib/countries";
import { 
  validateName, 
  validateEmail, 
  validatePhone, 
  validateMessage,
  ValidationResult 
} from "@/lib/validation";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Country Selection for Phone Field (Matching Notify Me in Header)
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // default US (+1)
  const userSelectedCountryRef = useRef(false);
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-detect visitor's country on mount
  useEffect(() => {
    // 1. Instant client-side detection via IANA timezone and browser navigator locale
    const localMatch = detectUserCountry();
    if (localMatch && !userSelectedCountryRef.current) {
      setSelectedCountry(localMatch);
    }

    // 2. Accurate asynchronous Geo-IP detection (with fallback)
    detectCountryFromIP().then((ipMatch) => {
      if (ipMatch && !userSelectedCountryRef.current) {
        setSelectedCountry(ipMatch);
      }
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setCountryPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredCountries = COUNTRIES.filter((c) => {
    if (!countrySearch.trim()) return true;
    const q = countrySearch.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  // Field validation on blur
  const handleBlur = (field: "name" | "email" | "phone" | "message") => {
    let result: ValidationResult = { isValid: true };
    if (field === "name") result = validateName(name);
    else if (field === "email") result = validateEmail(email);
    else if (field === "phone") {
      const fullPhone = phone.trim() ? `${selectedCountry.dialCode} ${phone.trim()}` : "";
      result = validatePhone(fullPhone, false);
    }
    else if (field === "message") result = validateMessage(message, 5);

    if (!result.isValid) {
      setFieldErrors((prev) => ({ ...prev, [field]: result.error }));
    } else {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (fieldErrors.name) {
      const res = validateName(val);
      if (res.isValid) {
        setFieldErrors((prev) => ({ ...prev, name: undefined }));
      }
    }
    if (submitError) setSubmitError(null);
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (fieldErrors.email) {
      const res = validateEmail(val);
      if (res.isValid) {
        setFieldErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
    if (submitError) setSubmitError(null);
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (fieldErrors.phone) {
      const fullPhone = val.trim() ? `${selectedCountry.dialCode} ${val.trim()}` : "";
      const res = validatePhone(fullPhone, false);
      if (res.isValid) {
        setFieldErrors((prev) => ({ ...prev, phone: undefined }));
      }
    }
    if (submitError) setSubmitError(null);
  };

  const handleMessageChange = (val: string) => {
    setMessage(val);
    if (fieldErrors.message) {
      const res = validateMessage(val, 5);
      if (res.isValid) {
        setFieldErrors((prev) => ({ ...prev, message: undefined }));
      }
    }
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current || isSubmitting) return;

    const fullPhone = phone.trim() ? `${selectedCountry.dialCode} ${phone.trim()}` : "";

    // Strict Frontend Validation matching Fluent Forms backend rules
    const nameCheck = validateName(name);
    const emailCheck = validateEmail(email);
    const phoneCheck = validatePhone(fullPhone, false);
    const messageCheck = validateMessage(message, 5);

    const errors: typeof fieldErrors = {};
    if (!nameCheck.isValid) errors.name = nameCheck.error;
    if (!emailCheck.isValid) errors.email = emailCheck.error;
    if (!phoneCheck.isValid) errors.phone = phoneCheck.error;
    if (!messageCheck.isValid) errors.message = messageCheck.error;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstError = errors.name || errors.email || errors.phone || errors.message;
      setSubmitError(firstError || "Please check the highlighted fields.");
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const trimmedMessage = message.trim();
      const emailSubject = `Concierge Inquiry from ${trimmedName}`;
      const safePhone = fullPhone || "N/A";

      const result = await submitFluentForm(3, {
        names: trimmedName,
        "names[first_name]": trimmedName,
        name: trimmedName,
        first_name: trimmedName,
        email: trimmedEmail,
        phone: safePhone,
        "phone/mobile": safePhone,
        mobile: safePhone,
        tel: safePhone,
        subject: emailSubject,
        message: trimmedMessage,
        your_message: trimmedMessage,
        "your-message": trimmedMessage,
        description: trimmedMessage,
      });

      if (result.success) {
        setIsSubmitted(true);
        setFieldErrors({});
      } else {
        setSubmitError(result.message || "Unable to send your inquiry. Please try again.");
      }
    } catch {
      setSubmitError("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        isSubmittingRef.current = false;
      }, 1500);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setFieldErrors({});
    setSubmitError(null);
    setIsSubmitted(false);
  };

  return (
    <main data-header-theme="light" className="min-h-screen bg-[#ECE7DE] text-[#402E1D] flex flex-col justify-between overflow-x-hidden">
      {/* Homepage Floating Pill Header */}
      <Header />

      {/* Main Content Canvas matching Header & Footer Container Width */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-24 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-20 lg:pb-28 flex-1">
        
        {/* Page Hero Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 md:mb-18">
          <AnimatedReveal delay={0.03} y={12}>
            <span className="font-sans text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.18em] uppercase text-[#876540] block mb-2.5 sm:mb-3">
              /GET IN TOUCH
            </span>
          </AnimatedReveal>
          <AnimatedHeading
            text="We’re here to help you settle into stillness."
            as="h1"
            className="font-display font-bold text-[28px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.14] text-[#1E140D] tracking-tight mb-3.5 sm:mb-5"
          />
          <AnimatedReveal delay={0.18} y={18}>
            <p className="font-sans text-[14px] sm:text-[15.5px] md:text-[16.5px] leading-[1.65] text-[#402E1D]/80">
              Whether you have questions regarding ergonomics, custom sizing & bespoke palettes, order assistance, or studio partnerships  - our concierge team is at your service.
            </p>
          </AnimatedReveal>
        </div>

        {/* Dual-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Concierge & Atelier Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Concierge Card */}
            <AnimatedReveal delay={0.15} y={20} className="bg-white rounded-[24px] sm:rounded-[28px] md:rounded-[32px] p-5 sm:p-7 md:p-8 border border-[#402E1D]/10 space-y-5 sm:space-y-6">
              <div>
                <AnimatedHeading
                  text="Direct Concierge"
                  as="h3"
                  className="font-display font-bold text-[18px] sm:text-[20px] md:text-[22px] text-[#1E140D] mb-1"
                />
                <AnimatedReveal delay={0.12} y={12}>
                  <p className="font-sans text-[12.5px] sm:text-[13px] text-[#402E1D]/70 font-medium leading-relaxed">
                    Reach out directly for personalized guidance and meditation seat inquiries.
                  </p>
                </AnimatedReveal>
              </div>

              <div className="space-y-3 sm:space-y-4 font-sans text-[13px] sm:text-[13.5px]">
                {/* Email Channel - Single Direct Email from Policy Pages */}
                <div className="flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#EFECE5]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white flex items-center justify-center text-[#876540] shrink-0">
                    <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#1E140D] text-[12.5px] sm:text-[13px]">
                      Email Concierge
                    </div>
                    <a 
                      href="mailto:theedivinelotuss@gmail.com"
                      className="text-[#876540] hover:text-[#1E140D] font-medium transition-colors break-all block"
                    >
                      theedivinelotuss@gmail.com
                    </a>
                    <div className="text-[11px] sm:text-[11.5px] text-[#402E1D]/60 mt-0.5">
                      Response within 24 hours
                    </div>
                  </div>
                </div>

                {/* Brand & Official Website from Policy Pages */}
                <div className="flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#EFECE5]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white flex items-center justify-center text-[#876540] shrink-0">
                    <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#1E140D] text-[12.5px] sm:text-[13px]">
                      Brand & Official Website
                    </div>
                    <a 
                      href="https://thedivinelotus.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#876540] hover:text-[#1E140D] font-medium transition-colors break-all block"
                    >
                      thedivinelotus.org
                    </a>
                    <div className="text-[11px] sm:text-[11.5px] text-[#402E1D]/60 mt-0.5">
                      Divine Lotus Official Domain
                    </div>
                  </div>
                </div>

                {/* Hours & Availability from Policy Pages */}
                <div className="flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#EFECE5]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white flex items-center justify-center text-[#876540] shrink-0">
                    <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#1E140D] text-[12.5px] sm:text-[13px]">
                      Support Hours
                    </div>
                    <div className="text-[#402E1D]/80 font-medium text-[12.5px] sm:text-[13.5px]">
                      Monday – Friday: 9:00 AM – 6:00 PM
                    </div>
                    <div className="text-[11px] sm:text-[11.5px] text-[#402E1D]/60 mt-0.5">
                      Weekend inquiries attended to on next business day
                    </div>
                  </div>
                </div>

                {/* Shipping & Delivery from Policy Pages */}
                <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#EFECE5]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white flex items-center justify-center text-[#876540] shrink-0">
                    <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#1E140D] text-[12.5px] sm:text-[13px]">
                      Shipping & Delivery
                    </div>
                    <div className="text-[#402E1D]/80 font-medium text-[12.5px] sm:text-[13.5px]">
                      India & International Shipping
                    </div>
                    <div className="text-[11px] sm:text-[11.5px] text-[#402E1D]/60 mt-0.5">
                      Dispatched with courier tracking worldwide
                    </div>
                  </div>
                </div>

              </div>
            </AnimatedReveal>

          </div>

          {/* Right Column: Luxury Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatedReveal delay={0.18} y={24} className="bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[36px] p-5 sm:p-8 md:p-10 lg:p-12 border border-[#402E1D]/10">
              
              {isSubmitted ? (
                <div className="py-12 sm:py-16 text-center space-y-4 animate-in fade-in duration-300 font-sans">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#876540]/10 text-[#876540] flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
                  </div>
                  <h3 className="font-display font-bold text-[22px] sm:text-[26px] md:text-[28px] text-[#1E140D]">
                    Message Received
                  </h3>
                  <p className="font-sans font-medium text-[13.5px] sm:text-[14.5px] text-[#402E1D]/75 max-w-[440px] mx-auto leading-relaxed px-2">
                    Thank you, <span className="font-semibold text-[#1E140D]">{name}</span>. A concierge specialist has received your inquiry and will respond to <span className="font-semibold text-[#1E140D]">{email}</span> within 24 hours.
                  </p>

                  <div className="pt-5">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-7 py-3 rounded-full bg-[#1E140D] hover:bg-[#876540] text-white font-sans text-[12.5px] sm:text-[13px] font-semibold transition-colors cursor-pointer shadow-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 font-sans">
                  <div>
                    <AnimatedHeading
                      text="Send an Inquiry"
                      as="h3"
                      className="font-display font-bold text-[20px] sm:text-[24px] md:text-[26px] text-[#1E140D] mb-1"
                    />
                    <AnimatedReveal delay={0.12} y={12}>
                      <p className="font-sans text-[12.5px] sm:text-[13.5px] text-[#402E1D]/70 font-medium">
                        Fill in your details below. Our concierge team reads and responds to every message carefully.
                      </p>
                    </AnimatedReveal>
                  </div>

                  {/* Contact Input Fields (Clean Borderless Wells with Placeholders) */}
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div className="space-y-1">
                      <input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        onBlur={() => handleBlur("name")}
                        placeholder="Name *"
                        aria-label="Name"
                        aria-invalid={!!fieldErrors.name}
                        className={`w-full px-4 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/55 placeholder:font-medium focus:outline-none transition-all duration-200 ${
                          fieldErrors.name 
                            ? "bg-red-50/40 border border-red-400 focus:ring-2 focus:ring-red-400/40" 
                            : "bg-[#EFECE5] border border-transparent focus:ring-2 focus:ring-[#876540]/30"
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11.5px] text-red-600 font-medium px-2 flex items-center gap-1 animate-in fade-in">
                          <span>•</span> {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <input
                        id="contact-email"
                        name="email"
                        autoComplete="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onBlur={() => handleBlur("email")}
                        placeholder="Email Address *"
                        aria-label="Email Address"
                        aria-invalid={!!fieldErrors.email}
                        className={`w-full px-4 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/55 placeholder:font-medium focus:outline-none transition-all duration-200 ${
                          fieldErrors.email 
                            ? "bg-red-50/40 border border-red-400 focus:ring-2 focus:ring-red-400/40" 
                            : "bg-[#EFECE5] border border-transparent focus:ring-2 focus:ring-[#876540]/30"
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11.5px] text-red-600 font-medium px-2 flex items-center gap-1 animate-in fade-in">
                          <span>•</span> {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone/Mobile (Full Width with Country Code Picker matching Fluent Forms screenshot) */}
                  <div className="space-y-1 relative" ref={countryDropdownRef}>
                    <div className="relative flex items-center">
                      {/* Country Code Pill Button inside the left edge matching Header Notify Me */}
                      <button
                        type="button"
                        onClick={() => setCountryPickerOpen((prev) => !prev)}
                        className="absolute left-2 z-10 h-8 sm:h-9 pl-2.5 pr-2 rounded-xl bg-white text-[#876540] flex items-center gap-1.5 shadow-xs border border-[#402E1D]/10 hover:bg-[#FAF6F0] active:scale-95 transition-all cursor-pointer select-none"
                        title={`Selected: ${selectedCountry.name} (${selectedCountry.dialCode}) - Click to change`}
                      >
                        <span className="text-[14px] leading-none">{selectedCountry.flag}</span>
                        <span className="font-sans font-bold text-[#1E140D] text-[11.5px] sm:text-[12px] tracking-tight">
                          {selectedCountry.dialCode}
                        </span>
                        <ChevronDown className="w-3 h-3 text-[#876540]" />
                      </button>

                      <input
                        id="contact-phone"
                        name="tel"
                        autoComplete="tel"
                        type="tel"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        placeholder="Mobile Number (Optional)"
                        aria-label="Mobile Number"
                        aria-invalid={!!fieldErrors.phone}
                        className={`w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/55 placeholder:font-medium focus:outline-none transition-all duration-200 pr-4 ${
                          fieldErrors.phone 
                            ? "bg-red-50/40 border border-red-400 focus:ring-2 focus:ring-red-400/40" 
                            : "bg-[#EFECE5] border border-transparent focus:ring-2 focus:ring-[#876540]/30"
                        }`}
                        style={{
                          paddingLeft:
                            selectedCountry.dialCode.length <= 2
                              ? "98px"
                              : selectedCountry.dialCode.length === 3
                                ? "110px"
                                : selectedCountry.dialCode.length === 4
                                  ? "120px"
                                  : "130px",
                        }}
                      />
                    </div>

                    {/* Dropdown Floating Panel */}
                    {countryPickerOpen && (
                      <div className="absolute top-full left-0 mt-1.5 w-full max-w-[320px] bg-white rounded-2xl shadow-xl border border-[#402E1D]/15 p-3 z-50 animate-in fade-in zoom-in-95 duration-150 font-sans">
                        <div className="flex items-center justify-between pb-2 border-b border-[#402E1D]/10 mb-2">
                          <span className="text-[12px] font-bold text-[#1E140D]">Select Country</span>
                          <button
                            type="button"
                            onClick={() => setCountryPickerOpen(false)}
                            className="text-[#402E1D]/60 hover:text-[#1E140D] p-1 rounded-full hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                            aria-label="Close country picker"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Live Country Search */}
                        <div className="relative mb-2">
                          <Search className="w-3.5 h-3.5 text-[#876540] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Search country or code..."
                            className="w-full bg-[#EFECE5] focus:bg-[#EAE5DC] text-[#1E140D] placeholder-[#402E1D]/50 text-[12px] pl-8.5 pr-3 py-2 rounded-xl border-0 focus:outline-none transition-all"
                            autoFocus
                          />
                        </div>

                        {/* Country List */}
                        <div className="overflow-y-auto max-h-[190px] space-y-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                          {filteredCountries.map((c) => {
                            const isSelected = selectedCountry.code === c.code;
                            return (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                  userSelectedCountryRef.current = true;
                                  setSelectedCountry(c);
                                  setCountryPickerOpen(false);
                                  setCountrySearch("");
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12px] text-left transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#876540] text-white font-bold shadow-xs"
                                    : "text-[#1E140D] hover:bg-[#EFECE5]"
                                }`}
                              >
                                <span className="flex items-center gap-2 truncate">
                                  <span className="text-[14px] leading-none">{c.flag}</span>
                                  <span className="truncate">{c.name}</span>
                                </span>
                                <span
                                  className={`font-mono text-[11.5px] ml-2 shrink-0 ${
                                    isSelected ? "text-white/90" : "text-[#876540] font-semibold"
                                  }`}
                                >
                                  {c.dialCode}
                                </span>
                              </button>
                            );
                          })}
                          {filteredCountries.length === 0 && (
                            <p className="text-[12px] text-[#402E1D]/60 text-center py-3">
                              No matching country found
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {fieldErrors.phone && (
                      <p className="text-[11.5px] text-red-600 font-medium px-2 flex items-center gap-1 animate-in fade-in">
                        <span>•</span> {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-1">
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => handleMessageChange(e.target.value)}
                      onBlur={() => handleBlur("message")}
                      placeholder="Your Message * (Describe how our concierge can assist you...)"
                      aria-label="Your Message"
                      aria-invalid={!!fieldErrors.message}
                      className={`w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/55 placeholder:font-medium focus:outline-none min-h-[120px] sm:min-h-[140px] resize-y leading-relaxed transition-all duration-200 ${
                        fieldErrors.message 
                          ? "bg-red-50/40 border border-red-400 focus:ring-2 focus:ring-red-400/40" 
                          : "bg-[#EFECE5] border border-transparent focus:ring-2 focus:ring-[#876540]/30"
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="text-[11.5px] text-red-600 font-medium px-2 flex items-center gap-1 animate-in fade-in">
                        <span>•</span> {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-xl py-2 px-3 text-center font-medium animate-in fade-in">
                      {submitError}
                    </p>
                  )}

                  {/* 4. Signature Fused Pill Submit Button */}
                  <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-sans text-[11px] sm:text-[11.5px] text-[#402E1D]/60 leading-tight text-center sm:text-left order-2 sm:order-1">
                      By submitting, you agree to our privacy policy. We respect your privacy.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer font-sans shrink-0 order-1 sm:order-2 disabled:opacity-80"
                    >
                      <svg
                        className="w-[200px] sm:w-[214px] h-[48px] sm:h-[50px]"
                        viewBox="0 0 214 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient id="btn-contact-fill" x1="0" y1="0" x2="214" y2="48" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#FAF7F2" />
                            <stop offset="50%" stopColor="#F3EFE8" />
                            <stop offset="100%" stopColor="#FAF7F2" />
                          </linearGradient>
                          <linearGradient id="btn-contact-border" x1="0" y1="0" x2="214" y2="48" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
                            <stop offset="50%" stopColor="rgba(135, 101, 64, 0.5)" />
                            <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
                          </linearGradient>
                        </defs>

                        <path
                          d="M 24 0 L 151 0 C 158 0 163 7 168 7 C 173 7 178 0 190 0 A 24 24 0 1 1 190 48 C 178 48 173 41 168 41 C 163 41 158 48 151 48 L 24 48 A 24 24 0 0 1 24 0 Z"
                          fill="url(#btn-contact-fill)"
                          stroke="url(#btn-contact-border)"
                          strokeWidth="1.4"
                        />
                      </svg>

                      <div className="absolute left-0 top-0 bottom-0 w-[152px] sm:w-[164px] flex items-center justify-center pointer-events-none px-3 font-sans">
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#876540]" />
                            <span className="font-sans text-[12px] sm:text-[12.5px] font-bold tracking-[0.01em] text-[#1E140D] whitespace-nowrap">
                              Sending...
                            </span>
                          </div>
                        ) : (
                          <span className="font-sans text-[12px] sm:text-[12.5px] font-bold tracking-[0.01em] text-[#1E140D] whitespace-nowrap">
                            Send Message
                          </span>
                        )}
                      </div>

                      <div className="absolute right-[4px] top-[4px] w-[40px] h-[40px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300 shadow-sm">
                        <ArrowUpRight className="w-[17px] h-[17px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </button>
                  </div>

                </form>
              )}
            </AnimatedReveal>
          </div>

        </div>

      </div>

      {/* Footer Integration */}
      <Footer />
    </main>
  );
}
