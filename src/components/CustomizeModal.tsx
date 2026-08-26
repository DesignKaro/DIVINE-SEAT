"use client";

import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Upload, 
  Check, 
  Image as ImageIcon, 
  Trash2,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

export interface ColorPair {
  id: string;
  name: string;
  upperColor: string;
  baseColor: string;
}

export const PREBUILT_COLOR_PAIRS: ColorPair[] = [
  {
    id: "terracotta-linen",
    name: "Terracotta & Linen",
    upperColor: "#ECE7DE",
    baseColor: "#BA6844",
  },
  {
    id: "sandalwood-cream",
    name: "Sandalwood & Cream",
    upperColor: "#F8F5EE",
    baseColor: "#876540",
  },
  {
    id: "forest-sage",
    name: "Forest Sage & Ecru",
    upperColor: "#EDE8DC",
    baseColor: "#586D5A",
  },
  {
    id: "slate-oat",
    name: "Charcoal Slate & Oat",
    upperColor: "#E2DDD5",
    baseColor: "#383A3F",
  },
  {
    id: "indigo-cloud",
    name: "Indigo & Cloud",
    upperColor: "#F2F4F7",
    baseColor: "#2A3B4C",
  },
  {
    id: "raw-cork-ochre",
    name: "Cork & Warm Ochre",
    upperColor: "#EADDC7",
    baseColor: "#C98236",
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
  const [selectedPrebuiltId, setSelectedPrebuiltId] = useState<string>("terracotta-linen");

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
    if (!name || !email) return;

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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto">
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
          className="relative w-full max-w-[720px] bg-white text-[#402E1D] rounded-[26px] sm:rounded-[36px] border border-[#402E1D]/10 overflow-hidden z-10 my-auto flex flex-col max-h-[94vh]"
        >
          {/* Header with Responsive Padding */}
          <div className="px-5 sm:px-10 lg:px-12 pt-5 sm:pt-9 pb-3 sm:pb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-[20px] sm:text-[28px] text-[#1E140D] tracking-tight">
                The Lotus Seat — Custom
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

          {/* Premium Tactile Segmented Stepper Track */}
          {!isSuccess && (
            <div className="px-5 sm:px-10 lg:px-12 pb-3.5 sm:pb-6">
              <div className="bg-[#EFECE5] p-1 sm:p-1.5 rounded-xl sm:rounded-2xl flex items-center gap-1 sm:gap-1.5 select-none font-sans">
                {[
                  { step: 1, label: "Color", mobileLabel: "Color" },
                  { step: 2, label: "Notes & Files", mobileLabel: "Notes" },
                  { step: 3, label: "Finalize", mobileLabel: "Finalize" },
                ].map((item) => {
                  const isActive = currentStep === item.step;
                  const isCompleted = item.step < currentStep;

                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => {
                        if (item.step < currentStep) setCurrentStep(item.step as 1 | 2 | 3);
                      }}
                      disabled={item.step > currentStep}
                      className={`relative flex-1 py-1.5 sm:py-2.5 px-1.5 sm:px-3.5 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-left ${
                        isActive
                          ? "bg-white shadow-[0_2px_8px_rgba(64,46,29,0.06)] text-[#1E140D] cursor-default ring-1 ring-black/5"
                          : isCompleted
                          ? "hover:bg-white/60 text-[#1E140D] cursor-pointer"
                          : "text-[#402E1D]/45 cursor-not-allowed opacity-60"
                      }`}
                    >
                      {/* Step Indicator Badge */}
                      <div
                        className={`w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-full flex items-center justify-center text-[9.5px] sm:text-[11px] font-bold shrink-0 transition-colors ${
                          isActive
                            ? "bg-[#876540] text-white"
                            : isCompleted
                            ? "bg-[#876540]/15 text-[#876540]"
                            : "bg-[#402E1D]/10 text-[#402E1D]/60"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
                        ) : (
                          <span>{item.step}</span>
                        )}
                      </div>

                      {/* Step Label */}
                      <span
                        className={`font-sans text-[10.5px] sm:text-[12px] font-bold leading-tight truncate ${
                          isActive ? "text-[#1E140D]" : isCompleted ? "text-[#1E140D]/90" : "text-[#402E1D]/55"
                        }`}
                      >
                        <span className="sm:hidden">{item.mobileLabel}</span>
                        <span className="hidden sm:inline">{item.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Modal Body with Generous Responsive Padding */}
          <div className="overflow-y-auto px-5 sm:px-10 lg:px-12 pt-1 pb-6 sm:pb-10 flex-1 font-sans">
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
                  <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="font-sans text-[14px] sm:text-[15px] font-bold text-[#1E140D]">
                          Select Color Pairing
                        </h4>
                        <p className="font-sans text-[12.5px] sm:text-[13px] text-[#402E1D]/65 font-medium mt-0.5">
                          Choose from our signature pairs or mix your custom fabrics.
                        </p>
                      </div>

                      {/* Mode Switcher matching Stepper Design */}
                      <div className="flex items-center gap-1 bg-[#EFECE5] p-1.5 rounded-2xl self-start sm:self-auto select-none">
                        <button
                          type="button"
                          onClick={() => setPaletteMode("prebuilt")}
                          className={`px-3.5 py-1.5 rounded-xl transition-all duration-300 cursor-pointer font-sans text-[12px] font-bold ${
                            paletteMode === "prebuilt"
                              ? "bg-white shadow-[0_2px_8px_rgba(64,46,29,0.06)] text-[#1E140D] ring-1 ring-black/5"
                              : "text-[#402E1D]/55 hover:text-[#1E140D]"
                          }`}
                        >
                          6 Prebuilt
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaletteMode("custom")}
                          className={`px-3.5 py-1.5 rounded-xl transition-all duration-300 cursor-pointer font-sans text-[12px] font-bold ${
                            paletteMode === "custom"
                              ? "bg-white shadow-[0_2px_8px_rgba(64,46,29,0.06)] text-[#1E140D] ring-1 ring-black/5"
                              : "text-[#402E1D]/55 hover:text-[#1E140D]"
                          }`}
                        >
                          Custom Pickers
                        </button>
                      </div>
                    </div>

                    {paletteMode === "prebuilt" ? (
                      /* 6 Prebuilt Pairs - Spacious Responsive Cards with Crisp Split Discs */
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5 pt-1">
                        {PREBUILT_COLOR_PAIRS.map((pair) => {
                          const isSelected = selectedPrebuiltId === pair.id;
                          return (
                            <button
                              key={pair.id}
                              type="button"
                              onClick={() => setSelectedPrebuiltId(pair.id)}
                              className={`p-2.5 sm:px-4 sm:py-3.5 rounded-xl sm:rounded-2xl text-left transition-all flex items-center gap-2 sm:gap-3 cursor-pointer border-0 font-sans ${
                                isSelected
                                  ? "bg-[#EFECE5] ring-2 ring-[#876540] shadow-xs"
                                  : "bg-[#EFECE5] hover:bg-[#EAE6DD]"
                              }`}
                            >
                              {/* Horizontal Upper Cushion / Lower Base Split Disc */}
                              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-xs relative">
                                <svg className="w-full h-full block" viewBox="0 0 36 36" fill="none">
                                  <circle cx="18" cy="18" r="18" fill={pair.upperColor} />
                                  <path d="M 0 18 A 18 18 0 0 0 36 18 Z" fill={pair.baseColor} />
                                </svg>
                              </div>
                              <span className="font-sans text-[11px] sm:text-[13px] font-semibold text-[#1E140D] leading-snug">
                                {pair.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      /* Custom Color Pickers - 3 Generously Spaced Cards */
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 pt-1">
                        {/* 1. Upper Cushion Fabric Picker */}
                        <label className="relative px-3.5 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl bg-[#EFECE5] hover:bg-[#EAE6DD] transition-all flex items-center gap-3 cursor-pointer border-0 group font-sans">
                          <div
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-xs relative"
                            style={{ backgroundColor: customUpper }}
                          >
                            <input
                              type="color"
                              value={customUpper}
                              onChange={(e) => setCustomUpper(e.target.value)}
                              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#1E140D] leading-tight truncate">
                              Upper Fabric
                            </div>
                            <div className="font-sans text-[11px] sm:text-[11.5px] text-[#876540] font-semibold mt-0.5">
                              {customUpper}
                            </div>
                          </div>
                        </label>

                        {/* 2. Lower Cork Base Picker */}
                        <label className="relative px-3.5 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl bg-[#EFECE5] hover:bg-[#EAE6DD] transition-all flex items-center gap-3 cursor-pointer border-0 group font-sans">
                          <div
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-xs relative"
                            style={{ backgroundColor: customBase }}
                          >
                            <input
                              type="color"
                              value={customBase}
                              onChange={(e) => setCustomBase(e.target.value)}
                              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#1E140D] leading-tight truncate">
                              Lower Base
                            </div>
                            <div className="font-sans text-[11px] sm:text-[11.5px] text-[#876540] font-semibold mt-0.5">
                              {customBase}
                            </div>
                          </div>
                        </label>

                        {/* 3. Resulting Blend Preview */}
                        <div className="px-3.5 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl bg-[#EFECE5] ring-2 ring-[#876540] shadow-xs flex items-center gap-3 select-none font-sans">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-xs relative">
                            <svg className="w-full h-full block" viewBox="0 0 36 36" fill="none">
                              <circle cx="18" cy="18" r="18" fill={customUpper} />
                              <path d="M 0 18 A 18 18 0 0 0 36 18 Z" fill={customBase} />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#1E140D] leading-tight truncate">
                              Custom Blend
                            </div>
                            <div className="font-sans text-[10.5px] sm:text-[11px] text-[#402E1D]/70 font-semibold mt-0.5">
                              Active Pair
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 1 Continue Button (Signature Fused Pill Design) */}
                    <div className="pt-4 sm:pt-7 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer font-sans"
                      >
                        <svg
                          className="w-[190px] sm:w-[224px] h-[42px] sm:h-[48px]"
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

                        <div className="absolute left-0 top-0 bottom-0 w-[155px] sm:w-[184px] flex items-center justify-center pointer-events-none px-2.5 font-sans">
                          <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.01em] text-[#1E140D] whitespace-nowrap">
                            Next: Notes & Files
                          </span>
                        </div>

                        <div className="absolute right-[3px] top-[3px] w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300 shadow-sm">
                          <ArrowRight className="w-[15px] h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: UPLOADS & NOTES */}
                {currentStep === 2 && (
                  <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
                    <div>
                      <h4 className="font-sans text-[14px] sm:text-[15px] font-bold text-[#1E140D]">
                        Uploads & Custom Requests
                      </h4>
                      <p className="font-sans text-[12px] sm:text-[13px] text-[#402E1D]/65 font-medium mt-0.5">
                        Optional: attach embroidery artwork, reference swatches, or styling preferences.
                      </p>
                    </div>

                    {/* File Uploads Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Icon Upload */}
                      <div>
                        <input
                          ref={iconInputRef}
                          type="file"
                          accept="image/*,.svg"
                          onChange={handleIconChange}
                          className="hidden"
                        />
                        {iconPreview ? (
                          <div className="p-3.5 bg-[#EFECE5] rounded-xl sm:rounded-2xl flex items-center justify-between font-sans">
                            <div className="flex items-center gap-3 truncate">
                              <img src={iconPreview} alt="Icon" className="w-6 h-6 object-contain" />
                              <span className="font-sans text-[12px] text-[#1E140D] font-semibold truncate">
                                {iconFile?.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={handleRemoveIcon}
                              className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => iconInputRef.current?.click()}
                            className="w-full py-3.5 sm:py-5 px-3.5 rounded-xl sm:rounded-2xl bg-[#EFECE5] hover:bg-[#EAE6DD] border-0 transition-colors flex items-center justify-center gap-2 text-[#402E1D]/80 hover:text-[#1E140D] cursor-pointer font-sans"
                          >
                            <Upload className="w-4 h-4 text-[#876540]" />
                            <span className="font-sans text-[12.5px] sm:text-[13px] font-semibold">
                              Upload Icon / Motif
                            </span>
                          </button>
                        )}
                      </div>

                      {/* Color Ref Upload */}
                      <div>
                        <input
                          ref={colorRefInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleColorRefChange}
                          className="hidden"
                        />
                        {colorRefPreview ? (
                          <div className="p-3.5 bg-[#EFECE5] rounded-xl sm:rounded-2xl flex items-center justify-between font-sans">
                            <div className="flex items-center gap-3 truncate">
                              <img src={colorRefPreview} alt="Ref" className="w-6 h-6 object-cover rounded" />
                              <span className="font-sans text-[12px] text-[#1E140D] font-semibold truncate">
                                {colorRefFile?.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={handleRemoveColorRef}
                              className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => colorRefInputRef.current?.click()}
                            className="w-full py-3.5 sm:py-5 px-3.5 rounded-xl sm:rounded-2xl bg-[#EFECE5] hover:bg-[#EAE6DD] border-0 transition-colors flex items-center justify-center gap-2 text-[#402E1D]/80 hover:text-[#1E140D] cursor-pointer font-sans"
                          >
                            <ImageIcon className="w-4 h-4 text-[#876540]" />
                            <span className="font-sans text-[12.5px] sm:text-[13px] font-semibold">
                              Color Ref Image
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Notes Textarea with Comfortable Height */}
                    <div>
                      <label htmlFor="custom-notes" className="block font-sans text-[12.5px] sm:text-[13px] font-bold text-[#1E140D] mb-1.5">
                        Notes <span className="text-[#402E1D]/60 font-medium lowercase">(optional)</span>
                      </label>
                      <textarea
                        id="custom-notes"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Specific requests, embroidery placement, or room palette details..."
                        className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#EFECE5] border-0 font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/50 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#876540]/30 min-h-[90px] sm:min-h-[120px] resize-y leading-relaxed"
                      />
                    </div>

                    {/* Step 2 Back & Continue Buttons */}
                    <div className="pt-4 sm:pt-7 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="px-3.5 py-2 rounded-full text-[#402E1D]/80 hover:text-[#1E140D] font-sans text-[12.5px] sm:text-[13px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      {/* Step 2 Continue Button (Signature Fused Pill Design) */}
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer font-sans"
                      >
                        <svg
                          className="w-[170px] sm:w-[196px] h-[42px] sm:h-[48px]"
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

                        <div className="absolute left-0 top-0 bottom-0 w-[130px] sm:w-[148px] flex items-center justify-center pointer-events-none px-2.5 font-sans">
                          <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.01em] text-[#1E140D] whitespace-nowrap">
                            Next: Finalize
                          </span>
                        </div>

                        <div className="absolute right-[3px] top-[3px] w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300 shadow-sm">
                          <ArrowRight className="w-[15px] h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: CONTACT & FINALIZE */}
                {currentStep === 3 && (
                  <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
                    <div>
                      <h4 className="font-sans text-[14px] sm:text-[15px] font-bold text-[#1E140D]">
                        Contact Information & Confirmation
                      </h4>
                      <p className="font-sans text-[12px] sm:text-[13px] text-[#402E1D]/65 font-medium mt-0.5">
                        Where should we send your digital rendering and proof?
                      </p>
                    </div>

                    {/* Summary Card with Responsive Padding */}
                    <div className="p-3.5 sm:p-5 bg-[#EFECE5] rounded-xl sm:rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-xs relative">
                          <svg className="w-full h-full block" viewBox="0 0 36 36" fill="none">
                            <circle cx="18" cy="18" r="18" fill={activeUpper} />
                            <path d="M 0 18 A 18 18 0 0 0 36 18 Z" fill={activeBase} />
                          </svg>
                        </div>
                        <div>
                          <div className="font-sans text-[13px] sm:text-[13.5px] font-bold text-[#1E140D]">
                            {activePaletteName}
                          </div>
                          <div className="font-sans text-[10.5px] sm:text-[11.5px] text-[#402E1D]/70 font-medium mt-0.5">
                            {iconFile ? "Custom Motif attached • " : ""}{colorRefFile ? "Ref image attached • " : ""}The Lotus Seat Custom
                          </div>
                        </div>
                      </div>
                      <div className="font-sans text-[14px] sm:text-[15px] font-bold text-[#876540]">
                        €199
                      </div>
                    </div>

                    {/* Contact Inputs with Comfortable Height */}
                    <div className="space-y-2.5 sm:space-y-3.5">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name *"
                        className="w-full px-3.5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#EFECE5] border-0 font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/50 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#876540]/30"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address *"
                        className="w-full px-3.5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#EFECE5] border-0 font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/50 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#876540]/30"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number (Optional)"
                        className="w-full px-3.5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#EFECE5] border-0 font-sans text-[13px] sm:text-[13.5px] font-medium text-[#1E140D] placeholder:text-[#402E1D]/50 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#876540]/30"
                      />
                    </div>

                    {/* Step 3 Back & Submit Action */}
                    <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-4 py-2 rounded-full text-[#402E1D]/80 hover:text-[#1E140D] font-sans text-[12.5px] sm:text-[13px] font-semibold transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      {/* Signature Fused Pill CTA */}
                      <button
                        type="submit"
                        className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer font-sans"
                      >
                        <svg
                          className="w-[245px] sm:w-[286px] h-[44px] sm:h-[50px]"
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

                        <div className="absolute left-0 top-0 bottom-0 w-[195px] sm:w-[230px] flex items-center justify-center pointer-events-none px-2 font-sans">
                          <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.01em] text-[#1E140D] whitespace-nowrap">
                            {isSubmitting ? "Submitting..." : "Submit Customization • €199"}
                          </span>
                        </div>

                        <div className="absolute right-[3px] top-[3px] w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300 shadow-sm">
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
