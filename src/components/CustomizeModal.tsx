"use client";

import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  X, 
  Upload, 
  Check, 
  Image as ImageIcon, 
  Trash2,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Plus,
  Palette,
  PenTool,
  ShoppingBag
} from "lucide-react";
import { validateName, validateEmail, validatePhone } from "@/lib/validation";

export interface ColorPair {
  id: string;
  name: string;
  upperColor: string;
  baseColor: string;
}

export const PREBUILT_COLOR_PAIRS: ColorPair[] = [
  {
    id: "slate-mist",
    name: "Slate Mist",
    upperColor: "#ECE7DE",
    baseColor: "#767D85",
  },
  {
    id: "terracotta-rose",
    name: "Terracotta Rose",
    upperColor: "#ECE7DE",
    baseColor: "#B56764",
  },
  {
    id: "ochre-gold",
    name: "Ochre Gold",
    upperColor: "#ECE7DE",
    baseColor: "#CBB18D",
  },
  {
    id: "warm-taupe",
    name: "Warm Taupe",
    upperColor: "#ECE7DE",
    baseColor: "#B28C73",
  },
  {
    id: "sapphire",
    name: "Sapphire",
    upperColor: "#ECE7DE",
    baseColor: "#72B0AB",
  },
  {
    id: "pistachio",
    name: "Pistachio",
    upperColor: "#ECE7DE",
    baseColor: "#B89D47",
  },
];

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomizeModal({ isOpen, onClose }: CustomizeModalProps) {
  // Step state (1: Palette, 2: Uploads & Notes, 3: Contact & Review)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [paletteMode, setPaletteMode] = useState<"prebuilt" | "custom">("prebuilt");
  const [selectedPrebuiltId, setSelectedPrebuiltId] = useState<string>("slate-mist");
  const [hoveredPairId, setHoveredPairId] = useState<string | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Custom Colors
  const [customUpper, setCustomUpper] = useState<string>("#ECE7DE");
  const [customBase, setCustomBase] = useState<string>("#876540");

  // File Uploads
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [colorRefFile, setColorRefFile] = useState<File | null>(null);
  const [colorRefPreview, setColorRefPreview] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const iconInputRef = useRef<HTMLInputElement>(null);
  const colorRefInputRef = useRef<HTMLInputElement>(null);

  const selectedPrebuilt = PREBUILT_COLOR_PAIRS.find(p => p.id === selectedPrebuiltId) || PREBUILT_COLOR_PAIRS[0];

  const activeUpper = paletteMode === "prebuilt" ? selectedPrebuilt.upperColor : customUpper;
  const activeBase = paletteMode === "prebuilt" ? selectedPrebuilt.baseColor : customBase;
  const activePaletteName = paletteMode === "prebuilt" ? selectedPrebuilt.name : "Custom Blend";

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIconFile(file);
      const url = URL.createObjectURL(file);
      setIconPreview(url);
    }
  };

  const handleColorRefChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setColorRefFile(file);
      const url = URL.createObjectURL(file);
      setColorRefPreview(url);
    }
  };

  const handleRemoveIcon = () => {
    setIconFile(null);
    if (iconPreview) URL.revokeObjectURL(iconPreview);
    setIconPreview(null);
    if (iconInputRef.current) iconInputRef.current.value = "";
  };

  const handleRemoveColorRef = () => {
    setColorRefFile(null);
    if (colorRefPreview) URL.revokeObjectURL(colorRefPreview);
    setColorRefPreview(null);
    if (colorRefInputRef.current) colorRefInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameCheck = validateName(name);
    const emailCheck = validateEmail(email);
    const phoneCheck = validatePhone(phone, false);

    const errors: { name?: string; email?: string; phone?: string } = {};
    if (!nameCheck.isValid) errors.name = nameCheck.error;
    if (!emailCheck.isValid) errors.email = emailCheck.error;
    if (!phoneCheck.isValid) errors.phone = phoneCheck.error;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setCurrentStep(1);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 xs:p-3.5 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Minimal Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-[#1E140D]/45 backdrop-blur-md transition-opacity"
        />

        {/* Spacious, Elevated Modal Window with Breathing Space */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[680px] sm:max-w-[730px] lg:max-w-[760px] bg-white text-[#402E1D] rounded-[22px] sm:rounded-[36px] border border-[#402E1D]/10 overflow-hidden z-10 my-auto flex flex-col max-h-[94vh]"
        >
          {/* Header with Responsive Padding */}
          <div className="px-4 xs:px-5 sm:px-8 lg:px-9 pt-4 xs:pt-5 sm:pt-8 pb-2.5 sm:pb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-[18px] xs:text-[20px] sm:text-[26px] text-[#1E140D] tracking-tight">
                The Lotus Seat  - Custom
              </h2>
            </div>

            <button
              onClick={handleResetAndClose}
              aria-label="Close modal"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-[#402E1D]/8 text-[#402E1D]/70 hover:text-[#1E140D] flex items-center justify-center transition-colors cursor-pointer -mr-1 sm:-mr-2 shrink-0"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
            </button>
          </div>

          {/* Borderless Minimal Atelier Tab Navigation (Full Width) */}
          {!isSuccess && (
            <div className="px-4 xs:px-5 sm:px-8 lg:px-9 pb-2.5 sm:pb-4">
              <div className="w-full grid grid-cols-3 gap-1 sm:gap-1.5 bg-[#F5F2EC] p-1 sm:p-1.5 rounded-full select-none font-sans">
                {[
                  { step: 1, label: "Color Palette", shortLabel: "Palette", icon: Palette },
                  { step: 2, label: "Notes & Details", shortLabel: "Details", icon: PenTool },
                  { step: 3, label: "Review & Order", shortLabel: "Review", icon: ShoppingBag },
                ].map((item) => {
                  const isActive = currentStep === item.step;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => setCurrentStep(item.step as 1 | 2 | 3)}
                      className={`relative w-full h-8 sm:h-8.5 rounded-full transition-all duration-200 ease-out flex items-center justify-center gap-1.5 sm:gap-2 px-1.5 sm:px-3.5 cursor-pointer select-none border-0 outline-none ${
                        isActive
                          ? "bg-white text-[#1E140D]"
                          : "bg-transparent text-[#402E1D]/55 hover:text-[#1E140D] hover:bg-white/40"
                      }`}
                    >
                      {/* Tab Icon */}
                      <Icon 
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isActive ? "text-[#1E140D] stroke-[2.3]" : "text-[#402E1D]/60"
                        }`} 
                      />

                      {/* Label Text for All Tabs */}
                      <span className={`font-sans text-[11px] xs:text-[11.5px] sm:text-[12px] leading-none whitespace-nowrap ${
                        isActive ? "font-bold text-[#1E140D]" : "font-semibold"
                      }`}>
                        <span className="sm:hidden">{item.shortLabel}</span>
                        <span className="hidden sm:inline">{item.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Modal Body with Generous Responsive Padding */}
          <div className="overflow-y-auto px-4 xs:px-5 sm:px-8 lg:px-9 pt-1 pb-5 sm:pb-8 flex-1 font-sans">
            {isSuccess ? (
              <div className="py-12 sm:py-14 text-center space-y-4 animate-in fade-in duration-300 font-sans">
                <div className="w-14 h-14 rounded-full bg-[#876540]/10 text-[#876540] flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="font-sans font-bold text-[22px] sm:text-[24px] text-[#1E140D]">
                  Customization Submitted
                </h3>
                <p className="font-sans font-medium text-[14px] sm:text-[15px] text-[#402E1D]/75 max-w-[420px] mx-auto leading-relaxed">
                  Thank you, {name}. We will prepare a 3D digital proof of your {activePaletteName} palette and email you at <span className="font-semibold text-[#1E140D]">{email}</span> within 24 hours.
                </p>

                <div className="pt-6">
                  <button
                    onClick={handleResetAndClose}
                    className="px-8 py-3 rounded-full bg-[#1E140D] hover:bg-[#876540] text-white font-sans text-[13px] font-semibold transition-colors cursor-pointer shadow-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="font-sans">
                
                {/* STEP 1: COLOR PALETTE */}
                {currentStep === 1 && (
                  <div className="space-y-3.5 sm:space-y-4.5 animate-in fade-in duration-200 relative">
                    
                    {/* PREBUILT COLORS SECTION (Responsive flex col on mobile, row on tablet/desktop) */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 sm:gap-5">
                      
                      {/* Left: Prebuilt Colors Title & Swatches */}
                      <div className="flex-1 flex flex-col justify-between space-y-2 sm:space-y-2.5 min-w-0">
                        <div>
                          <h4 className="font-sans text-[13.5px] sm:text-[14.5px] font-bold text-[#1E140D]">
                            Prebuilt Colors
                          </h4>
                          <p className="font-sans text-[11.5px] sm:text-[12.5px] text-[#402E1D]/65 font-medium mt-0.5">
                            Choose from our 6 signature base finishes (with natural cream top), or create your custom colors below.
                          </p>
                        </div>

                        {/* 6 Signature Dual-Tone Swatches: Strictly 3 Columns a Row with Premium Tactile 3D Capsule Styling */}
                        <div className="pt-1">
                          <div className="grid grid-cols-3 gap-2.5 xs:gap-3 sm:gap-3.5 max-w-[320px] xs:max-w-[340px] sm:max-w-[360px]">
                            {PREBUILT_COLOR_PAIRS.map((pair) => {
                              const isSelected = paletteMode === "prebuilt" && selectedPrebuiltId === pair.id;

                              return (
                                <button
                                  key={pair.id}
                                  type="button"
                                  onMouseEnter={() => setHoveredPairId(pair.id)}
                                  onMouseLeave={() => setHoveredPairId(null)}
                                  onClick={() => {
                                    setSelectedPrebuiltId(pair.id);
                                    setPaletteMode("prebuilt");
                                  }}
                                  title={`${pair.name}: Natural Cream + ${pair.name}`}
                                  aria-label={pair.name}
                                  className="group relative flex flex-col items-center cursor-pointer p-0 border-0 outline-none select-none text-center"
                                >
                                  {/* Minimal Architectural Dual-Tone Swatch Tile (Left: Natural Cream + Right: Signature Color) */}
                                  <div className={`w-full h-[38px] xs:h-[42px] sm:h-[44px] rounded-[12px] xs:rounded-[14px] overflow-hidden relative flex flex-row transition-all duration-250 ${
                                    isSelected
                                      ? "ring-[2.5px] ring-[#73512E] ring-offset-[2px] ring-offset-[#FAF6EE] shadow-[0_4px_14px_rgba(115,81,46,0.22)] scale-[1.03]"
                                      : "border border-[#402E1D]/14 shadow-[0_2px_6px_rgba(40,20,10,0.05)] hover:border-[#73512E]/40 hover:shadow-[0_4px_12px_rgba(40,20,10,0.10)] hover:-translate-y-0.5"
                                  }`}>
                                    {/* Left 50%: Upper Cushion Cover Color (Natural Cream) */}
                                    <div
                                      className="w-1/2 h-full relative border-r border-black/[0.08]"
                                      style={{ backgroundColor: pair.upperColor }}
                                    />
                                    {/* Right 50%: Foundation Base Color */}
                                    <div
                                      className="w-1/2 h-full relative"
                                      style={{ backgroundColor: pair.baseColor }}
                                    />

                                    {/* Subtle Inset Matte Framing Border */}
                                    <div className="absolute inset-0 pointer-events-none rounded-[12px] xs:rounded-[14px] ring-1 ring-inset ring-black/5" />
                                  </div>

                                  {/* Minimal Typography Color Label Underneath */}
                                  <span className={`font-sans text-[11px] xs:text-[11.5px] sm:text-[12px] tracking-tight mt-1.5 transition-colors duration-200 truncate max-w-full text-center block ${
                                    isSelected ? "text-[#1E140D] font-bold" : "text-[#5C452E]/80 font-medium group-hover:text-[#1E140D]"
                                  }`}>
                                    {pair.name}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Right: Custom Color Callout Preview Thumbnail */}
                      <div className="relative shrink-0 self-stretch flex items-center justify-center">
                        <div className="relative w-full md:w-[220px] lg:w-[245px] h-[115px] xs:h-[125px] sm:h-[140px] md:h-full min-h-[98px] sm:min-h-[110px] rounded-2xl overflow-hidden bg-white border border-[#402E1D]/12 p-1.5 flex items-center justify-center">
                          <Image
                            src="/images/custom-color-preview.avif"
                            alt="Custom Color Seat Preview"
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 245px"
                            className="object-contain p-1 select-none pointer-events-none"
                          />
                        </div>
                      </div>

                    </div>

                    {/* CUSTOM COLORS SECTION (Full Width of Modal Window) */}
                    <div className="pt-2 sm:pt-2.5 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 mb-2">
                        <h4 className="font-sans text-[12.5px] sm:text-[13px] font-bold text-[#1E140D]">
                          Or Create Custom Colors
                        </h4>
                        <span className="font-sans text-[10.5px] sm:text-[11px] text-[#402E1D]/55 font-medium">
                          Optional: Upload reference photo
                        </span>
                      </div>

                      {/* Responsive Custom Controls Row */}
                      <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap w-full">
                        
                        {/* 1. Top Color Selector */}
                        <label
                          onClick={() => setPaletteMode("custom")}
                          className={`group relative h-9 sm:h-9.5 rounded-[11px] xs:rounded-[12px] transition-all duration-200 flex items-center gap-1.5 p-1 cursor-pointer select-none shrink-0 ${
                            paletteMode === "custom"
                              ? "bg-[#EFECE5] text-[#1E140D] pr-2.5 sm:pr-3 border border-[#73512E]"
                              : "bg-[#EFECE5]/60 hover:bg-[#EFECE5] text-[#1E140D] pr-2 sm:pr-2.5 border border-[#402E1D]/15"
                          }`}
                        >
                          <div 
                            className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-[7px] xs:rounded-[8px] overflow-hidden shrink-0 relative transition-transform duration-300 group-hover:scale-105 border border-black/10"
                            style={{ backgroundColor: customUpper }}
                          >
                            <input
                              type="color"
                              value={customUpper}
                              onChange={(e) => {
                                setCustomUpper(e.target.value);
                                setPaletteMode("custom");
                              }}
                              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                            />
                          </div>
                          <div className="whitespace-nowrap flex items-center gap-1">
                            <span className="font-sans text-[11px] sm:text-[12px] font-semibold text-[#1E140D]">
                              Top:
                            </span>
                            <span className="font-mono text-[10px] sm:text-[11px] uppercase font-semibold text-[#876540]">
                              {customUpper}
                            </span>
                          </div>
                        </label>

                        {/* 2. Base Color Selector */}
                        <label
                          onClick={() => setPaletteMode("custom")}
                          className={`group relative h-9 sm:h-9.5 rounded-[11px] xs:rounded-[12px] transition-all duration-200 flex items-center gap-1.5 p-1 cursor-pointer select-none shrink-0 ${
                            paletteMode === "custom"
                              ? "bg-[#EFECE5] text-[#1E140D] pr-2.5 sm:pr-3 border border-[#73512E]"
                              : "bg-[#EFECE5]/60 hover:bg-[#EFECE5] text-[#1E140D] pr-2 sm:pr-2.5 border border-[#402E1D]/15"
                          }`}
                        >
                          <div 
                            className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-[7px] xs:rounded-[8px] overflow-hidden shrink-0 relative transition-transform duration-300 group-hover:scale-105 border border-black/10"
                            style={{ backgroundColor: customBase }}
                          >
                            <input
                              type="color"
                              value={customBase}
                              onChange={(e) => {
                                setCustomBase(e.target.value);
                                setPaletteMode("custom");
                              }}
                              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                            />
                          </div>
                          <div className="whitespace-nowrap flex items-center gap-1">
                            <span className="font-sans text-[11px] sm:text-[12px] font-semibold text-[#1E140D]">
                              Base:
                            </span>
                            <span className="font-mono text-[10px] sm:text-[11px] uppercase font-semibold text-[#876540]">
                              {customBase}
                            </span>
                          </div>
                        </label>

                        {/* 3. Custom Color Pair Result (Minimal Architectural Tile matching swatches above) */}
                        <button
                          type="button"
                          onClick={() => setPaletteMode("custom")}
                          title="Custom Color Pair"
                          aria-label="Custom Color Pair"
                          className="group relative cursor-pointer p-0 border-0 outline-none select-none flex items-center justify-center shrink-0"
                        >
                          {/* Minimal Architectural Dual-Tone Swatch Tile (Left: Top Color + Right: Base Color) */}
                          <div className={`w-[60px] xs:w-[68px] sm:w-[76px] h-[34px] xs:h-[36px] sm:h-[38px] rounded-[11px] xs:rounded-[12px] overflow-hidden shrink-0 relative flex flex-row transition-all duration-250 ${
                            paletteMode === "custom"
                              ? "ring-[2.5px] ring-[#73512E] ring-offset-[2px] ring-offset-[#FAF6EE] shadow-[0_4px_14px_rgba(115,81,46,0.22)] scale-[1.03]"
                              : "border border-[#402E1D]/14 shadow-[0_2px_6px_rgba(40,20,10,0.05)] hover:border-[#73512E]/40 hover:shadow-[0_4px_12px_rgba(40,20,10,0.10)] hover:-translate-y-0.5"
                          }`}>
                            {/* Left 50%: Upper Cushion Cover Color */}
                            <div
                              className="w-1/2 h-full relative border-r border-black/[0.08]"
                              style={{ backgroundColor: customUpper }}
                            />
                            {/* Right 50%: Foundation Base Color */}
                            <div
                              className="w-1/2 h-full relative"
                              style={{ backgroundColor: customBase }}
                            />

                            {/* Subtle Inset Matte Framing Border */}
                            <div className="absolute inset-0 pointer-events-none rounded-[11px] xs:rounded-[12px] ring-1 ring-inset ring-black/5" />
                          </div>
                        </button>

                        {/* 4. Color Reference Image Upload - Full Width on Mobile, Flexible on Desktop */}
                        <div className="relative flex-1 min-w-[130px] w-full sm:w-auto">
                          <input
                            ref={colorRefInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleColorRefChange}
                            className="hidden"
                          />
                          {colorRefPreview ? (
                            <div className="h-9 sm:h-9.5 w-full rounded-[11px] xs:rounded-[12px] bg-[#FAF7F2] pl-2 pr-3 flex items-center justify-between gap-2 border border-[#876540]/30">
                              <div className="flex items-center gap-2 min-w-0 truncate">
                                <div className="w-6 h-6 rounded-[6px] overflow-hidden shrink-0 border border-[#876540]/20">
                                  <img src={colorRefPreview} alt="Custom color reference" className="w-full h-full object-cover" />
                                </div>
                                <span className="font-sans text-[11.5px] sm:text-[12px] font-semibold text-[#1E140D] truncate">
                                  {colorRefFile?.name || "Photo Reference"}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={handleRemoveColorRef}
                                aria-label="Remove image"
                                className="w-5 h-5 rounded-full hover:bg-black/10 text-[#876540] hover:text-[#1E140D] flex items-center justify-center cursor-pointer transition-colors shrink-0"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => colorRefInputRef.current?.click()}
                              className="h-9 sm:h-9.5 w-full rounded-[11px] xs:rounded-[12px] bg-[#FAF7F2] hover:bg-[#F3EFE8] text-[#876540] hover:text-[#1E140D] px-3 sm:px-4 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border border-dashed border-[#876540]/40 hover:border-[#876540]"
                            >
                              <Upload className="w-3.5 h-3.5 shrink-0 text-[#876540]" />
                              <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold whitespace-nowrap truncate">
                                Upload Color Image
                              </span>
                            </button>
                          )}
                        </div>

                      </div>
                    </div>

                    {/* Step 1 Continue Button (Signature Fused Pill Design) */}
                    <div className="pt-2 sm:pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer font-sans"
                      >
                        <svg
                          className="w-[218px] sm:w-[232px] h-[44px] sm:h-[46px] overflow-visible"
                          viewBox="0 0 236 46"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient id="btn-step1-custom-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#FAF7F2" />
                              <stop offset="50%" stopColor="#F3EFE8" />
                              <stop offset="100%" stopColor="#FAF7F2" />
                            </linearGradient>
                            <linearGradient id="btn-step1-custom-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
                              <stop offset="50%" stopColor="rgba(135, 101, 64, 0.5)" />
                              <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
                            </linearGradient>
                          </defs>

                          <path
                            d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                            fill="url(#btn-step1-custom-fill)"
                            stroke="url(#btn-step1-custom-border)"
                            strokeWidth="1.4"
                          />
                        </svg>

                        <div className="absolute left-0 top-0 bottom-0 w-[170px] sm:w-[182px] flex items-center justify-center pointer-events-none px-3 font-sans">
                          <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.01em] text-[#1E140D] whitespace-nowrap">
                            Next: Notes & Files
                          </span>
                        </div>

                        <div className="absolute right-[4px] top-[4px] w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300 shadow-sm">
                          <ArrowRight className="w-[15px] h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: UPLOADS & NOTES */}
                {currentStep === 2 && (
                  <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
                    {/* 2-Column Hero Area: Left controls & Right Cushion Image */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-5">
                      {/* Left: Title, Description & Logo Upload */}
                      <div className="flex-1 w-full space-y-2.5 sm:space-y-3 min-w-0">
                        <div>
                          <h4 className="font-sans text-[14px] sm:text-[15px] font-bold text-[#1E140D]">
                            Uploads & Custom Requests
                          </h4>
                          <p className="font-sans text-[11.5px] sm:text-[12px] text-[#402E1D]/65 font-medium mt-0.5 whitespace-nowrap truncate">
                            Attach embroidery artwork or custom styling preferences.
                          </p>
                        </div>

                        {/* Minimal Upload Logo Pill */}
                        <div>
                          <input
                            ref={iconInputRef}
                            type="file"
                            accept="image/*,.svg"
                            onChange={handleIconChange}
                            className="hidden"
                          />
                          {iconPreview ? (
                            <div className="h-10 sm:h-11 rounded-full bg-[#FAF7F2] pl-2.5 pr-3.5 flex items-center justify-between gap-2 border border-[#876540]/30 font-sans">
                              <div className="flex items-center gap-2.5 truncate min-w-0">
                                <div className="w-6.5 h-6.5 rounded-full overflow-hidden shrink-0 border border-[#876540]/20 flex items-center justify-center bg-white">
                                  <img src={iconPreview} alt="Logo on cushion" className="w-4.5 h-4.5 object-contain" />
                                </div>
                                <span className="font-sans text-[12px] text-[#1E140D] font-semibold truncate">
                                  {iconFile?.name || "Logo on cushion attached"}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={handleRemoveIcon}
                                aria-label="Remove logo"
                                className="w-5 h-5 rounded-full hover:bg-black/10 text-[#876540] hover:text-[#1E140D] flex items-center justify-center cursor-pointer transition-colors shrink-0"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => iconInputRef.current?.click()}
                              className="w-full h-10 sm:h-11 rounded-full bg-[#FAF7F2] hover:bg-[#F3EFE8] text-[#876540] hover:text-[#1E140D] px-4 border border-dashed border-[#876540]/40 hover:border-[#876540] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-sans"
                            >
                              <Upload className="w-4 h-4 shrink-0 text-[#876540]" />
                              <span className="font-sans text-[11.5px] sm:text-[12px] font-semibold whitespace-nowrap">
                                Upload your logo on cushion
                              </span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right: Cushion Embroidery Preview Image (Matches Content Height) */}
                      <div className="shrink-0 flex items-center justify-center self-center">
                        <div className="w-[140px] sm:w-[160px] h-[95px] sm:h-[110px] rounded-2xl overflow-hidden relative shadow-xs">
                          <img
                            src="/images/materials/custom-embroidery-cushion.avif"
                            alt="Cushion embroidery detail"
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Refined Minimal Notes Textarea */}
                    <div>
                      <label htmlFor="custom-notes" className="block font-sans text-[12.5px] sm:text-[13px] font-bold text-[#1E140D] mb-1.5">
                        Notes <span className="text-[#402E1D]/55 font-normal text-[11px]">(optional)</span>
                      </label>
                      <textarea
                        id="custom-notes"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Specific requests, embroidery placement, or room palette details..."
                        className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF7F2] border border-[#402E1D]/15 focus:border-[#876540]/50 font-sans text-[12.5px] sm:text-[13px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/45 placeholder:font-normal focus:outline-none min-h-[80px] sm:min-h-[95px] resize-y leading-relaxed transition-colors"
                      />
                    </div>

                    {/* Step 2 Back & Continue Buttons */}
                    <div className="pt-4 sm:pt-7 flex items-center justify-end sm:justify-between gap-2">
                      {/* Step 2 Back Button (Signature Fused Pill Design - Hidden on Mobile Phones) */}
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="hidden sm:inline-flex group relative items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer font-sans"
                      >
                        <svg
                          className="w-[110px] sm:w-[120px] h-[44px] sm:h-[46px] overflow-visible"
                          viewBox="0 0 120 46"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient id="btn-step2-back-fill" x1="0" y1="0" x2="120" y2="46" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#FAF7F2" />
                              <stop offset="50%" stopColor="#F3EFE8" />
                              <stop offset="100%" stopColor="#FAF7F2" />
                            </linearGradient>
                            <linearGradient id="btn-step2-back-border" x1="0" y1="0" x2="120" y2="46" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
                              <stop offset="50%" stopColor="rgba(135, 101, 64, 0.5)" />
                              <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
                            </linearGradient>
                          </defs>

                          <path
                            d="M 23 0 A 23 23 0 1 0 23 46 C 30 46 35 39 40 39 C 45 39 50 46 57 46 L 97 46 A 23 23 0 0 0 97 0 L 57 0 C 50 0 45 7 40 7 C 35 7 30 0 23 0 Z"
                            fill="url(#btn-step2-back-fill)"
                            stroke="url(#btn-step2-back-border)"
                            strokeWidth="1.4"
                          />
                        </svg>

                        <div className="absolute left-[4px] top-[4px] w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300 shadow-sm">
                          <ArrowLeft className="w-[15px] h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:-translate-x-0.5" />
                        </div>

                        <div className="absolute right-0 top-0 bottom-0 left-[44px] sm:left-[46px] flex items-center justify-center pointer-events-none pr-3 font-sans">
                          <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.01em] text-[#1E140D] whitespace-nowrap">
                            Back
                          </span>
                        </div>
                      </button>

                      {/* Step 2 Continue Button (Signature Fused Pill Design) */}
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer font-sans"
                      >
                        <svg
                          className="w-[182px] sm:w-[196px] h-[44px] sm:h-[46px] overflow-visible"
                          viewBox="0 0 200 46"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient id="btn-step2-custom-fill" x1="0" y1="0" x2="200" y2="46" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#FAF7F2" />
                              <stop offset="50%" stopColor="#F3EFE8" />
                              <stop offset="100%" stopColor="#FAF7F2" />
                            </linearGradient>
                            <linearGradient id="btn-step2-custom-border" x1="0" y1="0" x2="200" y2="46" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
                              <stop offset="50%" stopColor="rgba(135, 101, 64, 0.5)" />
                              <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
                            </linearGradient>
                          </defs>

                          <path
                            d="M 23 0 L 137 0 C 144 0 149 7 154 7 C 159 7 164 0 177 0 A 23 23 0 1 1 177 46 C 164 46 159 39 154 39 C 149 39 144 46 137 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                            fill="url(#btn-step2-custom-fill)"
                            stroke="url(#btn-step2-custom-border)"
                            strokeWidth="1.4"
                          />
                        </svg>

                        <div className="absolute left-0 top-0 bottom-0 w-[136px] sm:w-[146px] flex items-center justify-center pointer-events-none px-3 font-sans">
                          <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.01em] text-[#1E140D] whitespace-nowrap">
                            Next: Finalize
                          </span>
                        </div>

                        <div className="absolute right-[4px] top-[4px] w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300 shadow-sm">
                          <ArrowRight className="w-[15px] h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: CONTACT & FINALIZE */}
                {currentStep === 3 && (
                  <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
                    {/* Single Row: Title & Subtitle on Left, Summary Badge on Right */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="font-sans text-[14px] sm:text-[15px] font-bold text-[#1E140D]">
                          Contact Information & Confirmation
                        </h4>
                        <p className="font-sans text-[12px] sm:text-[12.5px] text-[#402E1D]/65 font-medium mt-0.5">
                          Where should we send your digital rendering and proof?
                        </p>
                      </div>

                      {/* Minimal Borderless Summary Badge */}
                      <div className="inline-flex items-center gap-2.5 bg-[#FAF7F2] px-3.5 py-1.5 sm:py-2 rounded-full shrink-0 self-start sm:self-auto font-sans">
                        <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 relative">
                          <svg className="w-full h-full block" viewBox="0 0 36 36" fill="none">
                            <circle cx="18" cy="18" r="18" fill={activeUpper} />
                            <path d="M 0 18 A 18 18 0 0 0 36 18 Z" fill={activeBase} />
                          </svg>
                        </div>
                        <span className="font-sans text-[12px] sm:text-[12.5px] font-bold text-[#1E140D]">
                          {activePaletteName}
                        </span>
                        <span className="text-[#876540]/40 font-bold">•</span>
                        <span className="font-sans text-[12.5px] sm:text-[13px] font-bold text-[#876540]">
                          €199
                        </span>
                      </div>
                    </div>

                    {/* Refined Minimal Contact Inputs in 2 Columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 font-sans">
                      <div className="space-y-1">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: undefined }));
                          }}
                          placeholder="Your Name *"
                          className={`w-full h-11 sm:h-12 px-4 rounded-xl sm:rounded-2xl font-sans text-[13px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/45 placeholder:font-normal focus:outline-none transition-colors ${
                            fieldErrors.name 
                              ? "bg-red-50/50 border border-red-400 focus:border-red-500" 
                              : "bg-[#FAF7F2] border border-[#402E1D]/12 focus:border-[#876540]/60"
                          }`}
                        />
                        {fieldErrors.name && (
                          <p className="text-[11px] text-red-600 font-medium px-1">
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                          }}
                          placeholder="Email Address *"
                          className={`w-full h-11 sm:h-12 px-4 rounded-xl sm:rounded-2xl font-sans text-[13px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/45 placeholder:font-normal focus:outline-none transition-colors ${
                            fieldErrors.email 
                              ? "bg-red-50/50 border border-red-400 focus:border-red-500" 
                              : "bg-[#FAF7F2] border border-[#402E1D]/12 focus:border-[#876540]/60"
                          }`}
                        />
                        {fieldErrors.email && (
                          <p className="text-[11px] text-red-600 font-medium px-1">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (fieldErrors.phone) setFieldErrors(prev => ({ ...prev, phone: undefined }));
                          }}
                          placeholder="Phone Number (Optional)"
                          className={`w-full h-11 sm:h-12 px-4 rounded-xl sm:rounded-2xl font-sans text-[13px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/45 placeholder:font-normal focus:outline-none transition-colors ${
                            fieldErrors.phone 
                              ? "bg-red-50/50 border border-red-400 focus:border-red-500" 
                              : "bg-[#FAF7F2] border border-[#402E1D]/12 focus:border-[#876540]/60"
                          }`}
                        />
                        {fieldErrors.phone && (
                          <p className="text-[11px] text-red-600 font-medium px-1">
                            {fieldErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Step 3 Back & Submit Action */}
                    <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-end sm:justify-between gap-3 sm:gap-4">
                      {/* Step 3 Back Button (Signature Fused Pill Design - Hidden on Mobile Phones) */}
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="hidden sm:inline-flex group relative items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer font-sans"
                      >
                        <svg
                          className="w-[110px] sm:w-[120px] h-[44px] sm:h-[46px] overflow-visible"
                          viewBox="0 0 120 46"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient id="btn-step3-back-fill" x1="0" y1="0" x2="120" y2="46" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#FAF7F2" />
                              <stop offset="50%" stopColor="#F3EFE8" />
                              <stop offset="100%" stopColor="#FAF7F2" />
                            </linearGradient>
                            <linearGradient id="btn-step3-back-border" x1="0" y1="0" x2="120" y2="46" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
                              <stop offset="50%" stopColor="rgba(135, 101, 64, 0.5)" />
                              <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
                            </linearGradient>
                          </defs>

                          <path
                            d="M 23 0 A 23 23 0 1 0 23 46 C 30 46 35 39 40 39 C 45 39 50 46 57 46 L 97 46 A 23 23 0 0 0 97 0 L 57 0 C 50 0 45 7 40 7 C 35 7 30 0 23 0 Z"
                            fill="url(#btn-step3-back-fill)"
                            stroke="url(#btn-step3-back-border)"
                            strokeWidth="1.4"
                          />
                        </svg>

                        <div className="absolute left-[4px] top-[4px] w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300 shadow-sm">
                          <ArrowLeft className="w-[15px] h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:-translate-x-0.5" />
                        </div>

                        <div className="absolute right-0 top-0 bottom-0 left-[44px] sm:left-[46px] flex items-center justify-center pointer-events-none pr-3 font-sans">
                          <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.01em] text-[#1E140D] whitespace-nowrap">
                            Back
                          </span>
                        </div>
                      </button>

                      {/* Signature Fused Pill CTA */}
                      <button
                        type="submit"
                        className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer font-sans"
                      >
                        <svg
                          className="w-[256px] sm:w-[272px] h-[44px] sm:h-[46px] overflow-visible"
                          viewBox="0 0 276 46"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient id="btn-modal-custom-fill" x1="0" y1="0" x2="276" y2="46" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#FAF7F2" />
                              <stop offset="50%" stopColor="#F3EFE8" />
                              <stop offset="100%" stopColor="#FAF7F2" />
                            </linearGradient>
                            <linearGradient id="btn-modal-custom-border" x1="0" y1="0" x2="276" y2="46" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
                              <stop offset="50%" stopColor="rgba(135, 101, 64, 0.5)" />
                              <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
                            </linearGradient>
                          </defs>

                          <path
                            d="M 23 0 L 213 0 C 220 0 225 7 230 7 C 235 7 240 0 253 0 A 23 23 0 1 1 253 46 C 240 46 235 39 230 39 C 225 39 220 46 213 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                            fill="url(#btn-modal-custom-fill)"
                            stroke="url(#btn-modal-custom-border)"
                            strokeWidth="1.4"
                          />
                        </svg>

                        <div className="absolute left-0 top-0 bottom-0 w-[210px] sm:w-[222px] flex items-center justify-center pointer-events-none px-2.5 font-sans">
                          <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.01em] text-[#1E140D] whitespace-nowrap">
                            {isSubmitting ? "Submitting..." : "Submit Customization • €199"}
                          </span>
                        </div>

                        <div className="absolute right-[4px] top-[4px] w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300 shadow-sm">
                          <ArrowUpRight className="w-[15px] sm:w-[17px] h-[15px] sm:h-[17px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </button>
                    </div>
                  </div>
                )}

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
