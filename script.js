// Script loaded indicator
console.log("✅ script.js loaded successfully");

// Get DOM elements (these may be null if script runs before DOM is ready, which is fine)
const propertyForm = document.getElementById("propertyForm");
const listingGrid = document.getElementById("listingGrid");
const savedGrid = document.getElementById("savedGrid");
const budgetFilter = document.getElementById("budgetFilter");
const flexibilityFilter = document.getElementById("flexibilityFilter");
const applyFiltersButton = document.getElementById("applyFilters");
const resetFiltersButton = document.getElementById("resetFilters");
const calculatorForm = document.getElementById("calculatorForm");
const calculatorResult = document.getElementById("calculatorResult");
const heroCalculatorForm = document.getElementById("heroCalculatorForm");
const heroCalculatorResult = document.getElementById("heroCalculatorResult");
const yearSpan = document.getElementById("year");
const propertyModal = document.getElementById("propertyModal");
const propertyModalContent = document.getElementById("propertyModalContent");

// Log element availability
console.log("🔍 DOM Elements check:", {
  listingGrid: !!listingGrid,
  savedGrid: !!savedGrid,
  budgetFilter: !!budgetFilter,
  flexibilityFilter: !!flexibilityFilter
});

const STORAGE_KEY = "rent4less-properties";
const FAVORITES_KEY = "rent4less-favorites";
const LISTINGS_DATA_URL = "data/listings.json";

// Embedded listings data (loaded from JSON file)
const EMBEDDED_LISTINGS_DATA = {
  "listings": [
    {
      "id": "prop-001",
      "title": "Modern 2-Bed Apartment · East Legon",
      "location": "East Legon, Accra",
      "price": 3200,
      "paymentFlexibility": "Monthly or Quarterly",
      "roomType": "Apartment",
      "bedrooms": 2,
      "bathrooms": 2,
      "area": 95,
      "description": "Furnished apartment with backup power, Wi-Fi, and proximity to business hubs. Employer-backed payment guaranteed. Modern kitchen, spacious living area, and secure compound.",
      "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "tour": "https://my.matterport.com/show/?m=BM7s6FDX6zF",
      "verified": true,
      "landlordName": "Kwame Asante",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Backup Power", "Wi-Fi", "Security", "Parking", "Furnished"]
    },
    {
      "id": "prop-002",
      "title": "Studio Loft · Osu",
      "location": "Osu, Accra",
      "price": 1800,
      "paymentFlexibility": "Monthly",
      "roomType": "Studio",
      "bedrooms": 1,
      "bathrooms": 1,
      "area": 52,
      "description": "Bright loft with 3D Smart Tour available. Ideal for young professionals who want nightlife and short commutes. Modern finishes, high ceilings, and natural light.",
      "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "tour": "https://my.matterport.com/show/?m=SxQLZvJ8qFj",
      "verified": true,
      "landlordName": "Ama Mensah",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Wi-Fi", "Furnished", "Security", "High Ceilings"]
    },
    {
      "id": "prop-003",
      "title": "Family Home · Tema Community 10",
      "location": "Tema Community 10",
      "price": 2500,
      "paymentFlexibility": "Quarterly",
      "roomType": "Apartment",
      "bedrooms": 3,
      "bathrooms": 3,
      "area": 140,
      "description": "Spacious home with private compound and community security. Tenant reputation score of previous tenant: 4.8/5. Perfect for families with children.",
      "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "tour": "https://my.matterport.com/show/?m=BM7s6FDX6zF",
      "verified": true,
      "landlordName": "Kofi Boateng",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Compound", "Security", "Parking", "3 Bedrooms", "Family-Friendly"]
    },
    {
      "id": "prop-004",
      "title": "Cozy Shared Room · Adum",
      "location": "Adum, Kumasi",
      "price": 450,
      "paymentFlexibility": "Monthly",
      "roomType": "Shared",
      "bedrooms": 1,
      "bathrooms": 1,
      "area": 25,
      "description": "Comfortable shared room in a safe, well-maintained house. Perfect for students or young professionals. Utilities included. Clean, modern shared spaces.",
      "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
      "tour": "",
      "verified": true,
      "landlordName": "Yaa Owusu",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Utilities Included", "Wi-Fi", "Shared Kitchen", "Security"]
    },
    {
      "id": "prop-005",
      "title": "Private Room with Ensuite · Airport Residential",
      "location": "Airport Residential, Accra",
      "price": 1200,
      "paymentFlexibility": "Monthly or Quarterly",
      "roomType": "Private",
      "bedrooms": 1,
      "bathrooms": 1,
      "area": 35,
      "description": "Private room with ensuite bathroom in a modern house. Shared kitchen and living area. Close to airport and business district. Ideal for professionals.",
      "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "tour": "",
      "verified": true,
      "landlordName": "Nana Adjei",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Ensuite Bathroom", "Wi-Fi", "Shared Kitchen", "Security", "Parking"]
    },
    {
      "id": "prop-006",
      "title": "Luxury 3-Bed Apartment · Cantonments",
      "location": "Cantonments, Accra",
      "price": 4500,
      "paymentFlexibility": "Quarterly",
      "roomType": "Apartment",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": 180,
      "description": "Premium furnished apartment with modern amenities, security, and backup power. Ideal for families or executives. High-end finishes throughout.",
      "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "tour": "https://my.matterport.com/show/?m=BM7s6FDX6zF",
      "verified": true,
      "landlordName": "Efua Tetteh",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Backup Power", "Wi-Fi", "Security", "Parking", "Furnished", "AC", "Modern Kitchen"]
    },
    {
      "id": "prop-007",
      "title": "Affordable Studio · Labone",
      "location": "Labone, Accra",
      "price": 900,
      "paymentFlexibility": "Monthly",
      "roomType": "Studio",
      "bedrooms": 1,
      "bathrooms": 1,
      "area": 40,
      "description": "Budget-friendly studio apartment in a quiet neighborhood. Perfect for first-time renters. All utilities included. Safe and secure area.",
      "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "tour": "",
      "verified": true,
      "landlordName": "Kojo Appiah",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Utilities Included", "Wi-Fi", "Security"]
    },
    {
      "id": "prop-008",
      "title": "Shared Room · University Area",
      "location": "University Area, Cape Coast",
      "price": 350,
      "paymentFlexibility": "Monthly",
      "roomType": "Shared",
      "bedrooms": 1,
      "bathrooms": 1,
      "area": 20,
      "description": "Student-friendly shared accommodation near university. Safe, affordable, and well-maintained. Perfect for students. Study-friendly environment.",
      "image": "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop",
      "tour": "",
      "verified": true,
      "landlordName": "Akosua Asiedu",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Utilities Included", "Wi-Fi", "Study Area", "Security"]
    },
    {
      "id": "prop-009",
      "title": "Modern 1-Bed Apartment · Spintex",
      "location": "Spintex, Accra",
      "price": 2000,
      "paymentFlexibility": "Monthly or Quarterly",
      "roomType": "Apartment",
      "bedrooms": 1,
      "bathrooms": 1,
      "area": 65,
      "description": "Modern apartment with contemporary finishes. Close to shopping malls and business areas. Secure compound with parking. Ideal for professionals.",
      "image": "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&h=600&fit=crop",
      "tour": "https://my.matterport.com/show/?m=SxQLZvJ8qFj",
      "verified": true,
      "landlordName": "Kwabena Osei",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Parking", "Wi-Fi", "Security", "Modern Finishes"]
    },
    {
      "id": "prop-010",
      "title": "Private Room · Takoradi",
      "location": "Takoradi, Western Region",
      "price": 600,
      "paymentFlexibility": "Monthly",
      "roomType": "Private",
      "bedrooms": 1,
      "bathrooms": 1,
      "area": 30,
      "description": "Private room in a family home. Shared kitchen and living space. Peaceful neighborhood with good security. Close to city center.",
      "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
      "tour": "",
      "verified": true,
      "landlordName": "Mariama Sule",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Shared Kitchen", "Wi-Fi", "Security"]
    },
    {
      "id": "prop-011",
      "title": "2-Bed Apartment · Dzorwulu",
      "location": "Dzorwulu, Accra",
      "price": 2800,
      "paymentFlexibility": "Quarterly",
      "roomType": "Apartment",
      "bedrooms": 2,
      "bathrooms": 2,
      "area": 110,
      "description": "Spacious 2-bedroom apartment in a prime location. Fully furnished with modern appliances. Ideal for professionals or small families.",
      "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "tour": "https://my.matterport.com/show/?m=SxQLZvJ8qFj",
      "verified": true,
      "landlordName": "David Ampofo",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Furnished", "Wi-Fi", "Security", "Parking", "Modern Appliances"]
    },
    {
      "id": "prop-012",
      "title": "Studio Apartment · Osu",
      "location": "Osu, Accra",
      "price": 1500,
      "paymentFlexibility": "Monthly",
      "roomType": "Studio",
      "bedrooms": 1,
      "bathrooms": 1,
      "area": 45,
      "description": "Compact studio in the heart of Osu. Walking distance to restaurants, shops, and nightlife. Perfect for young professionals seeking vibrant area.",
      "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "tour": "https://my.matterport.com/show/?m=BM7s6FDX6zF",
      "verified": true,
      "landlordName": "Adjoa Mensah",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Wi-Fi", "Furnished", "Security", "Prime Location"]
    },
    {
      "id": "prop-013",
      "title": "Shared Room · East Legon",
      "location": "East Legon, Accra",
      "price": 500,
      "paymentFlexibility": "Monthly",
      "roomType": "Shared",
      "bedrooms": 1,
      "bathrooms": 1,
      "area": 22,
      "description": "Affordable shared room in a well-located house. Close to universities and business areas. Utilities and Wi-Fi included. Clean and modern.",
      "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
      "tour": "",
      "verified": true,
      "landlordName": "Emmanuel Quaye",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Utilities Included", "Wi-Fi", "Security", "Shared Kitchen"]
    },
    {
      "id": "prop-014",
      "title": "Luxury Studio · Airport Ridge",
      "location": "Airport Ridge, Takoradi",
      "price": 1100,
      "paymentFlexibility": "Monthly or Quarterly",
      "roomType": "Studio",
      "bedrooms": 1,
      "bathrooms": 1,
      "area": 50,
      "description": "Modern studio apartment with premium finishes. Close to airport and business district. Secure compound with 24/7 security. Ideal for frequent travelers.",
      "image": "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&h=600&fit=crop",
      "tour": "",
      "verified": true,
      "landlordName": "Patience Asare",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["24/7 Security", "Wi-Fi", "Parking", "Premium Finishes", "AC"]
    },
    {
      "id": "prop-015",
      "title": "3-Bed Family Home · Tema",
      "location": "Tema, Greater Accra",
      "price": 3000,
      "paymentFlexibility": "Quarterly",
      "roomType": "Apartment",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": 150,
      "description": "Spacious family home with large compound. Perfect for families. Close to schools, markets, and transport hubs. Safe neighborhood.",
      "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "tour": "https://my.matterport.com/show/?m=BM7s6FDX6zF",
      "verified": true,
      "landlordName": "Samuel Adjei",
      "landlordPhone": "+233 XX XXX XXXX",
      "amenities": ["Large Compound", "Security", "Parking", "Family-Friendly", "Schools Nearby"]
    }
  ]
};

// Load properties from JSON file (with embedded fallback)
async function loadPropertiesFromJSON() {
  // First try to fetch from JSON file (primary source)
  try {
    const response = await fetch(LISTINGS_DATA_URL);
    if (response.ok) {
      const data = await response.json();
      if (data.listings && Array.isArray(data.listings) && data.listings.length > 0) {
        console.log(`✅ Loaded ${data.listings.length} listings from JSON file`);
        return data.listings.map(listing => ({
          ...listing,
          id: listing.id || crypto.randomUUID()
        }));
      } else {
        console.warn("JSON file loaded but no listings found, using embedded data");
      }
    } else {
      console.warn(`JSON file fetch returned status ${response.status}, using embedded data`);
    }
  } catch (error) {
    console.warn("JSON file not available, using embedded data:", error.message);
  }
  
  // Fallback to embedded data if JSON file is not available
  if (EMBEDDED_LISTINGS_DATA && EMBEDDED_LISTINGS_DATA.listings && Array.isArray(EMBEDDED_LISTINGS_DATA.listings)) {
    const listings = EMBEDDED_LISTINGS_DATA.listings.map(listing => ({
      ...listing,
      id: listing.id || crypto.randomUUID()
    }));
    console.log(`✅ Loaded ${listings.length} listings from embedded data (fallback)`);
    return listings;
  }
  
  // Final fallback to default properties
  console.warn("No data sources available, using default properties");
  return getDefaultProperties();
}

function getDefaultProperties() {
  return [
  {
    id: crypto.randomUUID(),
    title: "Modern 2-Bed Apartment · East Legon",
    location: "East Legon, Accra",
    price: 3200,
    paymentFlexibility: "Monthly or Quarterly",
    roomType: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    description:
      "Furnished apartment with backup power, Wi-Fi, and proximity to business hubs. Employer-backed payment guaranteed.",
    image:
      "https://res.cloudinary.com/dv9yh8w46/image/upload/w_800,q_auto/v1730981440/east-legon-apartment.jpg",
    tour: "https://my.matterport.com/show/?m=BM7s6FDX6zF",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Studio Loft · Osu",
    location: "Osu, Accra",
    price: 1800,
    paymentFlexibility: "Monthly",
    roomType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 52,
    description:
      "Bright loft with 3D Smart Tour available. Ideal for young professionals who want nightlife and short commutes.",
    image:
      "https://res.cloudinary.com/dv9yh8w46/image/upload/w_800,q_auto/v1730981440/osu-loft.jpg",
    tour: "",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Family Home · Tema Community 10",
    location: "Tema Community 10",
    price: 2500,
    paymentFlexibility: "Quarterly",
    roomType: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: 140,
    description:
      "Spacious home with private compound and community security. Tenant reputation score of previous tenant: 4.8/5.",
    image:
      "https://res.cloudinary.com/dv9yh8w46/image/upload/w_800,q_auto/v1730981440/tema-family-home.jpg",
    tour: "",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Cozy Shared Room · Adum",
    location: "Adum, Kumasi",
    price: 450,
    paymentFlexibility: "Monthly",
    roomType: "Shared",
    bedrooms: 1,
    bathrooms: 1,
    area: 25,
    description:
      "Comfortable shared room in a safe, well-maintained house. Perfect for students or young professionals. Utilities included.",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
    tour: "",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Private Room with Ensuite · Airport Residential",
    location: "Airport Residential, Accra",
    price: 1200,
    paymentFlexibility: "Monthly or Quarterly",
    roomType: "Private",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    description:
      "Private room with ensuite bathroom in a modern house. Shared kitchen and living area. Close to airport and business district.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    tour: "",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Luxury 3-Bed Apartment · Cantonments",
    location: "Cantonments, Accra",
    price: 4500,
    paymentFlexibility: "Quarterly",
    roomType: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    description:
      "Premium furnished apartment with modern amenities, security, and backup power. Ideal for families or executives.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    tour: "https://my.matterport.com/show/?m=BM7s6FDX6zF",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Affordable Studio · Labone",
    location: "Labone, Accra",
    price: 900,
    paymentFlexibility: "Monthly",
    roomType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 40,
    description:
      "Budget-friendly studio apartment in a quiet neighborhood. Perfect for first-time renters. All utilities included.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    tour: "",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Shared Room · University Area",
    location: "University Area, Cape Coast",
    price: 350,
    paymentFlexibility: "Monthly",
    roomType: "Shared",
    bedrooms: 1,
    bathrooms: 1,
    area: 20,
    description:
      "Student-friendly shared accommodation near university. Safe, affordable, and well-maintained. Perfect for students.",
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800",
    tour: "",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Modern 1-Bed Apartment · Spintex",
    location: "Spintex, Accra",
    price: 2000,
    paymentFlexibility: "Monthly or Quarterly",
    roomType: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    description:
      "Modern apartment with contemporary finishes. Close to shopping malls and business areas. Secure compound with parking.",
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800",
    tour: "",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Private Room · Takoradi",
    location: "Takoradi, Western Region",
    price: 600,
    paymentFlexibility: "Monthly",
    roomType: "Private",
    bedrooms: 1,
    bathrooms: 1,
    area: 30,
    description:
      "Private room in a family home. Shared kitchen and living space. Peaceful neighborhood with good security.",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
    tour: "",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "2-Bed Apartment · Dzorwulu",
    location: "Dzorwulu, Accra",
    price: 2800,
    paymentFlexibility: "Quarterly",
    roomType: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 110,
    description:
      "Spacious 2-bedroom apartment in a prime location. Fully furnished with modern appliances. Ideal for professionals.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    tour: "",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Studio Apartment · Osu",
    location: "Osu, Accra",
    price: 1500,
    paymentFlexibility: "Monthly",
    roomType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    description:
      "Compact studio in the heart of Osu. Walking distance to restaurants, shops, and nightlife. Perfect for young professionals.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    tour: "",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Shared Room · East Legon",
    location: "East Legon, Accra",
    price: 500,
    paymentFlexibility: "Monthly",
    roomType: "Shared",
    bedrooms: 1,
    bathrooms: 1,
    area: 22,
    description:
      "Affordable shared room in a well-located house. Close to universities and business areas. Utilities and Wi-Fi included.",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
    tour: "",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Luxury Studio · Airport Ridge",
    location: "Airport Ridge, Takoradi",
    price: 1100,
    paymentFlexibility: "Monthly or Quarterly",
    roomType: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 50,
    description:
      "Modern studio apartment with premium finishes. Close to airport and business district. Secure compound with 24/7 security.",
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800",
    tour: "",
    verified: true,
  },
  {
    id: crypto.randomUUID(),
    title: "3-Bed Family Home · Tema",
    location: "Tema, Greater Accra",
    price: 3000,
    paymentFlexibility: "Quarterly",
    roomType: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    description:
      "Spacious family home with large compound. Perfect for families. Close to schools, markets, and transport hubs.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    tour: "",
    verified: true,
  },
];

async function loadProperties() {
  // First try to load from JSON file
  const jsonProperties = await loadPropertiesFromJSON();
  
  // Then check localStorage for user-added properties
  const saved = localStorage.getItem(STORAGE_KEY);
  let userAddedProperties = [];
  
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        // Filter out properties that are already in JSON (by ID)
        const jsonIds = new Set(jsonProperties.map(p => p.id));
        userAddedProperties = parsed.filter(p => !jsonIds.has(p.id));
      }
    } catch (error) {
      console.warn("Failed to parse saved properties", error);
    }
  }
  
  // Combine JSON properties with user-added ones
  return [...jsonProperties, ...userAddedProperties];
}

// Global properties array - must be accessible everywhere
var properties = [];
let savedPropertyIds = loadSavedProperties();

// IMMEDIATE FALLBACK: Pre-load embedded data to ensure properties are always available
(function preloadProperties() {
  if (EMBEDDED_LISTINGS_DATA && EMBEDDED_LISTINGS_DATA.listings && Array.isArray(EMBEDDED_LISTINGS_DATA.listings)) {
    properties = EMBEDDED_LISTINGS_DATA.listings.map(listing => ({
      ...listing,
      id: listing.id || crypto.randomUUID()
    }));
    console.log(`✅ Pre-loaded ${properties.length} properties from embedded data (immediate fallback)`);
    console.log(`✅ Properties array now exists:`, typeof properties !== 'undefined', 'Length:', properties.length);
  } else {
    console.error("❌ EMBEDDED_LISTINGS_DATA not found or invalid!");
  }
})();

function saveProperties() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 0,
  }).format(amount);
}

function loadSavedProperties() {
  const saved = localStorage.getItem(FAVORITES_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.warn("Failed to parse saved homes", error);
  }
  return [];
}

function persistSavedProperties() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(savedPropertyIds));
}

function createPropertyCard(property, options = {}) {
  const { showRemove = false } = options;
  const card = document.createElement("article");
  card.className = "property-card";

  const imgContainer = document.createElement("div");
  imgContainer.style.position = "relative";
  
  const img = document.createElement("img");
  img.src =
    property.image ||
    "https://res.cloudinary.com/dv9yh8w46/image/upload/w_800,q_auto/v1730981545/rent4less-placeholder.jpg";
  img.alt = property.title;
  imgContainer.appendChild(img);
  
  // Verified badge
  if (property.verified) {
    const verifiedBadge = document.createElement("span");
    verifiedBadge.style.cssText = "position: absolute; top: 18px; left: 18px; background: var(--color-secondary); color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.2);";
    verifiedBadge.textContent = "✓ Verified";
    imgContainer.appendChild(verifiedBadge);
  }
  
  // 3D Tour badge
  if (property.tour && property.tour.trim() !== "") {
    const tourBadge = document.createElement("span");
    tourBadge.style.cssText = "position: absolute; top: 18px; right: 18px; background: var(--color-primary); color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.2);";
    tourBadge.textContent = "3D Tour";
    imgContainer.appendChild(tourBadge);
  }
  
  card.appendChild(imgContainer);

  const favoriteButton = document.createElement("button");
  favoriteButton.className = "favorite-toggle";
  favoriteButton.dataset.id = property.id;
  favoriteButton.dataset.active = savedPropertyIds.includes(property.id)
    ? "true"
    : "false";
  favoriteButton.innerHTML =
    favoriteButton.dataset.active === "true" ? "★ Saved" : "☆ Save";
  favoriteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFavorite(property.id);
  });
  card.appendChild(favoriteButton);

  const content = document.createElement("div");
  content.className = "property-content";

  const title = document.createElement("h4");
  title.textContent = property.title;
  content.appendChild(title);

  const location = document.createElement("p");
  location.className = "property-location";
  location.textContent = property.location;
  content.appendChild(location);

  const price = document.createElement("p");
  price.className = "property-price";
  const sixMonthAdvance = property.price * 6;
  price.innerHTML = `<span class="estimate-highlight">${formatCurrency(
    property.price
  )}</span> per month<br><small style="color: var(--color-muted); font-size: 0.85rem;">6-month advance: ${formatCurrency(sixMonthAdvance)}</small>`;
  content.appendChild(price);

  const meta = document.createElement("div");
  meta.className = "property-meta";
  if (property.roomType) {
    meta.innerHTML += `<span>🏠 ${property.roomType}</span>`;
  }
  if (property.bedrooms) {
    meta.innerHTML += `<span>🛏 ${property.bedrooms} bed${
      property.bedrooms > 1 ? "s" : ""
    }</span>`;
  }
  if (property.bathrooms) {
    meta.innerHTML += `<span>🛁 ${property.bathrooms} bath${
      property.bathrooms > 1 ? "s" : ""
    }</span>`;
  }
  if (property.area) {
    meta.innerHTML += `<span>📐 ${property.area} m²</span>`;
  }
  content.appendChild(meta);

  const description = document.createElement("p");
  description.textContent = property.description;
  content.appendChild(description);

  const actions = document.createElement("div");
  actions.className = "property-actions";
  const pill = document.createElement("span");
  pill.className = "property-pill";
  pill.textContent = property.paymentFlexibility || "Flexible";
  actions.appendChild(pill);

  if (property.tour) {
    const tourButton = document.createElement("button");
    tourButton.type = "button";
    tourButton.textContent = "View 3D Tour";
    tourButton.addEventListener("click", (event) => {
      event.stopPropagation();
      open3DTourModal(property);
    });
    actions.appendChild(tourButton);
  }

  const requestViewingButton = document.createElement("button");
  requestViewingButton.type = "button";
  requestViewingButton.className = "button button-primary";
  requestViewingButton.style.cssText = "flex: 1; padding: 10px 16px; font-weight: 600;";
  requestViewingButton.textContent = "Request Viewing";
  requestViewingButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openViewingRequestModal(property.id);
  });
  actions.appendChild(requestViewingButton);

  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.textContent = "View details";
  detailsButton.style.cssText = "flex: 1; padding: 10px 16px;";
  detailsButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openPropertyModal(property);
  });
  actions.appendChild(detailsButton);

  if (showRemove) {
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleFavorite(property.id, { forceRemove: true });
    });
    actions.appendChild(removeButton);
  }

  content.appendChild(actions);
  card.appendChild(content);

  card.addEventListener("click", () => openPropertyModal(property));

  return card;
}

function renderProperties(list = null, target = null, options = {}) {
  // If no target provided, try to find listingGrid
  if (!target) {
    target = document.getElementById("listingGrid");
  }
  if (!target) {
    console.error("❌ Cannot render: listingGrid element not found");
    return;
  }
  
  target.innerHTML = "";
  
  // Determine which list to use
  let propertiesToRender = [];
  if (list && Array.isArray(list) && list.length > 0) {
    propertiesToRender = list;
  } else if (properties && Array.isArray(properties) && properties.length > 0) {
    propertiesToRender = properties;
  } else {
    console.warn("⚠️ No properties to render. List:", list, "Properties:", properties);
  }
  
  if (!propertiesToRender.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    const message = (!properties || properties.length === 0) 
      ? "Loading properties..." 
      : "No properties found for the selected filters. Try adjusting your budget or payment plan.";
    emptyState.innerHTML = `
      <p style="text-align: center; padding: 48px; color: var(--color-muted);">
        ${message}
      </p>
    `;
    target.appendChild(emptyState);
    return;
  }
  
  console.log(`🔄 Rendering ${propertiesToRender.length} property cards...`);
  propertiesToRender.forEach((property) => {
    try {
      const card = createPropertyCard(property, options);
      if (card) {
        target.appendChild(card);
      }
    } catch (error) {
      console.error("❌ Error creating property card:", error, property);
    }
  });
  console.log(`✅ Rendered ${propertiesToRender.length} property cards`);
}

function renderSavedProperties() {
  const savedGridEl = document.getElementById("savedGrid");
  if (!savedGridEl) return;
  
  const savedList = savedPropertyIds
    .map((id) => properties.find((property) => property.id === id))
    .filter(Boolean);
  if (!savedList.length) {
    savedGridEl.innerHTML =
      "<p class=\"empty-state\">You have no saved homes yet. Tap the ☆ Save button on any property to create your shortlist.</p>";
    return;
  }
  renderProperties(savedList, savedGridEl, { showRemove: true });
}

function resetForm(form) {
  form.reset();
  const firstField = form.querySelector("input, select, textarea");
  if (firstField) {
    firstField.focus();
  }
}

function handlePropertySubmit(event) {
  event.preventDefault();
  const formData = new FormData(propertyForm);
  const newProperty = {
    id: crypto.randomUUID(),
    title: formData.get("title").trim(),
    location: formData.get("location").trim(),
    price: Number(formData.get("price")),
    paymentFlexibility: formData.get("paymentFlexibility"),
    roomType: formData.get("roomType") || "Apartment",
    bedrooms: Number(formData.get("bedrooms")) || null,
    bathrooms: Number(formData.get("bathrooms")) || null,
    area: Number(formData.get("area")) || null,
    description: formData.get("description").trim(),
    image: formData.get("image").trim(),
    tour: formData.get("tour").trim(),
    verified: false, // New listings need verification
  };

  properties = [newProperty, ...properties];
  saveProperties();
  renderWithActiveFilters();
  renderSavedProperties();
  resetForm(propertyForm);

  const submitButton = propertyForm.querySelector("button[type='submit']");
  if (submitButton) {
    submitButton.textContent = "Published!";
    submitButton.disabled = true;
    setTimeout(() => {
      submitButton.textContent = "Publish property";
      submitButton.disabled = false;
    }, 2000);
  }
}

function getFilteredProperties() {
  // Ensure properties array is available
  if (!properties || properties.length === 0) {
    console.warn("⚠️ Properties array is empty. Waiting for data to load...");
    return [];
  }
  
  const budgetFilterEl = document.getElementById("budgetFilter");
  const flexibilityFilterEl = document.getElementById("flexibilityFilter");
  const locationFilter = document.getElementById("locationFilter");
  const roomTypeFilter = document.getElementById("roomTypeFilter");
  
  const budgetValue = budgetFilterEl ? Number(budgetFilterEl.value) : 0;
  const flexibilityValue = flexibilityFilterEl?.value || "Any";
  const locationValue = locationFilter?.value || "Any";
  const roomTypeValue = roomTypeFilter?.value || "Any";

  return properties.filter((property) => {
    const matchesBudget = !budgetValue || budgetValue === 0 || property.price <= budgetValue;
    const matchesFlexibility =
      flexibilityValue === "Any" ||
      property.paymentFlexibility === flexibilityValue;
    
    // Location filter - check if property location contains the selected city
    const matchesLocation = locationValue === "Any" || 
      property.location.toLowerCase().includes(locationValue.toLowerCase());
    
    // Room type filter
    const matchesRoomType = roomTypeValue === "Any" || 
      property.roomType === roomTypeValue;
    
    return matchesBudget && matchesFlexibility && matchesLocation && matchesRoomType;
  });
}

function renderWithActiveFilters() {
  const listingGridEl = document.getElementById("listingGrid");
  if (!listingGridEl) {
    console.warn("⚠️ listingGrid element not found");
    return;
  }
  
  // Ensure properties array exists and has data
  if (!properties || !Array.isArray(properties) || properties.length === 0) {
    console.error("❌ Properties array is empty or invalid:", properties);
    listingGridEl.innerHTML = '<div style="text-align: center; padding: 48px; color: var(--color-muted);"><p>Loading properties...</p></div>';
    return;
  }
  
  const filtered = getFilteredProperties();
  console.log(`🔄 Rendering ${filtered.length} filtered properties out of ${properties.length} total`);
  
  // Always render, even if filtered is empty (will show "no matches" message)
  renderProperties(filtered, listingGridEl);
  
  // Update count display
  const countElement = document.getElementById("listingsCountNumber");
  if (countElement) {
    countElement.textContent = filtered.length;
  }
}

function applyFilters() {
  renderWithActiveFilters();
}

function resetFilters() {
  const budgetFilterEl = document.getElementById("budgetFilter");
  const flexibilityFilterEl = document.getElementById("flexibilityFilter");
  const locationFilter = document.getElementById("locationFilter");
  const roomTypeFilter = document.getElementById("roomTypeFilter");
  
  if (budgetFilterEl) budgetFilterEl.value = "";
  if (flexibilityFilterEl) flexibilityFilterEl.value = "Any";
  if (locationFilter) locationFilter.value = "Any";
  if (roomTypeFilter) roomTypeFilter.value = "Any";
  renderWithActiveFilters();
}

function calculateAffordability({ income, household = 1, neighborhood = "" }) {
  if (!income || income <= 0) {
    return null;
  }

  const sanitizedHousehold = household > 0 ? household : 1;
  const recommendedRatio = 0.35;
  const stretchRatio = 0.45;

  const recommendedRent = Math.round((income * recommendedRatio) / 50) * 50;
  const stretchRent = Math.round((income * stretchRatio) / 50) * 50;
  const suggestedPlan = income < 4000 ? "Monthly" : "Monthly or Quarterly";
  const affordabilityPercent = ((recommendedRent / income) * 100).toFixed(1);

  const safeWidth = stretchRent
    ? Math.min(Math.max((recommendedRent / stretchRent) * 100, 8), 100).toFixed(1)
    : 0;
  const cursorPercent = stretchRent
    ? Math.min(Math.max((recommendedRent / stretchRent) * 100, 6), 96).toFixed(1)
    : 0;

  const matchingProperties = properties
    .filter((property) => property.price <= stretchRent)
    .slice(0, 3);

  return {
    income,
    household: sanitizedHousehold,
    neighborhood,
    recommendedRent,
    stretchRent,
    suggestedPlan,
    affordabilityPercent,
    safeWidth,
    cursorPercent,
    matchingProperties,
  };
}

function renderCalculatorSummary(target, data, options = {}) {
  if (!target) return;

  const placeholderMessage =
    options.placeholderMessage ||
    "Enter your income to discover a realistic monthly rent and matched homes.";

  if (!data) {
    target.innerHTML = `
      <div class="calc-placeholder">
        <p class="summary-eyebrow">Estimated rent budget</p>
        <p class="calc-empty-copy">${placeholderMessage}</p>
      </div>
    `;
    return;
  }

  const matchesMarkup = data.matchingProperties
    .map((property) => {
      const town = property.location.split(",")[0];
      return `
        <div class="summary-listing">
          <span class="listing-pill">${town}</span>
          <div>
            <strong>${property.title}</strong>
            <p>${formatCurrency(property.price)} &bull; ${property.paymentFlexibility}</p>
          </div>
        </div>
      `;
    })
    .join("");

  target.innerHTML = `
    <div class="calculator-preview__summary calc-live-summary">
      <p class="summary-eyebrow">Estimated rent budget</p>
      <p class="summary-figure">${formatCurrency(data.recommendedRent)}<span>/mo</span></p>
      <p class="calc-subtext">≈ ${data.affordabilityPercent}% of take-home pay</p>
      <div class="summary-meter">
        <span class="summary-meter__bar summary-meter__bar--stretch" style="width:100%"></span>
        <span class="summary-meter__bar summary-meter__bar--safe" style="width:${data.safeWidth}%"></span>
        <span class="summary-meter__cursor" style="left:${data.cursorPercent}%"></span>
      </div>
      <ul class="calc-stats">
        <li><span>Suggested plan</span><strong>${data.suggestedPlan}</strong></li>
        <li><span>Stretch ceiling</span><strong>${formatCurrency(data.stretchRent)}</strong></li>
        <li><span>Household size</span><strong>${data.household}</strong></li>
      </ul>
      <p class="summary-subhead">Matched homes</p>
      ${
        data.matchingProperties.length
          ? `<div class="calc-matches">${matchesMarkup}</div>`
          : `<p class="summary-empty">No homes match yet — share your preferences so we can alert you the moment new listings go live.</p>`
      }
      ${
        data.neighborhood
          ? `<p class="calc-subtext">Tip: we’ll prioritise homes around <strong>${data.neighborhood}</strong> when new listings arrive.</p>`
          : ""
      }
    </div>
  `;
}

function setupCalculatorForm(formElement, resultContainer, options = {}) {
  if (!formElement || !resultContainer) return;

  const { defaults, onResult, placeholderMessage, syncOnInit = true } = options;

  if (defaults) {
    if (defaults.income != null && formElement.elements["income"]) {
      formElement.elements["income"].value = defaults.income;
    }
    if (defaults.household != null && formElement.elements["household"]) {
      formElement.elements["household"].value = defaults.household;
    }
    if (defaults.neighborhood != null && formElement.elements["neighborhood"]) {
      formElement.elements["neighborhood"].value = defaults.neighborhood;
    }
  }

  const initialData = defaults
    ? calculateAffordability({
        income: Number(defaults.income),
        household: Number(defaults.household) || 1,
        neighborhood: defaults.neighborhood?.trim() || "",
      })
    : null;

  if (initialData) {
    renderCalculatorSummary(resultContainer, initialData, { placeholderMessage });
    if (syncOnInit) {
      onResult?.(initialData);
    }
  } else {
    renderCalculatorSummary(resultContainer, null, { placeholderMessage });
  }

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formElement);
    const income = Number(formData.get("income"));
    const household = Number(formData.get("household")) || 1;
    const neighborhood = formData.get("neighborhood")?.trim();

    const data = calculateAffordability({ income, household, neighborhood });
    if (!data) {
      renderCalculatorSummary(resultContainer, null, { placeholderMessage });
      return;
    }

    renderCalculatorSummary(resultContainer, data, { placeholderMessage });
    onResult?.(data);
  });
}

function setupModals() {
  const triggers = document.querySelectorAll("[data-modal-target]");
  const closeButtons = document.querySelectorAll("[data-close]");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modalId = trigger.getAttribute("data-modal-target");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("open");
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".modal")?.classList.remove("open");
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      event.target.classList.remove("open");
    }
  });
}

function openPropertyModal(property) {
  if (!propertyModal || !propertyModalContent) return;
  const isSaved = savedPropertyIds.includes(property.id);
  propertyModalContent.innerHTML = `
    <div class="modal-body">
      <div class="modal-media">
        <img src="${
          property.image ||
          "https://res.cloudinary.com/dv9yh8w46/image/upload/w_800,q_auto/v1730981545/rent4less-placeholder.jpg"
        }" alt="${property.title}" />
      </div>
      <div class="modal-info">
        <h3>${property.title}</h3>
        <p>${property.location}</p>
        <div class="modal-meta">
          <span>💰 ${formatCurrency(property.price)} / month</span>
          <span>💳 6-month advance: ${formatCurrency(property.price * 6)}</span>
          ${
            property.bedrooms
              ? `<span>🛏 ${property.bedrooms} bed${
                  property.bedrooms > 1 ? "s" : ""
                }</span>`
              : ""
          }
          ${
            property.bathrooms
              ? `<span>🛁 ${property.bathrooms} bath${
                  property.bathrooms > 1 ? "s" : ""
                }</span>`
              : ""
          }
          ${
            property.area
              ? `<span>📐 ${property.area} m²</span>`
              : ""
          }
        </div>
        <p>${property.description}</p>
        ${
          property.amenities && property.amenities.length > 0
            ? `<div style="margin: 20px 0;">
                <h5 style="margin-bottom: 10px;">Amenities</h5>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                  ${property.amenities.map(amenity => `<span style="background: var(--color-primary-soft); color: var(--color-primary-dark); padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">${amenity}</span>`).join("")}
                </div>
              </div>`
            : ""
        }
        <div class="modal-actions">
          <button class="button" data-favorite-modal="${
            property.id
          }">${isSaved ? "★ Saved" : "☆ Save home"}</button>
          <button class="button button-primary" data-request-viewing="${
            property.id
          }">Request Viewing</button>
          ${
            property.tour
              ? `<button class="button button-ghost" data-3d-tour="${property.id}">View 3D Tour</button>`
              : `<a class="button button-ghost" href="tenant-tools.html">Request a 3D tour</a>`
          }
        </div>
        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--color-border);">
          <h5>Landlord assurance</h5>
          <ul style="margin: 12px 0; padding-left: 0; list-style: none;">
            <li style="padding-left: 24px; position: relative; margin-bottom: 8px;">
              <span style="position: absolute; left: 0; top: 6px; width: 8px; height: 8px; border-radius: 50%; background: var(--color-primary);"></span>
              Tenant reputation score tracking after every lease cycle.
            </li>
            <li style="padding-left: 24px; position: relative; margin-bottom: 8px;">
              <span style="position: absolute; left: 0; top: 6px; width: 8px; height: 8px; border-radius: 50%; background: var(--color-primary);"></span>
              Optional payroll deduction through verified employers.
            </li>
            <li style="padding-left: 24px; position: relative;">
              <span style="position: absolute; left: 0; top: 6px; width: 8px; height: 8px; border-radius: 50%; background: var(--color-primary);"></span>
              Escrow protection from partnering banks &amp; fintechs.
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;
  propertyModal.classList.add("open");

  const modalFavorite = propertyModalContent.querySelector(
    "[data-favorite-modal]"
  );
  modalFavorite?.addEventListener("click", () => {
    toggleFavorite(property.id);
  });

  const requestViewingBtn = propertyModalContent.querySelector(
    "[data-request-viewing]"
  );
  requestViewingBtn?.addEventListener("click", () => {
    openViewingRequestModal(property.id);
  });

  const tourBtn = propertyModalContent.querySelector("[data-3d-tour]");
  tourBtn?.addEventListener("click", () => {
    open3DTourModal(property);
  });
}

function open3DTourModal(property) {
  if (!property.tour) {
    alert("3D tour not available for this property. Please contact us to request a tour.");
    return;
  }
  
  const modal = document.createElement("div");
  modal.className = "modal open";
  modal.style.display = "flex";
  modal.style.zIndex = "2000";
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 1200px; padding: 0; position: relative;">
      <button class="modal-close" data-close style="position: absolute; top: 20px; right: 20px; z-index: 10; background: rgba(255,255,255,0.9); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 24px; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">&times;</button>
      <div style="padding: 32px 32px 24px; background: var(--color-surface);">
        <h3 style="margin: 0 0 8px; color: var(--color-ink);">${property.title} - 3D Virtual Tour</h3>
        <p style="margin: 0; color: var(--color-muted);">${property.location}</p>
        ${property.price ? `<p style="margin: 8px 0 0; color: var(--color-primary); font-weight: 600;">${formatCurrency(property.price)}/month</p>` : ""}
      </div>
      <div class="tour-embed" style="width: 100%; height: 600px; border-radius: 0; background: #000; position: relative;">
        <iframe 
          src="${property.tour}" 
          title="3D tour for ${property.title}" 
          allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
          style="width: 100%; height: 100%; border: 0;"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
      <div style="padding: 24px 32px 32px; background: var(--color-surface);">
        <p style="margin: 0 0 12px; color: var(--color-muted); font-size: 0.9rem;">
          <strong>Navigation:</strong> Use your mouse or touch to navigate the 3D tour. Click and drag to look around, scroll to zoom in/out.
        </p>
        <button class="button button-primary" data-request-viewing="${property.id}" style="margin-top: 8px;">
          Request Viewing for This Property
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const closeBtn = modal.querySelector("[data-close]");
  closeBtn.addEventListener("click", () => {
    modal.remove();
  });
  
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  // Add viewing request button handler
  const requestBtn = modal.querySelector("[data-request-viewing]");
  if (requestBtn) {
    requestBtn.addEventListener("click", () => {
      modal.remove();
      openViewingRequestModal(property.id);
    });
  }
}

function openViewingRequestModal(propertyId) {
  const viewingModal = document.getElementById("viewingRequestModal");
  const viewingForm = document.getElementById("viewingRequestForm");
  const propertyIdInput = document.getElementById("viewingPropertyId");
  const modalTitle = viewingModal?.querySelector("h4");
  
  if (!viewingModal || !viewingForm || !propertyIdInput) return;
  
  // Find the property
  const property = properties.find(p => p.id === propertyId);
  
  // Update modal title with property info
  if (modalTitle && property) {
    modalTitle.innerHTML = `Request a Viewing<br><small style="font-size: 0.85rem; color: var(--color-muted); font-weight: 400;">${property.title} - ${property.location}</small>`;
  }
  
  propertyIdInput.value = propertyId;
  viewingModal.classList.add("open");
  
  // Close property modal when opening viewing request
  if (propertyModal) {
    propertyModal.classList.remove("open");
  }
  
  // Focus on first input
  const firstInput = viewingForm.querySelector("input[type='text'], input[type='tel']");
  if (firstInput) {
    setTimeout(() => firstInput.focus(), 100);
  }
}

function handleViewingRequestSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const propertyId = formData.get("propertyId");
  const property = properties.find(p => p.id === propertyId);
  
  if (!property) {
    alert("Error: Property not found. Please try again.");
    return;
  }
  
  const data = {
    propertyId,
    propertyTitle: property.title,
    propertyLocation: property.location,
    propertyPrice: property.price,
    name: formData.get("name").trim(),
    phone: formData.get("phone").trim(),
    email: formData.get("email")?.trim() || "",
    preferredDate: formData.get("preferredDate") || "",
    message: formData.get("message")?.trim() || ""
  };
  
  // Validate required fields
  if (!data.name || !data.phone) {
    alert("Please fill in all required fields (Name and Phone Number).");
    return;
  }
  
  // In production, this would send to Google Sheets/backend
  console.log("Viewing Request:", data);
  
  // Save to localStorage for now (in production, send to backend)
  const viewingRequests = JSON.parse(localStorage.getItem("rent4less-viewing-requests") || "[]");
  viewingRequests.push({
    ...data,
    timestamp: new Date().toISOString(),
    status: "pending"
  });
  localStorage.setItem("rent4less-viewing-requests", JSON.stringify(viewingRequests));
  
  // Create WhatsApp message
  const whatsappMessage = `🏠 New Viewing Request - Rent4Less

Property: ${data.propertyTitle}
Location: ${data.propertyLocation}
Price: GHS ${data.propertyPrice}/month

Tenant Details:
Name: ${data.name}
Phone: ${data.phone}
${data.email ? `Email: ${data.email}\n` : ""}${data.preferredDate ? `Preferred Date: ${data.preferredDate}\n` : ""}${data.message ? `Message: ${data.message}` : ""}

Please contact the tenant to schedule the viewing.`;

  const whatsappUrl = `https://wa.me/233XXXXXXXXX?text=${encodeURIComponent(whatsappMessage)}`;
  
  // Show success message
  const successMessage = `✅ Viewing request submitted successfully!\n\nProperty: ${data.propertyTitle}\n\nOur team will contact you via WhatsApp within 24 hours to confirm your viewing appointment.`;
  alert(successMessage);
  
  // Open WhatsApp (optional - you can comment this out if you don't want it to auto-open)
  // window.open(whatsappUrl, "_blank");
  
  // Close modal and reset form
  const viewingModal = document.getElementById("viewingRequestModal");
  if (viewingModal) {
    viewingModal.classList.remove("open");
  }
  
  // Reset form
  event.target.reset();
  
  // Reset modal title
  const modalTitle = viewingModal?.querySelector("h4");
  if (modalTitle) {
    modalTitle.textContent = "Request a Viewing";
  }
}

function toggleFavorite(propertyId, options = {}) {
  const { forceRemove = false } = options;
  const isSaved = savedPropertyIds.includes(propertyId);
  if (isSaved || forceRemove) {
    savedPropertyIds = savedPropertyIds.filter((id) => id !== propertyId);
  } else {
    savedPropertyIds = [propertyId, ...savedPropertyIds];
  }
  persistSavedProperties();
  renderWithActiveFilters();
  renderSavedProperties();

  if (propertyModal?.classList.contains("open")) {
    const property = properties.find((item) => item.id === propertyId);
    if (property) {
      openPropertyModal(property);
    }
  }
}

async function init() {
  console.log("🚀 INIT FUNCTION CALLED");
  console.log("📄 Current page:", window.location.pathname);
  
  // Show loading state
  const listingGridEl = document.getElementById("listingGrid");
  console.log("🔍 listingGrid element found:", !!listingGridEl);
  
  if (listingGridEl) {
    listingGridEl.innerHTML = '<div style="text-align: center; padding: 48px; color: var(--color-muted);"><p>Loading properties...</p></div>';
  } else {
    console.error("❌ CRITICAL: listingGrid element NOT FOUND in DOM!");
    console.log("Available elements with 'listing' in id:", 
      Array.from(document.querySelectorAll('[id*="listing"]')).map(el => el.id)
    );
  }
  
  // IMMEDIATE FALLBACK: Load embedded data first to ensure we always have properties
  if (EMBEDDED_LISTINGS_DATA && EMBEDDED_LISTINGS_DATA.listings && Array.isArray(EMBEDDED_LISTINGS_DATA.listings)) {
    const embeddedListings = EMBEDDED_LISTINGS_DATA.listings.map(listing => ({
      ...listing,
      id: listing.id || crypto.randomUUID()
    }));
    console.log(`✅ Pre-loaded ${embeddedListings.length} listings from embedded data`);
    properties = embeddedListings; // Set immediately as fallback
  }
  
  try {
    // Load properties from JSON file (will override embedded if successful)
    console.log("🔄 Starting to load properties from JSON...");
    const loadedProperties = await loadProperties();
    
    if (loadedProperties && loadedProperties.length > 0) {
      properties = loadedProperties;
      console.log(`✅ Loaded ${properties.length} properties from JSON file`);
    } else {
      console.warn("⚠️ JSON file returned no properties, using embedded data");
    }
    
    // Log for debugging
    console.log(`✅ Total properties available: ${properties.length}`);
    console.log(`✅ Properties with 3D tours: ${properties.filter(p => p.tour && p.tour.trim() !== "").length}`);
    
    if (!properties || properties.length === 0) {
      console.error("❌ CRITICAL: No properties available at all!");
      if (listingGridEl) {
        listingGridEl.innerHTML = '<div style="text-align: center; padding: 48px; color: var(--color-secondary);"><p>Error: No properties found. Please contact support.</p></div>';
      }
      return;
    }
    
    // Render properties on listings page
    console.log("🔄 Rendering properties...");
    renderWithActiveFilters();
    renderSavedProperties();
    console.log("✅ Properties rendered successfully");
  } catch (error) {
    console.error("❌ Error initializing:", error);
    console.error("Error details:", error.stack);
    
    // Even on error, try to render embedded data if available
    if (properties && properties.length > 0) {
      console.log("⚠️ Error occurred but using available properties");
      renderWithActiveFilters();
      renderSavedProperties();
    } else {
      if (listingGridEl) {
        listingGridEl.innerHTML = '<div style="text-align: center; padding: 48px; color: var(--color-secondary);"><p>Error loading properties. Please refresh the page.</p><p style="font-size: 0.85rem; margin-top: 8px;">' + error.message + '</p></div>';
      }
    }
  }
  
  setupModals();
  setupEventListeners();
  
  const yearSpanEl = document.getElementById("year");
  if (yearSpanEl) {
    yearSpanEl.textContent = new Date().getFullYear();
  }

  const calculatorPlaceholder =
    "Enter your income to discover a realistic monthly rent and matched homes.";

  if (calculatorForm && calculatorResult) {
    setupCalculatorForm(calculatorForm, calculatorResult, {
      placeholderMessage: calculatorPlaceholder,
    });
  }

  if (heroCalculatorForm && heroCalculatorResult) {
    setupCalculatorForm(heroCalculatorForm, heroCalculatorResult, {
      defaults: { income: 7500, household: 3, neighborhood: "East Legon" },
      placeholderMessage: calculatorPlaceholder,
      syncOnInit: false,
      onResult: (data) => {
        renderCalculatorSummary(calculatorResult, data, {
          placeholderMessage: calculatorPlaceholder,
        });
        if (calculatorForm) {
          if (calculatorForm.elements["income"]) {
            calculatorForm.elements["income"].value = data.income;
          }
          if (calculatorForm.elements["household"]) {
            calculatorForm.elements["household"].value = data.household;
          }
          if (calculatorForm.elements["neighborhood"]) {
            calculatorForm.elements["neighborhood"].value = data.neighborhood || "";
          }
        }
      },
    });
  }
}

// Event listeners - set up after DOM is ready
function setupEventListeners() {
  const propertyFormEl = document.getElementById("propertyForm");
  const applyFiltersBtn = document.getElementById("applyFilters");
  const resetFiltersBtn = document.getElementById("resetFilters");
  
  propertyFormEl?.addEventListener("submit", handlePropertySubmit);
  applyFiltersBtn?.addEventListener("click", applyFilters);
  resetFiltersBtn?.addEventListener("click", resetFilters);
}

const viewingRequestForm = document.getElementById("viewingRequestForm");
viewingRequestForm?.addEventListener("submit", handleViewingRequestSubmit);

// Newsletter form handler
document.querySelectorAll(".newsletter-form").forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector("input[type='email']").value;
    if (email) {
      alert("Thank you for subscribing! We'll keep you updated on new listings and features.");
      form.reset();
    }
  });
});

// Initialize immediately when DOM is ready
// Force init to run after a short delay to ensure everything is ready
(function() {
  function runInit() {
    console.log("🔄 Attempting to run init()...");
    console.log("🔍 Properties before init:", typeof properties !== 'undefined' ? properties.length : 'undefined');
    init();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", runInit);
  } else {
    // DOM is already ready, run immediately
    setTimeout(runInit, 100);
  }
})();
}