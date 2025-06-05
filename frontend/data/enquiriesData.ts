export interface Enquiry {
  id: number;
  dateOfEnquiry: string;
  orderCreated: boolean;
  orderFixed: boolean;
  vesselName: string;
  imo: string | null;
  portOfSupply: string;
  client: {
    client_name: string;
    company_location: string;
    company_address: string;
    contact_number: string;
    email: string[];
    tax_number: string;
    kyc_documents: string[];
  };
  trader: string;
  dutyPaid: string | null;
  laycanStartDate: string;
  laycanEndDate: string;
  products: {
    uomOfSupply: string;
    enquiryQuantityMin: number;
    enquiryQuantityMax: number;
    name: string;
    specification: string;
  }[];
  notes: string | null;
}

export const enquiriesData: Enquiry[] = [
  {
    id: 1,
    dateOfEnquiry: "2024-04-24T12:00:00.000Z",
    orderCreated: false,
    orderFixed: false,
    vesselName: "Sea Explorer",
    imo: "9876543",
    portOfSupply: "Singapore, India",
    client: {
      client_name: "Acme Corp",
      company_location: "New York, NY",
      company_address: "123 Main St",
      contact_number: "212-555-1212",
      email: ["info@acmecorp.com"],
      tax_number: "12-3456789",
      kyc_documents: ["Acme KYC Doc URL"],
    },
    trader: "John Doe",
    dutyPaid: null,
    laycanStartDate: "2024-05-10T12:00:00.000Z",
    laycanEndDate: "2024-05-15T12:00:00.000Z",
    products: [
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 500,
        enquiryQuantityMax: 1000,
        name: "VLSFO Sulphur max 0.5%",
        specification: "VLSFO RMG 380cSt 2017 S max 0.5%",
      },
    ],
    notes: "Initial enquiry",
  },
  {
    id: 2,
    dateOfEnquiry: "2024-04-25T12:00:00.000Z",
    orderCreated: true,
    orderFixed: false,
    vesselName: "Ocean Voyager",
    imo: null,
    portOfSupply: "Fujairah, United Arab Emirates",
    client: {
      client_name: "Beta Industries",
      company_location: "San Francisco, CA",
      company_address: "456 Market St",
      contact_number: "415-555-2323",
      email: ["contact@betaindustries.com"],
      tax_number: "98-7654321",
      kyc_documents: ["Beta KYC Doc URL"],
    },
    trader: "Jane Smith",
    dutyPaid: "Yes",
    laycanStartDate: "2024-05-18T12:00:00.000Z",
    laycanEndDate: "2024-05-22T12:00:00.000Z",
    products: [
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 1000,
        enquiryQuantityMax: 2000,
        name: "HSFO Sulphur max 3.5%",
        specification: "HSFO RMG 380cSt 2010 S max 3.5%",
      },
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 200,
        enquiryQuantityMax: 500,
        name: "LSMGO Sulphur max 0.1%",
        specification: "LSMGO DMA 2017 S max 0.1%",
      },
    ],
    notes: "Follow up required",
  },
  {
    id: 3,
    dateOfEnquiry: "2024-04-26T12:00:00.000Z",
    orderCreated: true,
    orderFixed: true, // Order fixed
    vesselName: "Pacific Breeze",
    imo: "1234567", // Added IMO
    portOfSupply: "Jebel Ali, United Arab Emirates", // Different port
    client: {
      client_name: "Gamma Solutions",
      company_location: "London, UK",
      company_address: "789 Oxford St",
      contact_number: "+44 20 7123 4567",
      email: ["sales@gammasolutions.com", "info@gammasolutions.co.uk"], // Multiple emails
      tax_number: "GB123456789",
      kyc_documents: ["Gamma KYC Doc URL", "Additional Gamma KYC"], // Multiple KYC docs
    },
    trader: "David Lee",
    dutyPaid: "No", // Duty not paid
    laycanStartDate: "2024-06-01T12:00:00.000Z", // Later laycan
    laycanEndDate: "2024-06-05T12:00:00.000Z",
    products: [
      {
        uomOfSupply: "bbl", // Barrels
        enquiryQuantityMin: 10000, // Larger quantities
        enquiryQuantityMax: 15000,
        name: "MGO Sulphur max 0.5%",
        specification: "MGO DMA 2005 S max 0.5%", // Different spec
      },
    ],
    notes: "Order confirmed",
  },
  {
    id: 4,
    dateOfEnquiry: "2024-04-27T10:30:00.000Z",
    orderCreated: false,
    orderFixed: false,
    vesselName: "Arctic Star",
    imo: "9123456",
    portOfSupply: "Mumbai, India",
    client: {
      client_name: "Delta Innovations",
      company_location: "Tokyo, Japan",
      company_address: "10-1 Ginza",
      contact_number: "+81 3-1234-5678",
      email: ["support@deltainnovations.com"],
      tax_number: "JP1234567890",
      kyc_documents: ["Delta KYC Doc URL"],
    },
    trader: "Ken Tanaka",
    dutyPaid: null,
    laycanStartDate: "2024-05-25T12:00:00.000Z",
    laycanEndDate: "2024-05-30T12:00:00.000Z",
    products: [
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 750,
        enquiryQuantityMax: 1500,
        name: "VLSFO Sulphur max 0.5%",
        specification: "VLSFO RMG 380cSt 2010 S max 0.5%",
      },
    ],
    notes: "Price negotiation ongoing",
  },
  {
    id: 5,
    dateOfEnquiry: "2024-04-28T14:00:00.000Z",
    orderCreated: true,
    orderFixed: true,
    vesselName: "Southern Cross",
    imo: "8765432",
    portOfSupply: "Sydney, Australia",
    client: {
      client_name: "Epsilon Enterprises",
      company_location: "Sydney, Australia",
      company_address: "111 George St",
      contact_number: "+61 2 9234 5678",
      email: ["hello@epsilonenterprises.com"],
      tax_number: "AU12345678901",
      kyc_documents: ["Epsilon KYC Doc URL"],
    },
    trader: "Emily Davis",
    dutyPaid: "Yes",
    laycanStartDate: "2024-06-08T12:00:00.000Z",
    laycanEndDate: "2024-06-12T12:00:00.000Z",
    products: [
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 500,
        enquiryQuantityMax: 1000,
        name: "HSFO Sulphur max 3.5%",
        specification: "HSFO RMG 380cSt 2005 S max 3.5%",
      },
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 250, // Smaller min quantity
        enquiryQuantityMax: 750, // Smaller max quantity
        name: "MGO Sulphur max 0.5%",
        specification: "MGO DMA 2010 S max 0.5%", // Different spec
      },
    ],
    notes: "Order delivered",
  },
  {
    id: 6,
    dateOfEnquiry: "2024-04-29T09:15:00.000Z",
    orderCreated: false,
    orderFixed: false,
    vesselName: "Golden Dawn",
    imo: null,
    portOfSupply: "Colombo, Sri Lanka",
    client: {
      client_name: "Zeta Solutions", // New client
      company_location: "Toronto, Canada",
      company_address: "123 Yonge St", // New address
      contact_number: "+1 416-555-1212", // New contact
      email: ["info@zetasolutions.com"],
      tax_number: "CA123456789",
      kyc_documents: ["Zeta KYC Doc URL"],
    },
    trader: "Sarah Chen", // New Trader
    dutyPaid: null,
    laycanStartDate: "2024-05-15T12:00:00.000Z",
    laycanEndDate: "2024-05-20T12:00:00.000Z",
    products: [
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 1000,
        enquiryQuantityMax: 1000, // Same min/max
        name: "LSMGO Sulphur max 0.1%",
        specification: "LSMGO DMA 2005 S max 0.1%", // Different spec
      },
    ],
    notes: null, // No notes
  },
  {
    id: 7,
    dateOfEnquiry: "2024-04-30T16:45:00.000Z",
    orderCreated: true,
    orderFixed: false,
    vesselName: "Oceanic Sunrise",
    imo: "7654321",
    portOfSupply: "Chennai, India",
    client: {
      client_name: "Eta Corporation",
      company_location: "Berlin, Germany",
      company_address: "123 Friedrichstrasse",
      contact_number: "+49 30 1234 5678",
      email: ["support@etacorporation.com"],
      tax_number: "DE123456789",
      kyc_documents: ["Eta KYC Doc URL"],
    },
    trader: "Franz Wagner",
    dutyPaid: "No",
    laycanStartDate: "2024-05-28T12:00:00.000Z",
    laycanEndDate: "2024-06-02T12:00:00.000Z",
    products: [
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 2000,
        enquiryQuantityMax: 3000,
        name: "VLSFO Sulphur max 0.5%",
        specification: "VLSFO RMG 380cSt 2005 S max 0.5%",
      },
    ],
    notes: "Awaiting client confirmation",
  },
  {
    id: 8,
    dateOfEnquiry: "2024-05-01T11:00:00.000Z",
    orderCreated: false,
    orderFixed: false,
    vesselName: "Tropical Storm",
    imo: null,
    portOfSupply: "Rio de Janeiro, Brazil", // Added a new port (not in your original list) - adjust if needed
    client: {
      client_name: "Theta Ventures",
      company_location: "São Paulo, Brazil",
      company_address: "123 Avenida Paulista",
      contact_number: "+55 11 1234 5678",
      email: ["hello@thetaventures.com"],
      tax_number: "BR123456789",
      kyc_documents: ["Theta KYC Doc URL"],
    },
    trader: "Maria Silva",
    dutyPaid: null,
    laycanStartDate: "2024-06-05T12:00:00.000Z",
    laycanEndDate: "2024-06-10T12:00:00.000Z",
    products: [
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 1500,
        enquiryQuantityMax: 2500,
        name: "HSFO Sulphur max 3.5%",
        specification: "HSFO RMG 380cSt 2017 S max 3.5%",
      },
    ],
    notes: null,
  },
  {
    id: 9,
    dateOfEnquiry: "2024-05-02T13:30:00.000Z",
    orderCreated: true,
    orderFixed: true,
    vesselName: "Crimson Tide", // New vessel name
    imo: "9812345", // Added IMO
    portOfSupply: "Rotterdam, Netherlands", // Another new port
    client: {
      client_name: "Iota Innovations",
      company_location: "Mumbai, India", // Different location
      company_address: "123 Nariman Point",
      contact_number: "+91 22 1234 5678",
      email: ["info@iotainnovations.com", "sales@iotainnovations.in"], // Multiple emails
      tax_number: "IN123456789",
      kyc_documents: ["Iota KYC Doc URL"],
    },
    trader: "Anika Patel", // New Trader
    dutyPaid: "Yes",
    laycanStartDate: "2024-06-15T12:00:00.000Z", // Later dates
    laycanEndDate: "2024-06-20T12:00:00.000Z",
    products: [
      {
        uomOfSupply: "bbl", // Barrels
        enquiryQuantityMin: 8000,
        enquiryQuantityMax: 12000,
        name: "MGO Sulphur max 0.5%",
        specification: "MGO DMA 2017 S max 0.5%",
      },
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 500, // Additional product
        enquiryQuantityMax: 750,
        name: "LSMGO Sulphur max 0.1%",
        specification: "LSMGO DMA 2010 S max 0.1%",
      },
    ],
    notes: "Complex order - requires careful monitoring",
  },
  {
    id: 10,
    dateOfEnquiry: "2024-05-03T08:00:00.000Z",
    orderCreated: true,
    orderFixed: false,
    vesselName: "Starlight Express",
    imo: "6543210",
    portOfSupply: "Fujairah, United Arab Emirates",
    client: {
      client_name: "Kappa Enterprises",
      company_location: "Paris, France",
      company_address: "123 Champs-Élysées",
      contact_number: "+33 1 1234 5678",
      email: ["support@kappaenterprises.com"],
      tax_number: "FR123456789",
      kyc_documents: ["Kappa KYC Doc URL"],
    },
    trader: "Sophie Dubois",
    dutyPaid: "Yes",
    laycanStartDate: "2024-06-12T12:00:00.000Z",
    laycanEndDate: "2024-06-18T12:00:00.000Z",
    products: [
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 3000,
        enquiryQuantityMax: 4000,
        name: "VLSFO Sulphur max 0.5%",
        specification: "VLSFO RMG 380cSt 2017 S max 0.5%",
      },
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 1000,
        enquiryQuantityMax: 1500,
        name: "MGO Sulphur max 0.5%",
        specification: "MGO DMA 2005 S max 0.5%",
      },
    ],
    notes: "Waiting for vessel confirmation",
  },
  {
    id: 11,
    dateOfEnquiry: "2024-05-04T15:30:00.000Z",
    orderCreated: false,
    orderFixed: false,
    vesselName: "Northern Lights",
    imo: null,
    portOfSupply: "Singapore, India",
    client: {
      client_name: "Acme Corp", // Repeat client for variety
      company_location: "New York, NY",
      company_address: "123 Main St",
      contact_number: "212-555-1212",
      email: ["info@acmecorp.com", "sales@acmecorp.com"], // Added another email
      tax_number: "12-3456789",
      kyc_documents: ["Acme KYC Doc URL", "Updated Acme KYC"], // Added another KYC document
    },
    trader: "John Doe", // Same trader as earlier Acme Corp entry
    dutyPaid: null,
    laycanStartDate: "2024-06-20T12:00:00.000Z",
    laycanEndDate: "2024-06-25T12:00:00.000Z",
    products: [
      {
        uomOfSupply: "MT",
        enquiryQuantityMin: 2500,
        enquiryQuantityMax: 3500,
        name: "HSFO Sulphur max 3.5%",
        specification: "HSFO RMG 380cSt 2010 S max 3.5%",
      },
    ],
    notes: "Initial discussions",
  },
];
