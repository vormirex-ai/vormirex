import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

/**
 * Checks if the domain of an email address has valid MX records.
 * This helps filter out typos like "gmial.com" or non-existent domains.
 */
export const hasValidMxRecord = async (email: string): Promise<boolean> => {
  try {
    const domain = email.split('@')[1];
    if (!domain) return false;

    const addresses = await resolveMx(domain);
    return addresses && addresses.length > 0;
  } catch (error) {
    // If ENOTFOUND or ENODATA, the domain has no MX records.
    return false;
  }
};
