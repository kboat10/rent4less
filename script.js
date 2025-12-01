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

const STORAGE_KEY = "rent4less-properties";
const FAVORITES_KEY = "rent4less-favorites";
const LISTINGS_DATA_URL = "data/listings.json";

// Load properties from JSON file
async function loadPropertiesFromJSON() {
  try {
    const response = await fetch(LISTINGS_DATA_URL);
    if (!response.ok) throw new Error("Failed to load listings");
    const data = await response.json();
    return data.listings.map(listing => ({
      ...listing,
      id: listing.id || crypto.randomUUID()
    }));
  } catch (error) {
    console.warn("Failed to load listings from JSON, using defaults:", error);
    return getDefaultProperties();
  }
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

let properties = [];
let savedPropertyIds = loadSavedProperties();

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
  if (property.tour) {
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

function renderProperties(list = properties, target = listingGrid, options = {}) {
  if (!target) return;
  target.innerHTML = "";
  if (!list.length) {
    const emptyState = document.createElement("p");
    emptyState.textContent =
      "No properties found for the selected filters. Try adjusting your budget or payment plan.";
    target.appendChild(emptyState);
    return;
  }
  list.forEach((property) => {
    target.appendChild(createPropertyCard(property, options));
  });
}

function renderSavedProperties() {
  if (!savedGrid) return;
  const savedList = savedPropertyIds
    .map((id) => properties.find((property) => property.id === id))
    .filter(Boolean);
  if (!savedList.length) {
    savedGrid.innerHTML =
      "<p class=\"empty-state\">You have no saved homes yet. Tap the ☆ Save button on any property to create your shortlist.</p>";
    return;
  }
  renderProperties(savedList, savedGrid, { showRemove: true });
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
  if (!listingGrid) return [];
  const budgetValue = Number(budgetFilter?.value);
  const flexibilityValue = flexibilityFilter?.value || "Any";
  const locationFilter = document.getElementById("locationFilter");
  const roomTypeFilter = document.getElementById("roomTypeFilter");
  const locationValue = locationFilter?.value || "Any";
  const roomTypeValue = roomTypeFilter?.value || "Any";

  return properties.filter((property) => {
    const matchesBudget = budgetValue ? property.price <= budgetValue : true;
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
  if (!listingGrid) return;
  const filtered = getFilteredProperties();
  renderProperties(filtered);
}

function applyFilters() {
  if (!listingGrid) return;
  renderWithActiveFilters();
}

function resetFilters() {
  if (!listingGrid) return;
  if (budgetFilter) budgetFilter.value = "";
  if (flexibilityFilter) flexibilityFilter.value = "Any";
  const locationFilter = document.getElementById("locationFilter");
  const roomTypeFilter = document.getElementById("roomTypeFilter");
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
  const modal = document.createElement("div");
  modal.className = "modal open";
  modal.style.display = "flex";
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 1200px; padding: 0;">
      <button class="modal-close" data-close style="position: absolute; top: 20px; right: 20px; z-index: 10;">&times;</button>
      <div style="padding: 32px 32px 24px;">
        <h3 style="margin: 0 0 8px;">${property.title} - 3D Virtual Tour</h3>
        <p style="margin: 0; color: var(--color-muted);">${property.location}</p>
      </div>
      <div class="tour-embed" style="width: 100%; height: 600px; border-radius: 0;">
        <iframe 
          src="${property.tour}" 
          title="3D tour for ${property.title}" 
          allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
          style="width: 100%; height: 100%; border: 0;"
          allowfullscreen
        ></iframe>
      </div>
      <div style="padding: 24px 32px 32px;">
        <p style="margin: 0; color: var(--color-muted); font-size: 0.9rem;">
          Use your mouse or touch to navigate the 3D tour. Click and drag to look around, scroll to zoom.
        </p>
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
  // Load properties from JSON file
  properties = await loadProperties();
  
  renderWithActiveFilters();
  renderSavedProperties();
  setupModals();
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const calculatorPlaceholder =
    "Enter your income to discover a realistic monthly rent and matched homes.";

  setupCalculatorForm(calculatorForm, calculatorResult, {
    placeholderMessage: calculatorPlaceholder,
  });

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

// Event listeners
propertyForm?.addEventListener("submit", handlePropertySubmit);
applyFiltersButton?.addEventListener("click", applyFilters);
resetFiltersButton?.addEventListener("click", resetFilters);

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

document.addEventListener("DOMContentLoaded", init);

