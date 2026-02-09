import { BadRequestError } from './errors.js';

interface ZeroBounceResponse {
  address: string;
  status: 'valid' | 'invalid' | 'catch-all' | 'unknown' | 'spamtrap' | 'abuse' | 'do_not_mail';
  sub_status: string;
  free_email: boolean;
  did_you_mean: string | null;
  account: string;
  domain: string;
  domain_age_days: string;
  smtp_provider: string;
  mx_found: string;
  mx_record: string;
  firstname: string | null;
  lastname: string | null;
  gender: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  zipcode: string | null;
  processed_at: string;
}

/**
 * Validates an email address using the ZeroBounce API.
 * 
 * @param email The email address to validate.
 * @param ip The IP address of the user (optional, for better fraud detection).
 * @returns boolean True if the email is valid, throws BadRequestError otherwise.
 */
export const validateEmail = async (email: string, ip: string = ''): Promise<boolean> => {
  const apiKey = process.env.ZEROBOUNCE_API_KEY;

  if (!apiKey) {
    console.warn('ZEROBOUNCE_API_KEY is not set. Skipping email validation.');
    return true; // Fail open if configuration is missing to avoid blocking signups
  }

  try {
    const url = `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}&ip_address=${encodeURIComponent(ip)}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`ZeroBounce API error: ${response.status} ${response.statusText}`);
      // Fail open on API errors to avoid blocking legitimate users during outages
      return true;
    }

    const data = await response.json() as ZeroBounceResponse;

    // Strict validation: Only accept 'valid'
    // We could also accept 'catch-all' if we want to be more lenient, 
    // but the user specifically wants to block non-existent emails.
    if (data.status === 'valid') {
      return true;
    }

    // If invalid, construct a helpful message
    let errorMessage = 'Invalid email address.';
    
    if (data.status === 'invalid') {
      errorMessage = 'This email address does not exist.';
    } else if (data.status === 'spamtrap' || data.status === 'abuse') {
      errorMessage = 'This email address is flagged as unsafe.';
    } else if (data.status === 'do_not_mail') {
      errorMessage = 'This email address cannot receive emails.';
    } else if (data.status === 'unknown') {
       // 'unknown' means ZeroBounce couldn't determine the status. 
       // Often safest to allow it or ask user to double check.
       // For now, let's treat unknown as potentially valid to avoid false positives,
       // OR block it if strictness is required. Review required.
       // Decision: Allow unknown to avoid blocking real users when provider is unresponsive.
       return true;
    }

    if (data.did_you_mean) {
      errorMessage += ` Did you mean ${data.did_you_mean}?`;
    }

    throw new BadRequestError(errorMessage);

  } catch (error) {
    if (error instanceof BadRequestError) {
      throw error;
    }
    // Log unexpected errors and fail open
    console.error('Error validating email with ZeroBounce:', error);
    return true;
  }
};
