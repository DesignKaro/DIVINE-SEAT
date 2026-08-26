"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowUpRight, 
  Mail, 
  Clock, 
  MapPin, 
  Palette, 
  Check
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setOrderNumber("");
    setMessage("");
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
          <span className="font-sans text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.18em] uppercase text-[#876540] block mb-2.5 sm:mb-3">
            /GET IN TOUCH
          </span>
          <h1 className="font-display font-bold text-[28px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.14] text-[#1E140D] tracking-tight mb-3.5 sm:mb-5">
            We’re here to help you settle into stillness.
          </h1>
          <p className="font-sans text-[14px] sm:text-[15.5px] md:text-[16.5px] leading-[1.65] text-[#402E1D]/80">
            Whether you have questions regarding ergonomics, custom sizing & bespoke palettes, order assistance, or studio partnerships—our concierge team is at your service.
          </p>
        </div>

        {/* Dual-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Concierge & Atelier Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Concierge Card */}
            <div className="bg-white rounded-[24px] sm:rounded-[28px] md:rounded-[32px] p-5 sm:p-7 md:p-8 border border-[#402E1D]/10 space-y-5 sm:space-y-6">
              <div>
                <h3 className="font-display font-bold text-[18px] sm:text-[20px] md:text-[22px] text-[#1E140D] mb-1">
                  Direct Concierge
                </h3>
                <p className="font-sans text-[12.5px] sm:text-[13px] text-[#402E1D]/70 font-medium leading-relaxed">
                  Reach out directly for personalized guidance and meditation seat inquiries.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 font-sans text-[13px] sm:text-[13.5px]">
                {/* Email Channel */}
                <div className="flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#EFECE5]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white flex items-center justify-center text-[#876540] shrink-0">
                    <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#1E140D] text-[12.5px] sm:text-[13px]">
                      Email Concierge
                    </div>
                    <a 
                      href="mailto:concierge@divinelotus.com"
                      className="text-[#876540] hover:text-[#1E140D] font-medium transition-colors break-all block"
                    >
                      concierge@divinelotus.com
                    </a>
                    <div className="text-[11px] sm:text-[11.5px] text-[#402E1D]/60 mt-0.5">
                      Response within 24 hours
                    </div>
                  </div>
                </div>

                {/* Bespoke & Studio Channel */}
                <div className="flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#EFECE5]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white flex items-center justify-center text-[#876540] shrink-0">
                    <Palette className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#1E140D] text-[12.5px] sm:text-[13px]">
                      Bespoke Atelier & Studios
                    </div>
                    <a 
                      href="mailto:custom@divinelotus.com"
                      className="text-[#876540] hover:text-[#1E140D] font-medium transition-colors break-all block"
                    >
                      custom@divinelotus.com
                    </a>
                    <div className="text-[11px] sm:text-[11.5px] text-[#402E1D]/60 mt-0.5">
                      Custom palettes & studio bulk orders
                    </div>
                  </div>
                </div>

                {/* Hours & Availability */}
                <div className="flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#EFECE5]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white flex items-center justify-center text-[#876540] shrink-0">
                    <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#1E140D] text-[12.5px] sm:text-[13px]">
                      Concierge Hours
                    </div>
                    <div className="text-[#402E1D]/80 font-medium text-[12.5px] sm:text-[13.5px]">
                      Monday – Friday: 9:00 AM – 6:00 PM CET
                    </div>
                    <div className="text-[11px] sm:text-[11.5px] text-[#402E1D]/60 mt-0.5">
                      Weekend inquiries attended to on Monday morning
                    </div>
                  </div>
                </div>

                {/* Atelier Location */}
                <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#EFECE5]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white flex items-center justify-center text-[#876540] shrink-0">
                    <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#1E140D] text-[12.5px] sm:text-[13px]">
                      Design Studio & Atelier
                    </div>
                    <div className="text-[#402E1D]/80 font-medium text-[12.5px] sm:text-[13.5px]">
                      Milan, Italy & Zurich, Switzerland
                    </div>
                    <div className="text-[11px] sm:text-[11.5px] text-[#402E1D]/60 mt-0.5">
                      Global expedited shipping worldwide
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Luxury Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[36px] p-5 sm:p-8 md:p-10 lg:p-12 border border-[#402E1D]/10">
              
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
                    <h3 className="font-display font-bold text-[20px] sm:text-[24px] md:text-[26px] text-[#1E140D] mb-1">
                      Send an Inquiry
                    </h3>
                    <p className="font-sans text-[12.5px] sm:text-[13.5px] text-[#402E1D]/70 font-medium">
                      Fill in your details below. Our concierge team reads and responds to every message carefully.
                    </p>
                  </div>

                  {/* Contact Input Fields (Clean Borderless Wells with Placeholders) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name *"
                      aria-label="Your Name"
                      className="w-full px-4 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#EFECE5] border-0 font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/55 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#876540]/30"
                    />

                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address *"
                      aria-label="Email Address"
                      className="w-full px-4 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#EFECE5] border-0 font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/55 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#876540]/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone / WhatsApp (Optional)"
                      aria-label="Phone Number"
                      className="w-full px-4 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#EFECE5] border-0 font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/55 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#876540]/30"
                    />

                    <input
                      id="contact-order"
                      type="text"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="Order Number (Optional)"
                      aria-label="Order Number"
                      className="w-full px-4 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#EFECE5] border-0 font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/55 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#876540]/30"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message * (Describe how our concierge can assist you...)"
                      aria-label="Your Message"
                      className="w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#EFECE5] border-0 font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/55 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#876540]/30 min-h-[120px] sm:min-h-[140px] resize-y leading-relaxed"
                    />
                  </div>

                  {/* 4. Signature Fused Pill Submit Button */}
                  <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-sans text-[11px] sm:text-[11.5px] text-[#402E1D]/60 leading-tight text-center sm:text-left order-2 sm:order-1">
                      By submitting, you agree to our privacy policy. We respect your privacy.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer font-sans shrink-0 order-1 sm:order-2"
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
                        <span className="font-sans text-[12px] sm:text-[12.5px] font-bold tracking-[0.01em] text-[#1E140D] whitespace-nowrap">
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </span>
                      </div>

                      <div className="absolute right-[4px] top-[4px] w-[40px] h-[40px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300 shadow-sm">
                        <ArrowUpRight className="w-[17px] h-[17px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Footer Integration */}
      <Footer />
    </main>
  );
}
