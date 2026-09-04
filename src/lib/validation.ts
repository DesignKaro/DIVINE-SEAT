/**
 * Frontend Form Validation Suite
 * Aligned with WordPress Fluent Forms backend validation rules.
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const PHONE_ALLOWED_CHARS = /^[0-9+\s\-().]+$/;

/**
 * Validates a Person's Name
 * Fluent Forms requires min 2 characters for Name Fields.
 */
export function validateName(name: string): ValidationResult {
  const trimmed = name?.trim() || "";
  if (!trimmed) {
    return { isValid: false, error: "Please enter your name." };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters." };
  }
  if (trimmed.length > 80) {
    return { isValid: false, error: "Name must be less than 80 characters." };
  }
  return { isValid: true };
}

/**
 * Validates an Email Address
 * Matches standard email format required by Fluent Forms.
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = email?.trim() || "";
  if (!trimmed) {
    return { isValid: false, error: "Please enter your email address." };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, error: "Please enter a valid email address." };
  }
  return { isValid: true };
}

/**
 * Validates a Phone / WhatsApp Number
 * Ensures valid international format and sufficient digits.
 */
export function validatePhone(
  phone: string,
  required = true
): ValidationResult {
  const trimmed = phone?.trim() || "";
  if (!trimmed) {
    if (required) {
      return { isValid: false, error: "Please enter your phone number." };
    }
    return { isValid: true };
  }

  if (!PHONE_ALLOWED_CHARS.test(trimmed)) {
    return {
      isValid: false,
      error: "Phone number contains invalid characters.",
    };
  }

  // Count only numeric digits
  const digitCount = (trimmed.match(/\d/g) || []).length;
  if (digitCount < 6) {
    return {
      isValid: false,
      error: "Please enter a valid phone number (at least 6 digits).",
    };
  }
  if (digitCount > 16) {
    return {
      isValid: false,
      error: "Phone number is too long (max 16 digits).",
    };
  }

  return { isValid: true };
}

/**
 * Validates an Inquiry or Feedback Message
 * Fluent Forms textarea validation.
 */
export function validateMessage(
  message: string,
  minLength = 5
): ValidationResult {
  const trimmed = message?.trim() || "";
  if (!trimmed) {
    return { isValid: false, error: "Please enter your message." };
  }
  if (trimmed.length < minLength) {
    return {
      isValid: false,
      error: `Message must be at least ${minLength} characters.`,
    };
  }
  return { isValid: true };
}
