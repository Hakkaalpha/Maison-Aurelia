/**
 * Google Form Integration Configuration for Kinetix Tech
 * 
 * Instructions:
 * 1. Create a Google Form with fields: Full Name, Email, Phone, Shipping Address, Ordered Items, Total Amount, Notes
 * 2. Get the pre-filled link to identify the entry IDs (entry.XXXXXX)
 * 3. Replace the placeholder IDs below with your Google Form entry IDs
 * 4. Replace the form response URL with your Google Form's formResponse URL
 */

export const GOOGLE_FORM_CONFIG = {
  // Replace with your Google Form action endpoint:
  // e.g. "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc_EXAMPLE_FORM_ID/formResponse"
  ACTION_URL: "https://docs.google.com/forms/d/e/1FAIpQLSc_EXAMPLE_FORM_ID/formResponse",

  // Mapping of form field keys to your Google Form entry IDs
  ENTRY_IDS: {
    name: "entry.1000001",
    email: "entry.1000002",
    phone: "entry.1000003",
    address: "entry.1000004",
    itemsSummary: "entry.1000005",
    totalAmount: "entry.1000006",
    note: "entry.1000007",
    deliverySchedule: "entry.1000008"
  },

  // Sample or actual Iframe URL for the direct embed toggle option
  IFRAME_URL: "https://docs.google.com/forms/d/e/1FAIpQLSc_EXAMPLE_FORM_ID/viewform?embedded=true"
};

export const GOOGLE_FORM_ACTION_URL = GOOGLE_FORM_CONFIG.ACTION_URL;
export const ENTRY_IDS = GOOGLE_FORM_CONFIG.ENTRY_IDS;
