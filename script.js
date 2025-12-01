// ============================================
// RENT4LESS - Main JavaScript
// ============================================

// Constants
const STORAGE_KEY = "rent4less-properties";
const FAVORITES_KEY = "rent4less-favorites";
const LISTINGS_DATA_URL = "data/listings.json";

// Global state
var properties = [];
var savedPropertyIds = [];

// DOM Elements (will be null until DOM is ready)
const propertyForm = document.getElementById("propertyForm");
const listingGrid = document.getElementById("listingGrid");
const savedGrid = document.getElementById("savedGrid");
const budgetFilter = document.getElementById("budgetFilter");
const locationFilter = document.getElementById("locationFilter");
const roomTypeFilter = document.getElementById("roomTypeFilter");
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

// ============================================
// PROPERTY DATA - Embedded listings
// ============================================
const EMBEDDED_LISTINGS = [
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
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
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
    "image": "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&h=600&fit=crop",
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
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "tour": "https://my.matterport.com/show/?m=BM7s6FDX6zF",
    "verified": true,
    "landlordName": "Samuel Adjei",
    "landlordPhone": "+233 XX XXX XXXX",
    "amenities": ["Large Compound", "Security", "Parking", "Family-Friendly", "Schools Nearby"]
  }
];

// Load properties immediately from embedded data
properties = EMBEDDED_LISTINGS;
window.properties = properties; // Make globally accessible

// ============================================
// UTILITY FUNCTIONS
// ============================================

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
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function persistSavedProperties() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(savedPropertyIds));
}

function saveProperties() {
  const userAdded = properties.filter(p => !EMBEDDED_LISTINGS.find(e => e.id === p.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userAdded));
}

// ============================================
// PROPERTY LOADING
// ============================================

async function loadPropertiesFromJSON() {
  try {
    const response = await fetch(LISTINGS_DATA_URL);
    if (response.ok) {
      const data = await response.json();
      if (data.listings && Array.isArray(data.listings) && data.listings.length > 0) {
        return data.listings;
      }
    }
  } catch (error) {
    console.warn("Could not load from JSON, using embedded data");
  }
  return null;
}

async function loadProperties() {
  // Try to load from JSON file
  const jsonProperties = await loadPropertiesFromJSON();
  if (jsonProperties && jsonProperties.length > 0) {
    properties = jsonProperties;
    window.properties = properties;
    return properties;
  }
  
  // Load user-added properties from localStorage
  const saved = localStorage.getItem(STORAGE_KEY);
  let userAdded = [];
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        userAdded = parsed;
      }
    } catch (error) {
      console.warn("Failed to parse saved properties", error);
    }
  }
  
  // Combine embedded with user-added
  properties = [...EMBEDDED_LISTINGS, ...userAdded];
  window.properties = properties;
  return properties;
}

// ============================================
// PROPERTY CARD CREATION
// ============================================

function createPropertyCard(property, options = {}) {
  const { showRemove = false } = options;
  const card = document.createElement("article");
  card.className = "property-card";

  const imgContainer = document.createElement("div");
  imgContainer.style.position = "relative";
  
  const img = document.createElement("img");
  img.src = property.image || "https://res.cloudinary.com/dv9yh8w46/image/upload/w_800,q_auto/v1730981545/rent4less-placeholder.jpg";
  img.alt = property.title;
  imgContainer.appendChild(img);
  
  if (property.verified) {
    const verifiedBadge = document.createElement("span");
    verifiedBadge.style.cssText = "position: absolute; top: 18px; left: 18px; background: var(--color-secondary); color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.2);";
    verifiedBadge.textContent = "✓ Verified";
    imgContainer.appendChild(verifiedBadge);
  }
  
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
  favoriteButton.dataset.active = savedPropertyIds.includes(property.id) ? "true" : "false";
  favoriteButton.innerHTML = favoriteButton.dataset.active === "true" ? "★ Saved" : "☆ Save";
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
  price.innerHTML = `<span class="estimate-highlight">${formatCurrency(property.price)}</span> per month<br><small style="color: var(--color-muted); font-size: 0.85rem;">6-month advance: ${formatCurrency(sixMonthAdvance)}</small>`;
  content.appendChild(price);

  const meta = document.createElement("div");
  meta.className = "property-meta";
  if (property.roomType) {
    meta.innerHTML += `<span>🏠 ${property.roomType}</span>`;
  }
  if (property.bedrooms) {
    meta.innerHTML += `<span>🛏 ${property.bedrooms} bed${property.bedrooms > 1 ? "s" : ""}</span>`;
  }
  if (property.bathrooms) {
    meta.innerHTML += `<span>🛁 ${property.bathrooms} bath${property.bathrooms > 1 ? "s" : ""}</span>`;
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

  if (property.tour && property.tour.trim() !== "") {
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

// ============================================
// RENDERING
// ============================================

function renderProperties(list = null, target = null, options = {}) {
  if (!target) {
    target = document.getElementById("listingGrid");
  }
  if (!target) {
    return;
  }
  
  target.innerHTML = "";
  
  const propertiesToRender = (list && list.length > 0) ? list : properties;
  
  if (!propertiesToRender || propertiesToRender.length === 0) {
    target.innerHTML = '<div style="text-align: center; padding: 48px; color: var(--color-muted);"><p>No properties found matching your filters. Try adjusting your search criteria.</p></div>';
    // Update count to 0
    const countElement = document.getElementById("listingsCountNumber");
    if (countElement) {
      countElement.textContent = "0";
    }
    return;
  }
  
  propertiesToRender.forEach(property => {
    try {
      const card = createPropertyCard(property, options);
      if (card) {
        target.appendChild(card);
      }
    } catch (error) {
      console.error("Error creating card:", error);
    }
  });
  
  // Update count if this is the main listing grid (not saved properties)
  if (target.id === "listingGrid") {
    const countElement = document.getElementById("listingsCountNumber");
    if (countElement) {
      countElement.textContent = propertiesToRender.length;
    }
  }
}

function getFilteredProperties() {
  if (!properties || properties.length === 0) return [];
  
  let filtered = [...properties];
  
  // Budget filter
  const budgetValue = budgetFilter?.value;
  if (budgetValue && budgetValue !== "" && budgetValue !== "all") {
    const maxBudget = parseInt(budgetValue);
    if (!isNaN(maxBudget) && maxBudget > 0) {
      filtered = filtered.filter(p => p.price <= maxBudget);
    }
  }
  
  // Location filter
  const locationValue = locationFilter?.value;
  if (locationValue && locationValue !== "Any" && locationValue !== "all") {
    filtered = filtered.filter(p => {
      const location = p.location?.toLowerCase() || "";
      return location.includes(locationValue.toLowerCase());
    });
  }
  
  // Room type filter
  const roomTypeValue = roomTypeFilter?.value;
  if (roomTypeValue && roomTypeValue !== "Any" && roomTypeValue !== "all") {
    filtered = filtered.filter(p => {
      const roomType = p.roomType?.toLowerCase() || "";
      return roomType === roomTypeValue.toLowerCase();
    });
  }
  
  // Payment flexibility filter
  const flexibilityValue = flexibilityFilter?.value;
  if (flexibilityValue && flexibilityValue !== "Any" && flexibilityValue !== "all") {
    filtered = filtered.filter(p => {
      const flex = p.paymentFlexibility?.toLowerCase() || "";
      return flex.includes(flexibilityValue.toLowerCase());
    });
  }
  
  return filtered;
}

function renderWithActiveFilters() {
  const filtered = getFilteredProperties();
  renderProperties(filtered);
  
  // Update listings count
  const countElement = document.getElementById("listingsCountNumber");
  if (countElement) {
    countElement.textContent = filtered.length;
  }
}

function renderSavedProperties() {
  const savedGridEl = document.getElementById("savedGrid");
  if (!savedGridEl) return;
  
  const savedList = savedPropertyIds
    .map((id) => properties.find((property) => property.id === id))
    .filter(Boolean);
    
  if (!savedList.length) {
    savedGridEl.innerHTML = '<p class="empty-state">You have no saved homes yet. Tap the ☆ Save button on any property to create your shortlist.</p>';
    return;
  }
  
  renderProperties(savedList, savedGridEl, { showRemove: true });
}

// ============================================
// FILTERS
// ============================================

function applyFilters() {
  renderWithActiveFilters();
}

function resetFilters() {
  if (budgetFilter) budgetFilter.value = "";
  if (locationFilter) locationFilter.value = "Any";
  if (roomTypeFilter) roomTypeFilter.value = "Any";
  if (flexibilityFilter) flexibilityFilter.value = "Any";
  renderWithActiveFilters();
}

// ============================================
// PROPERTY SUBMISSION
// ============================================

function handlePropertySubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const newProperty = {
    id: crypto.randomUUID(),
    title: formData.get("title") || "Untitled Property",
    location: formData.get("location") || "",
    price: parseInt(formData.get("price")) || 0,
    paymentFlexibility: formData.get("paymentFlexibility") || "Monthly",
    roomType: formData.get("roomType") || "Apartment",
    bedrooms: parseInt(formData.get("bedrooms")) || 1,
    bathrooms: parseInt(formData.get("bathrooms")) || 1,
    area: parseInt(formData.get("area")) || 0,
    description: formData.get("description") || "",
    image: formData.get("image") || "https://res.cloudinary.com/dv9yh8w46/image/upload/w_800,q_auto/v1730981545/rent4less-placeholder.jpg",
    tour: formData.get("tour") || "",
    verified: false,
    landlordName: formData.get("landlordName") || "",
    landlordPhone: formData.get("landlordPhone") || "",
    amenities: (formData.get("amenities") || "").split(",").map(a => a.trim()).filter(Boolean)
  };
  
  properties.push(newProperty);
  saveProperties();
  renderWithActiveFilters();
  form.reset();
  
  alert("Property listed successfully!");
}

// ============================================
// FAVORITES
// ============================================

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

// ============================================
// MODALS
// ============================================

function setupModals() {
  if (propertyModal) {
    propertyModal.addEventListener("click", (e) => {
      if (e.target === propertyModal) {
        propertyModal.classList.remove("open");
      }
    });
  }
}

function openPropertyModal(property) {
  if (!propertyModal || !propertyModalContent) return;
  
  const isSaved = savedPropertyIds.includes(property.id);
  
  propertyModalContent.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 24px;">
      <h2 style="margin: 0;">${property.title}</h2>
      <button class="modal-close" onclick="document.getElementById('propertyModal').classList.remove('open')" style="background: none; border: none; font-size: 24px; cursor: pointer; color: var(--color-muted);">×</button>
    </div>
    <img src="${property.image}" alt="${property.title}" style="width: 100%; border-radius: 12px; margin-bottom: 24px;">
    <p style="color: var(--color-muted); margin-bottom: 16px;">${property.location}</p>
    <p style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary); margin-bottom: 24px;">${formatCurrency(property.price)}/month</p>
    <div style="display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;">
      ${property.roomType ? `<span>🏠 ${property.roomType}</span>` : ""}
      ${property.bedrooms ? `<span>🛏 ${property.bedrooms} bed${property.bedrooms > 1 ? "s" : ""}</span>` : ""}
      ${property.bathrooms ? `<span>🛁 ${property.bathrooms} bath${property.bathrooms > 1 ? "s" : ""}</span>` : ""}
      ${property.area ? `<span>📐 ${property.area} m²</span>` : ""}
    </div>
    <p style="margin-bottom: 24px; line-height: 1.6;">${property.description}</p>
    ${property.amenities && property.amenities.length > 0 ? `<div style="margin-bottom: 24px;"><strong>Amenities:</strong> ${property.amenities.join(", ")}</div>` : ""}
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <button class="button button-primary" onclick="toggleFavorite('${property.id}'); document.getElementById('propertyModal').classList.remove('open');">${isSaved ? "★ Remove from Saved" : "☆ Save Property"}</button>
      ${property.tour && property.tour.trim() !== "" ? `<button class="button" data-property-id="${property.id}" onclick="handleTourButtonClick('${property.id}')">View 3D Tour</button>` : ""}
      <button class="button" onclick="openViewingRequestModal('${property.id}')">Request Viewing</button>
    </div>
  `;
  
  propertyModal.classList.add("open");
}

function open3DTourModal(property) {
  if (!property || !property.tour) return;
  
  let tourModal = document.getElementById("tourModal");
  if (!tourModal) {
    tourModal = document.createElement("div");
    tourModal.id = "tourModal";
    tourModal.className = "modal";
    document.body.appendChild(tourModal);
    
    // Close on background click
    tourModal.addEventListener("click", (e) => {
      if (e.target === tourModal) {
        tourModal.classList.remove("open");
      }
    });
  }
  
  // Update modal content
  const tourUrl = property.tour;
  tourModal.innerHTML = `
    <div class="modal-content" style="max-width: 95vw; max-height: 95vh; width: 1400px; padding: 0; overflow: hidden;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; background: var(--color-surface); border-bottom: 1px solid rgba(0,0,0,0.1);">
        <h3 style="margin: 0; font-size: 1.25rem; color: var(--color-secondary);">3D Tour - ${property.title}</h3>
        <button class="modal-close" onclick="document.getElementById('tourModal').classList.remove('open')" style="background: rgba(13, 59, 82, 0.12); border: none; font-size: 24px; cursor: pointer; color: var(--color-primary); border-radius: 50%; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; line-height: 1;">×</button>
      </div>
      <div style="position: relative; width: 100%; height: calc(95vh - 80px); min-height: 600px;">
        <iframe 
          src="${tourUrl}" 
          style="width: 100%; height: 100%; border: none; display: block;"
          allow="xr-spatial-tracking; camera; microphone; fullscreen"
          allowfullscreen
          loading="lazy"
          title="3D Tour - ${property.title}">
        </iframe>
      </div>
    </div>
  `;
  
  tourModal.classList.add("open");
}

// Helper function to handle tour button clicks from property modal
function handleTourButtonClick(propertyId) {
  const property = properties.find(p => p.id === propertyId);
  if (property) {
    open3DTourModal(property);
  }
}

// Make functions globally accessible
window.open3DTourModal = open3DTourModal;
window.handleTourButtonClick = handleTourButtonClick;

function openViewingRequestModal(propertyId) {
  const property = properties.find(p => p.id === propertyId);
  if (!property) return;
  
  let viewingModal = document.getElementById("viewingModal");
  if (!viewingModal) {
    viewingModal = document.createElement("div");
    viewingModal.id = "viewingModal";
    viewingModal.className = "modal";
    viewingModal.innerHTML = `
      <div class="modal-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h3>Request a Viewing</h3>
          <button class="modal-close" onclick="document.getElementById('viewingModal').classList.remove('open')" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
        </div>
        <form id="viewingRequestForm" onsubmit="handleViewingRequest(event, '${propertyId}')">
          <div style="margin-bottom: 16px;">
            <label>Your Name</label>
            <input type="text" name="name" required>
          </div>
          <div style="margin-bottom: 16px;">
            <label>Phone Number</label>
            <input type="tel" name="phone" required>
          </div>
          <div style="margin-bottom: 16px;">
            <label>Preferred Date & Time</label>
            <input type="datetime-local" name="datetime" required>
          </div>
          <div style="margin-bottom: 24px;">
            <label>Message (Optional)</label>
            <textarea name="message" rows="3"></textarea>
          </div>
          <button type="submit" class="button button-primary">Submit Request</button>
        </form>
      </div>
    `;
    document.body.appendChild(viewingModal);
    viewingModal.addEventListener("click", (e) => {
      if (e.target === viewingModal) {
        viewingModal.classList.remove("open");
      }
    });
  }
  
  const form = viewingModal.querySelector("form");
  if (form) {
    form.onsubmit = (e) => handleViewingRequest(e, propertyId);
  }
  viewingModal.classList.add("open");
}

function handleViewingRequest(event, propertyId) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const request = {
    propertyId,
    name: formData.get("name"),
    phone: formData.get("phone"),
    datetime: formData.get("datetime"),
    message: formData.get("message")
  };
  
  console.log("Viewing request:", request);
  alert("Viewing request submitted! The landlord will contact you soon.");
  form.reset();
  document.getElementById("viewingModal").classList.remove("open");
}

// ============================================
// RENT CALCULATOR
// ============================================

function calculateRent(income, household, neighborhood) {
  const monthlyIncome = parseFloat(income) || 0;
  const householdSize = parseInt(household) || 1;
  
  const affordabilityRatio = 0.3; // 30% of income
  const suggestedRent = monthlyIncome * affordabilityRatio;
  
  const neighborhoodMultipliers = {
    "East Legon": 1.2,
    "Osu": 1.1,
    "Cantonments": 1.3,
    "Airport Residential": 1.15,
    "Labone": 1.0,
    "Spintex": 0.95,
    "Dzorwulu": 1.05,
    "Tema": 0.9
  };
  
  const multiplier = neighborhoodMultipliers[neighborhood] || 1.0;
  const adjustedRent = suggestedRent * multiplier;
  
  const paymentPlans = [
    { name: "Monthly", amount: adjustedRent, total: adjustedRent * 12 },
    { name: "Quarterly", amount: adjustedRent * 3, total: adjustedRent * 12, savings: adjustedRent * 0.05 },
    { name: "6-Month Advance", amount: adjustedRent * 6, total: adjustedRent * 12, savings: adjustedRent * 0.1 }
  ];
  
  const matchingProperties = properties.filter(p => {
    const priceDiff = Math.abs(p.price - adjustedRent) / adjustedRent;
    return priceDiff <= 0.3; // Within 30% of suggested rent
  }).slice(0, 3);
  
  return {
    suggestedRent: adjustedRent,
    paymentPlans,
    matchingProperties,
    householdSize
  };
}

function renderCalculatorSummary(element, data, options = {}) {
  if (!element) return;
  
  const { placeholderMessage = "" } = options;
  
  if (!data || !data.suggestedRent) {
    element.innerHTML = `<p style="color: var(--color-muted); text-align: center;">${placeholderMessage}</p>`;
    return;
  }
  
  element.innerHTML = `
    <div style="background: var(--color-surface); padding: 24px; border-radius: 12px; margin-bottom: 24px;">
      <h3 style="margin: 0 0 16px 0; color: var(--color-primary);">Your Suggested Rent</h3>
      <p style="font-size: 2rem; font-weight: 700; color: var(--color-secondary); margin: 0 0 24px 0;">${formatCurrency(data.suggestedRent)}/month</p>
      <div style="display: grid; gap: 12px;">
        ${data.paymentPlans.map(plan => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: white; border-radius: 8px;">
            <div>
              <strong>${plan.name}</strong>
              ${plan.savings ? `<small style="color: var(--color-primary); display: block;">Save ${formatCurrency(plan.savings)}</small>` : ""}
            </div>
            <div style="text-align: right;">
              <div style="font-weight: 600;">${formatCurrency(plan.amount)}</div>
              <small style="color: var(--color-muted);">${plan.name === "Monthly" ? "per month" : "per payment"}</small>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
    ${data.matchingProperties && data.matchingProperties.length > 0 ? `
      <div>
        <h3 style="margin: 0 0 16px 0;">Matching Properties</h3>
        <div style="display: grid; gap: 16px;">
          ${data.matchingProperties.map(prop => `
            <div style="display: flex; gap: 16px; padding: 16px; background: var(--color-surface); border-radius: 8px; cursor: pointer;" onclick="openPropertyModal(${JSON.stringify(prop).replace(/"/g, '&quot;')})">
              <img src="${prop.image}" alt="${prop.title}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;">
              <div style="flex: 1;">
                <h4 style="margin: 0 0 8px 0;">${prop.title}</h4>
                <p style="margin: 0 0 8px 0; color: var(--color-muted);">${prop.location}</p>
                <p style="margin: 0; font-weight: 600; color: var(--color-primary);">${formatCurrency(prop.price)}/month</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}
  `;
}

function setupCalculatorForm(form, resultElement, options = {}) {
  if (!form || !resultElement) return;
  
  const { defaults = {}, placeholderMessage = "", syncOnInit = true, onResult = null } = options;
  
  if (syncOnInit && defaults.income) {
    if (form.elements["income"]) form.elements["income"].value = defaults.income;
    if (form.elements["household"]) form.elements["household"].value = defaults.household || 1;
    if (form.elements["neighborhood"]) form.elements["neighborhood"].value = defaults.neighborhood || "";
  }
  
  const calculate = () => {
    const income = form.elements["income"]?.value || defaults.income || "";
    const household = form.elements["household"]?.value || defaults.household || 1;
    const neighborhood = form.elements["neighborhood"]?.value || defaults.neighborhood || "";
    
    if (!income) {
      renderCalculatorSummary(resultElement, null, { placeholderMessage });
      return;
    }
    
    const result = calculateRent(income, household, neighborhood);
    renderCalculatorSummary(resultElement, result, { placeholderMessage });
    
    if (onResult) {
      onResult({ income, household, neighborhood, ...result });
    }
  };
  
  form.addEventListener("input", calculate);
  form.addEventListener("change", calculate);
  
  if (syncOnInit) {
    calculate();
  }
}

// ============================================
// INITIALIZATION
// ============================================

async function init() {
  // Load saved favorites
  savedPropertyIds = loadSavedProperties();
  
  // Try to load from JSON (will update properties if successful)
  await loadProperties();
  
  // Render properties if on listings page
  const listingGridEl = document.getElementById("listingGrid");
  if (listingGridEl) {
    renderWithActiveFilters();
  }
  
  // Render saved properties if on saved page
  renderSavedProperties();
  
  // Setup modals
  setupModals();
  
  // Setup event listeners
  if (propertyForm) {
    propertyForm.addEventListener("submit", handlePropertySubmit);
  }
  if (applyFiltersButton) {
    applyFiltersButton.addEventListener("click", applyFilters);
  }
  if (resetFiltersButton) {
    resetFiltersButton.addEventListener("click", resetFilters);
  }
  
  // Live filtering on Enter key in budget input
  if (budgetFilter) {
    budgetFilter.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyFilters();
      }
    });
  }
  
  // Live filtering on change for dropdowns (optional - can be removed if you prefer Apply button only)
  if (locationFilter) {
    locationFilter.addEventListener("change", applyFilters);
  }
  if (roomTypeFilter) {
    roomTypeFilter.addEventListener("change", applyFilters);
  }
  if (flexibilityFilter) {
    flexibilityFilter.addEventListener("change", applyFilters);
  }
  
  // Update year
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Setup calculators
  const calculatorPlaceholder = "Enter your income to discover a realistic monthly rent and matched homes.";
  
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

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
