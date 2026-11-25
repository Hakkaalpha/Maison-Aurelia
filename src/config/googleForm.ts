/**
 * Google Form Integration Configuration for MAISON AURELIA
 * 
 * Form Title: MAISON AURELIA — Private Allocation Checkout
 * Base URL: https://docs.google.com/forms/d/e/1FAIpQLSfMzpWvyuhqNp5HoNFaEIvBboxuWq3GeR9CX2FoieRTUEur2Q/viewform
 * Action URL: https://docs.google.com/forms/d/e/1FAIpQLSfMzpWvyuhqNp5HoNFaEIvBboxuWq3GeR9CX2FoieRTUEur2Q/formResponse
 */

export const GOOGLE_FORM_CONFIG = {
  FORM_ID: "1FAIpQLSfMzpWvyuhqNp5HoNFaEIvBboxuWq3GeR9CX2FoieRTUEur2Q",
  VIEW_URL: "https://docs.google.com/forms/d/e/1FAIpQLSfMzpWvyuhqNp5HoNFaEIvBboxuWq3GeR9CX2FoieRTUEur2Q/viewform?usp=header",
  ACTION_URL: "https://docs.google.com/forms/d/e/1FAIpQLSfMzpWvyuhqNp5HoNFaEIvBboxuWq3GeR9CX2FoieRTUEur2Q/viewform?usp=header",
  IFRAME_URL: "https://docs.google.com/forms/d/e/1FAIpQLSfMzpWvyuhqNp5HoNFaEIvBboxuWq3GeR9CX2FoieRTUEur2Q/viewform?usp=header",

  // Extracted live field entry IDs
  ENTRY_IDS: {
    // Client Full Name
    name: "entry.941129759",
    // Email Address
    email: "entry.1686615183",
    // Mobile Number
    phone: "entry.1111228976",
    // Full Delivery Address & Location Type
    address: "entry.1737326485",
    // Serialized Creations Ordered Summary
    itemsSummary: "entry.167160300",
    // Total Payable Amount in INR
    totalAmount: "entry.1740003243",
    // White-Glove Handover Schedule & Concierge Instructions
    note: "entry.1106219504"
  }
};

export const GOOGLE_FORM_ACTION_URL = GOOGLE_FORM_CONFIG.ACTION_URL;
export const ENTRY_IDS = GOOGLE_FORM_CONFIG.ENTRY_IDS;
export default GOOGLE_FORM_CONFIG;
