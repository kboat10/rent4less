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

const defaultProperties = [
  {
    id: crypto.randomUUID(),
    title: "Modern 2-Bed Apartment · East Legon",
    location: "East Legon, Accra",
    price: 3200,
    paymentFlexibility: "Monthly or Quarterly",
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    description:
      "Furnished apartment with backup power, Wi-Fi, and proximity to business hubs. Employer-backed payment guaranteed.",
    image:
      "https://res.cloudinary.com/dv9yh8w46/image/upload/w_800,q_auto/v1730981440/east-legon-apartment.jpg",
    tour: "https://my.matterport.com/show/?m=BM7s6FDX6zF",
  },
  {
    id: crypto.randomUUID(),
    title: "Studio Loft · Osu",
    location: "Osu, Accra",
    price: 1800,
    paymentFlexibility: "Monthly",
    bedrooms: 1,
    bathrooms: 1,
    area: 52,
    description:
      "Bright loft with 3D Smart Tour available. Ideal for young professionals who want nightlife and short commutes.",
    image:
      "https://res.cloudinary.com/dv9yh8w46/image/upload/w_800,q_auto/v1730981440/osu-loft.jpg",
    tour: "",
  },
  {
    id: crypto.randomUUID(),
    title: "Family Home · Tema Community 10",
    location: "Tema Community 10",
    price: 2500,
    paymentFlexibility: "Quarterly",
    bedrooms: 3,
    bathrooms: 3,
    area: 140,
    description:
      "Spacious home with private compound and community security. Tenant reputation score of previous tenant: 4.8/5.",
    image:
      "https://res.cloudinary.com/dv9yh8w46/image/upload/w_800,q_auto/v1730981440/tema-family-home.jpg",
    tour: "",
  },
];

function loadProperties() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties));
    return [...defaultProperties];
  }
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.warn("Failed to parse saved properties", error);
  }
  return [...defaultProperties];
}

let properties = loadProperties();
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

  const img = document.createElement("img");
  img.src =
    property.image ||
    "https://res.cloudinary.com/dv9yh8w46/image/upload/w_800,q_auto/v1730981545/rent4less-placeholder.jpg";
  img.alt = property.title;
  card.appendChild(img);

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
  price.innerHTML = `<span class="estimate-highlight">${formatCurrency(
    property.price
  )}</span> per month`;
  content.appendChild(price);

  const meta = document.createElement("div");
  meta.className = "property-meta";
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

  const tourLink = document.createElement("a");
  if (property.tour) {
    tourLink.href = property.tour;
    tourLink.target = "_blank";
    tourLink.rel = "noopener";
    tourLink.textContent = "View 3D tour";
  } else {
    tourLink.href = "#tenant-tools";
    tourLink.textContent = "Request tour";
  }
  actions.appendChild(tourLink);

  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.textContent = "View details";
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
    bedrooms: Number(formData.get("bedrooms")) || null,
    bathrooms: Number(formData.get("bathrooms")) || null,
    area: Number(formData.get("area")) || null,
    description: formData.get("description").trim(),
    image: formData.get("image").trim(),
    tour: formData.get("tour").trim(),
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

  return properties.filter((property) => {
    const matchesBudget = budgetValue ? property.price <= budgetValue : true;
    const matchesFlexibility =
      flexibilityValue === "Any" ||
      property.paymentFlexibility === flexibilityValue;
    return matchesBudget && matchesFlexibility;
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
        <div class="modal-actions">
          <button class="button" data-favorite-modal="${
            property.id
          }">${isSaved ? "★ Saved" : "☆ Save home"}</button>
          ${
            property.tour
              ? `<a class="button button-secondary" target="_blank" rel="noopener" href="${property.tour}">Open 3D tour</a>`
              : `<a class="button button-secondary" href="#tenant-tools">Request a 3D tour</a>`
          }
        </div>
        <div>
          <h5>Landlord assurance</h5>
          <ul>
            <li>Tenant reputation score tracking after every lease cycle.</li>
            <li>Optional payroll deduction through verified employers.</li>
            <li>Escrow protection from partnering banks &amp; fintechs.</li>
          </ul>
        </div>
        ${
          property.tour
            ? `<iframe src="${property.tour}" title="3D tour for ${property.title}" allow="xr-spatial-tracking; gyroscope; accelerometer"></iframe>`
            : ""
        }
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

function init() {
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

propertyForm?.addEventListener("submit", handlePropertySubmit);
applyFiltersButton?.addEventListener("click", applyFilters);
resetFiltersButton?.addEventListener("click", resetFilters);

document.addEventListener("DOMContentLoaded", init);

