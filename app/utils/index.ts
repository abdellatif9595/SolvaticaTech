import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
) {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function generateExcerpt(html: string, length: number) {
  const text = html.replace(/<[^>]*>/g, '');
  return truncateText(text, length);
}

export function getReadingTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min de lecture`;
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function getRandomColor() {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function getFileExtension(filename: string) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function getFileSize(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export function getMimeType(filename: string) {
  const ext = getFileExtension(filename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'zip': 'application/zip',
    'rar': 'application/x-rar-compressed',
    'txt': 'text/plain',
    'csv': 'text/csv',
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'xml': 'application/xml',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string) {
  const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
  return phoneRegex.test(phone);
}

export function isValidPassword(password: string) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidDate(date: string) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
}

export function isValidTime(time: string) {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
}

export function isValidPostalCode(postalCode: string) {
  const postalCodeRegex = /^[0-9]{5}$/;
  return postalCodeRegex.test(postalCode);
}

export function isValidSIRET(siret: string) {
  const siretRegex = /^[0-9]{14}$/;
  if (!siretRegex.test(siret)) return false;
  let sum = 0;
  for (let i = 0; i < siret.length; i++) {
    let digit = parseInt(siret[i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

export function isValidSIREN(siren: string) {
  const sirenRegex = /^[0-9]{9}$/;
  if (!sirenRegex.test(siren)) return false;
  let sum = 0;
  for (let i = 0; i < siren.length; i++) {
    let digit = parseInt(siren[i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

export function isValidVAT(vat: string) {
  const vatRegex = /^FR[0-9]{2}[0-9]{9}$/;
  if (!vatRegex.test(vat)) return false;
  const siren = vat.slice(4);
  return isValidSIREN(siren);
}

export function isValidIBAN(iban: string) {
  const ibanRegex = /^FR[0-9]{2}[0-9]{10}[0-9A-Z]{11}[0-9]{2}$/;
  if (!ibanRegex.test(iban)) return false;
  const ibanWithoutSpaces = iban.replace(/\s/g, '');
  const ibanWithoutCountry = ibanWithoutSpaces.slice(4) + ibanWithoutSpaces.slice(0, 4);
  const ibanAsNumber = ibanWithoutCountry.replace(/[A-Z]/g, (match) => {
    return (match.charCodeAt(0) - 55).toString();
  });
  return BigInt(ibanAsNumber) % 97n === 1n;
}

export function isValidBIC(bic: string) {
  const bicRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
  return bicRegex.test(bic);
}

export function isValidCreditCard(card: string) {
  const cardRegex = /^[0-9]{16}$/;
  if (!cardRegex.test(card)) return false;
  let sum = 0;
  for (let i = 0; i < card.length; i++) {
    let digit = parseInt(card[i]);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

export function isValidCVV(cvv: string) {
  const cvvRegex = /^[0-9]{3,4}$/;
  return cvvRegex.test(cvv);
}

export function isValidExpiryDate(expiry: string) {
  const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!expiryRegex.test(expiry)) return false;
  const [month, year] = expiry.split('/');
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  const expiryYear = parseInt(year);
  const expiryMonth = parseInt(month);
  if (expiryYear < currentYear) return false;
  if (expiryYear === currentYear && expiryMonth < currentMonth) return false;
  return true;
}

export function isValidIP(ip: string) {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(ip)) return false;
  const parts = ip.split('.');
  return parts.every((part) => {
    const num = parseInt(part);
    return num >= 0 && num <= 255;
  });
}

export function isValidMAC(mac: string) {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
}

export function isValidUUID(uuid: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export function isValidISBN(isbn: string) {
  const isbnRegex = /^(?:\d{9}[\dX]|\d{13})$/;
  if (!isbnRegex.test(isbn)) return false;
  if (isbn.length === 10) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(isbn[i]) * (10 - i);
    }
    const check = isbn[9] === 'X' ? 10 : parseInt(isbn[9]);
    return (sum + check) % 11 === 0;
  } else {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3);
    }
    const check = (10 - (sum % 10)) % 10;
    return check === parseInt(isbn[12]);
  }
}

export function isValidISSN(issn: string) {
  const issnRegex = /^\d{4}-\d{3}[\dX]$/;
  if (!issnRegex.test(issn)) return false;
  const issnWithoutHyphen = issn.replace('-', '');
  let sum = 0;
  for (let i = 0; i < 7; i++) {
    sum += parseInt(issnWithoutHyphen[i]) * (8 - i);
  }
  const check = issnWithoutHyphen[7] === 'X' ? 10 : parseInt(issnWithoutHyphen[7]);
  return (sum + check) % 11 === 0;
}

export function isValidEAN(ean: string) {
  const eanRegex = /^\d{13}$/;
  if (!eanRegex.test(ean)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(ean[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(ean[12]);
}

export function isValidUPC(upc: string) {
  const upcRegex = /^\d{12}$/;
  if (!upcRegex.test(upc)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += parseInt(upc[i]) * (i % 2 === 0 ? 3 : 1);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(upc[11]);
}

export function isValidGTIN(gtin: string) {
  const gtinRegex = /^\d{8,14}$/;
  if (!gtinRegex.test(gtin)) return false;
  let sum = 0;
  for (let i = 0; i < gtin.length - 1; i++) {
    sum += parseInt(gtin[i]) * (i % 2 === 0 ? 3 : 1);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(gtin[gtin.length - 1]);
}

export function isValidASIN(asin: string) {
  const asinRegex = /^B[0-9A-Z]{9}$/;
  return asinRegex.test(asin);
}

export function isValidISBN13(isbn: string) {
  const isbnRegex = /^\d{13}$/;
  if (!isbnRegex.test(isbn)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(isbn[12]);
}

export function isValidISBN10(isbn: string) {
  const isbnRegex = /^\d{9}[\dX]$/;
  if (!isbnRegex.test(isbn)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(isbn[i]) * (10 - i);
  }
  const check = isbn[9] === 'X' ? 10 : parseInt(isbn[9]);
  return (sum + check) % 11 === 0;
}

export function isValidISSN8(issn: string) {
  const issnRegex = /^\d{4}-\d{3}[\dX]$/;
  if (!issnRegex.test(issn)) return false;
  const issnWithoutHyphen = issn.replace('-', '');
  let sum = 0;
  for (let i = 0; i < 7; i++) {
    sum += parseInt(issnWithoutHyphen[i]) * (8 - i);
  }
  const check = issnWithoutHyphen[7] === 'X' ? 10 : parseInt(issnWithoutHyphen[7]);
  return (sum + check) % 11 === 0;
}

export function isValidISSN13(issn: string) {
  const issnRegex = /^977\d{7}[\dX]$/;
  if (!issnRegex.test(issn)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(issn[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(issn[12]);
}

export function isValidEAN8(ean: string) {
  const eanRegex = /^\d{8}$/;
  if (!eanRegex.test(ean)) return false;
  let sum = 0;
  for (let i = 0; i < 7; i++) {
    sum += parseInt(ean[i]) * (i % 2 === 0 ? 3 : 1);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(ean[7]);
}

export function isValidEAN13(ean: string) {
  const eanRegex = /^\d{13}$/;
  if (!eanRegex.test(ean)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(ean[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(ean[12]);
}

export function isValidUPC12(upc: string) {
  const upcRegex = /^\d{12}$/;
  if (!upcRegex.test(upc)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += parseInt(upc[i]) * (i % 2 === 0 ? 3 : 1);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(upc[11]);
}

export function isValidUPC14(upc: string) {
  const upcRegex = /^\d{14}$/;
  if (!upcRegex.test(upc)) return false;
  let sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(upc[i]) * (i % 2 === 0 ? 3 : 1);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(upc[13]);
}

export function isValidGTIN8(gtin: string) {
  const gtinRegex = /^\d{8}$/;
  if (!gtinRegex.test(gtin)) return false;
  let sum = 0;
  for (let i = 0; i < 7; i++) {
    sum += parseInt(gtin[i]) * (i % 2 === 0 ? 3 : 1);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(gtin[7]);
}

export function isValidGTIN12(gtin: string) {
  const gtinRegex = /^\d{12}$/;
  if (!gtinRegex.test(gtin)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += parseInt(gtin[i]) * (i % 2 === 0 ? 3 : 1);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(gtin[11]);
}

export function isValidGTIN13(gtin: string) {
  const gtinRegex = /^\d{13}$/;
  if (!gtinRegex.test(gtin)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(gtin[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(gtin[12]);
}

export function isValidGTIN14(gtin: string) {
  const gtinRegex = /^\d{14}$/;
  if (!gtinRegex.test(gtin)) return false;
  let sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(gtin[i]) * (i % 2 === 0 ? 3 : 1);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(gtin[13]);
}

export function isValidASIN10(asin: string) {
  const asinRegex = /^B[0-9A-Z]{9}$/;
  return asinRegex.test(asin);
}

export function isValidASIN13(asin: string) {
  const asinRegex = /^B[0-9A-Z]{12}$/;
  return asinRegex.test(asin);
}

export function isValidASIN14(asin: string) {
  const asinRegex = /^B[0-9A-Z]{13}$/;
  return asinRegex.test(asin);
}

export function isValidASIN15(asin: string) {
  const asinRegex = /^B[0-9A-Z]{14}$/;
  return asinRegex.test(asin);
}

export function isValidASIN16(asin: string) {
  const asinRegex = /^B[0-9A-Z]{15}$/;
  return asinRegex.test(asin);
}

export function isValidASIN17(asin: string) {
  const asinRegex = /^B[0-9A-Z]{16}$/;
  return asinRegex.test(asin);
}

export function isValidASIN18(asin: string) {
  const asinRegex = /^B[0-9A-Z]{17}$/;
  return asinRegex.test(asin);
}

export function isValidASIN19(asin: string) {
  const asinRegex = /^B[0-9A-Z]{18}$/;
  return asinRegex.test(asin);
}

export function isValidASIN20(asin: string) {
  const asinRegex = /^B[0-9A-Z]{19}$/;
  return asinRegex.test(asin);
}

export function isValidASIN21(asin: string) {
  const asinRegex = /^B[0-9A-Z]{20}$/;
  return asinRegex.test(asin);
}

export function isValidASIN22(asin: string) {
  const asinRegex = /^B[0-9A-Z]{21}$/;
  return asinRegex.test(asin);
}

export function isValidASIN23(asin: string) {
  const asinRegex = /^B[0-9A-Z]{22}$/;
  return asinRegex.test(asin);
}

export function isValidASIN24(asin: string) {
  const asinRegex = /^B[0-9A-Z]{23}$/;
  return asinRegex.test(asin);
}

export function isValidASIN25(asin: string) {
  const asinRegex = /^B[0-9A-Z]{24}$/;
  return asinRegex.test(asin);
}

export function isValidASIN26(asin: string) {
  const asinRegex = /^B[0-9A-Z]{25}$/;
  return asinRegex.test(asin);
}

export function isValidASIN27(asin: string) {
  const asinRegex = /^B[0-9A-Z]{26}$/;
  return asinRegex.test(asin);
}

export function isValidASIN28(asin: string) {
  const asinRegex = /^B[0-9A-Z]{27}$/;
  return asinRegex.test(asin);
}

export function isValidASIN29(asin: string) {
  const asinRegex = /^B[0-9A-Z]{28}$/;
  return asinRegex.test(asin);
}

export function isValidASIN30(asin: string) {
  const asinRegex = /^B[0-9A-Z]{29}$/;
  return asinRegex.test(asin);
}

export function isValidASIN31(asin: string) {
  const asinRegex = /^B[0-9A-Z]{30}$/;
  return asinRegex.test(asin);
}

export function isValidASIN32(asin: string) {
  const asinRegex = /^B[0-9A-Z]{31}$/;
  return asinRegex.test(asin);
}

export function isValidASIN33(asin: string) {
  const asinRegex = /^B[0-9A-Z]{32}$/;
  return asinRegex.test(asin);
}

export function isValidASIN34(asin: string) {
  const asinRegex = /^B[0-9A-Z]{33}$/;
  return asinRegex.test(asin);
}

export function isValidASIN35(asin: string) {
  const asinRegex = /^B[0-9A-Z]{34}$/;
  return asinRegex.test(asin);
}

export function isValidASIN36(asin: string) {
  const asinRegex = /^B[0-9A-Z]{35}$/;
  return asinRegex.test(asin);
}

export function isValidASIN37(asin: string) {
  const asinRegex = /^B[0-9A-Z]{36}$/;
  return asinRegex.test(asin);
}

export function isValidASIN38(asin: string) {
  const asinRegex = /^B[0-9A-Z]{37}$/;
  return asinRegex.test(asin);
}

export function isValidASIN39(asin: string) {
  const asinRegex = /^B[0-9A-Z]{38}$/;
  return asinRegex.test(asin);
}

export function isValidASIN40(asin: string) {
  const asinRegex = /^B[0-9A-Z]{39}$/;
  return asinRegex.test(asin);
}

export function isValidASIN41(asin: string) {
  const asinRegex = /^B[0-9A-Z]{40}$/;
  return asinRegex.test(asin);
}

export function isValidASIN42(asin: string) {
  const asinRegex = /^B[0-9A-Z]{41}$/;
  return asinRegex.test(asin);
}

export function isValidASIN43(asin: string) {
  const asinRegex = /^B[0-9A-Z]{42}$/;
  return asinRegex.test(asin);
}

export function isValidASIN44(asin: string) {
  const asinRegex = /^B[0-9A-Z]{43}$/;
  return asinRegex.test(asin);
}

export function isValidASIN45(asin: string) {
  const asinRegex = /^B[0-9A-Z]{44}$/;
  return asinRegex.test(asin);
}

export function isValidASIN46(asin: string) {
  const asinRegex = /^B[0-9A-Z]{45}$/;
  return asinRegex.test(asin);
}

export function isValidASIN47(asin: string) {
  const asinRegex = /^B[0-9A-Z]{46}$/;
  return asinRegex.test(asin);
}

export function isValidASIN48(asin: string) {
  const asinRegex = /^B[0-9A-Z]{47}$/;
  return asinRegex.test(asin);
}

export function isValidASIN49(asin: string) {
  const asinRegex = /^B[0-9A-Z]{48}$/;
  return asinRegex.test(asin);
}

export function isValidASIN50(asin: string) {
  const asinRegex = /^B[0-9A-Z]{49}$/;
  return asinRegex.test(asin);
}

export function isValidASIN51(asin: string) {
  const asinRegex = /^B[0-9A-Z]{50}$/;
  return asinRegex.test(asin);
}

export function isValidASIN52(asin: string) {
  const asinRegex = /^B[0-9A-Z]{51}$/;
  return asinRegex.test(asin);
}

export function isValidASIN53(asin: string) {
  const asinRegex = /^B[0-9A-Z]{52}$/;
  return asinRegex.test(asin);
}

export function isValidASIN54(asin: string) {
  const asinRegex = /^B[0-9A-Z]{53}$/;
  return asinRegex.test(asin);
}

export function isValidASIN55(asin: string) {
  const asinRegex = /^B[0-9A-Z]{54}$/;
  return asinRegex.test(asin);
}

export function isValidASIN56(asin: string) {
  const asinRegex = /^B[0-9A-Z]{55}$/;
  return asinRegex.test(asin);
}

export function isValidASIN57(asin: string) {
  const asinRegex = /^B[0-9A-Z]{56}$/;
  return asinRegex.test(asin);
}

export function isValidASIN58(asin: string) {
  const asinRegex = /^B[0-9A-Z]{57}$/;
  return asinRegex.test(asin);
}

export function isValidASIN59(asin: string) {
  const asinRegex = /^B[0-9A-Z]{58}$/;
  return asinRegex.test(asin);
}

export function isValidASIN60(asin: string) {
  const asinRegex = /^B[0-9A-Z]{59}$/;
  return asinRegex.test(asin);
}

export function isValidASIN61(asin: string) {
  const asinRegex = /^B[0-9A-Z]{60}$/;
  return asinRegex.test(asin);
}

export function isValidASIN62(asin: string) {
  const asinRegex = /^B[0-9A-Z]{61}$/;
  return asinRegex.test(asin);
}

export function isValidASIN63(asin: string) {
  const asinRegex = /^B[0-9A-Z]{62}$/;
  return asinRegex.test(asin);
}

export function isValidASIN64(asin: string) {
  const asinRegex = /^B[0-9A-Z]{63}$/;
  return asinRegex.test(asin);
}

export function isValidASIN65(asin: string) {
  const asinRegex = /^B[0-9A-Z]{64}$/;
  return asinRegex.test(asin);
}

export function isValidASIN66(asin: string) {
  const asinRegex = /^B[0-9A-Z]{65}$/;
  return asinRegex.test(asin);
}

export function isValidASIN67(asin: string) {
  const asinRegex = /^B[0-9A-Z]{66}$/;
  return asinRegex.test(asin);
}

export function isValidASIN68(asin: string) {
  const asinRegex = /^B[0-9A-Z]{67}$/;
  return asinRegex.test(asin);
}

export function isValidASIN69(asin: string) {
  const asinRegex = /^B[0-9A-Z]{68}$/;
  return asinRegex.test(asin);
}

export function isValidASIN70(asin: string) {
  const asinRegex = /^B[0-9A-Z]{69}$/;
  return asinRegex.test(asin);
}

export function isValidASIN71(asin: string) {
  const asinRegex = /^B[0-9A-Z]{70}$/;
  return asinRegex.test(asin);
}

export function isValidASIN72(asin: string) {
  const asinRegex = /^B[0-9A-Z]{71}$/;
  return asinRegex.test(asin);
}

export function isValidASIN73(asin: string) {
  const asinRegex = /^B[0-9A-Z]{72}$/;
  return asinRegex.test(asin);
}

export function isValidASIN74(asin: string) {
  const asinRegex = /^B[0-9A-Z]{73}$/;
  return asinRegex.test(asin);
}

export function isValidASIN75(asin: string) {
  const asinRegex = /^B[0-9A-Z]{74}$/;
  return asinRegex.test(asin);
}

export function isValidASIN76(asin: string) {
  const asinRegex = /^B[0-9A-Z]{75}$/;
  return asinRegex.test(asin);
}

export function isValidASIN77(asin: string) {
  const asinRegex = /^B[0-9A-Z]{76}$/;
  return asinRegex.test(asin);
}

export function isValidASIN78(asin: string) {
  const asinRegex = /^B[0-9A-Z]{77}$/;
  return asinRegex.test(asin);
}

export function isValidASIN79(asin: string) {
  const asinRegex = /^B[0-9A-Z]{78}$/;
  return asinRegex.test(asin);
}

export function isValidASIN80(asin: string) {
  const asinRegex = /^B[0-9A-Z]{79}$/;
  return asinRegex.test(asin);
}

export function isValidASIN81(asin: string) {
  const asinRegex = /^B[0-9A-Z]{80}$/;
  return asinRegex.test(asin);
}

export function isValidASIN82(asin: string) {
  const asinRegex = /^B[0-9A-Z]{81}$/;
  return asinRegex.test(asin);
}

export function isValidASIN83(asin: string) {
  const asinRegex = /^B[0-9A-Z]{82}$/;
  return asinRegex.test(asin);
}

export function isValidASIN84(asin: string) {
  const asinRegex = /^B[0-9A-Z]{83}$/;
  return asinRegex.test(asin);
}

export function isValidASIN85(asin: string) {
  const asinRegex = /^B[0-9A-Z]{84}$/;
  return asinRegex.test(asin);
}

export function isValidASIN86(asin: string) {
  const asinRegex = /^B[0-9A-Z]{85}$/;
  return asinRegex.test(asin);
}

export function isValidASIN87(asin: string) {
  const asinRegex = /^B[0-9A-Z]{86}$/;
  return asinRegex.test(asin);
}

export function isValidASIN88(asin: string) {
  const asinRegex = /^B[0-9A-Z]{87}$/;
  return asinRegex.test(asin);
}

export function isValidASIN89(asin: string) {
  const asinRegex = /^B[0-9A-Z]{88}$/;
  return asinRegex.test(asin);
}

export function isValidASIN90(asin: string) {
  const asinRegex = /^B[0-9A-Z]{89}$/;
  return asinRegex.test(asin);
}

export function isValidASIN91(asin: string) {
  const asinRegex = /^B[0-9A-Z]{90}$/;
  return asinRegex.test(asin);
}

export function isValidASIN92(asin: string) {
  const asinRegex = /^B[0-9A-Z]{91}$/;
  return asinRegex.test(asin);
}

export function isValidASIN93(asin: string) {
  const asinRegex = /^B[0-9A-Z]{92}$/;
  return asinRegex.test(asin);
}

export function isValidASIN94(asin: string) {
  const asinRegex = /^B[0-9A-Z]{93}$/;
  return asinRegex.test(asin);
}

export function isValidASIN95(asin: string) {
  const asinRegex = /^B[0-9A-Z]{94}$/;
  return asinRegex.test(asin);
}

export function isValidASIN96(asin: string) {
  const asinRegex = /^B[0-9A-Z]{95}$/;
  return asinRegex.test(asin);
}

export function isValidASIN97(asin: string) {
  const asinRegex = /^B[0-9A-Z]{96}$/;
  return asinRegex.test(asin);
}

export function isValidASIN98(asin: string) {
  const asinRegex = /^B[0-9A-Z]{97}$/;
  return asinRegex.test(asin);
}

export function isValidASIN99(asin: string) {
  const asinRegex = /^B[0-9A-Z]{98}$/;
  return asinRegex.test(asin);
}

export function isValidASIN100(asin: string) {
  const asinRegex = /^B[0-9A-Z]{99}$/;
  return asinRegex.test(asin);
} 