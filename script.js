// Sample listings data (in production, this would come from a backend/API)
const sampleListings = [
    {
        id: 1,
        title: "Modern Studio Apartment",
        location: "Accra, East Legon",
        roomType: "studio",
        rent: 1500,
        advance: 9000,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        has3DTour: true,
        description: "Beautiful modern studio with all amenities",
        verified: true
    },
    {
        id: 2,
        title: "Cozy Shared Room",
        location: "Kumasi, Adum",
        roomType: "shared",
        rent: 400,
        advance: 2400,
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
        has3DTour: false,
        description: "Comfortable shared room in a safe neighborhood",
        verified: true
    },
    {
        id: 3,
        title: "Spacious Private Room",
        location: "Accra, Osu",
        roomType: "private",
        rent: 800,
        advance: 4800,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        has3DTour: true,
        description: "Private room with ensuite bathroom",
        verified: true
    },
    {
        id: 4,
        title: "Luxury 2-Bedroom Apartment",
        location: "Tema, Community 1",
        roomType: "apartment",
        rent: 2500,
        advance: 15000,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        has3DTour: false,
        description: "Fully furnished luxury apartment",
        verified: true
    },
    {
        id: 5,
        title: "Affordable Studio",
        location: "Takoradi, Airport Ridge",
        roomType: "studio",
        rent: 600,
        advance: 3600,
        image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800",
        has3DTour: false,
        description: "Budget-friendly studio in great location",
        verified: true
    },
    {
        id: 6,
        title: "Premium Shared Space",
        location: "Cape Coast, University Area",
        roomType: "shared",
        rent: 350,
        advance: 2100,
        image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800",
        has3DTour: true,
        description: "Well-maintained shared accommodation",
        verified: true
    }
];

let filteredListings = [...sampleListings];
let uploadedImages = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('listings-grid')) {
        renderListings();
        setupFilters();
    }
    
    if (document.getElementById('rent-price')) {
        setupLandlordForm();
    }
});

// Render listings
function renderListings() {
    const grid = document.getElementById('listings-grid');
    const countElement = document.getElementById('count');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    countElement.textContent = filteredListings.length;
    
    if (filteredListings.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-light);"><i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i><p>No properties found matching your criteria.</p></div>';
        return;
    }
    
    filteredListings.forEach(listing => {
        const card = createListingCard(listing);
        grid.appendChild(card);
    });
}

// Create listing card
function createListingCard(listing) {
    const card = document.createElement('div');
    card.className = 'listing-card';
    
    const roomTypeLabels = {
        'shared': 'Shared Room',
        'private': 'Private Room',
        'studio': 'Studio',
        'apartment': 'Apartment'
    };
    
    card.innerHTML = `
        <div style="position: relative;">
            <img src="${listing.image}" alt="${listing.title}" class="listing-image" onerror="this.src='https://via.placeholder.com/400x300?text=Property+Image'">
            ${listing.verified ? '<span class="listing-badge">✓ Verified</span>' : ''}
            ${listing.has3DTour ? '<span class="listing-badge listing-3d-badge" style="top: 3.5rem;">3D Tour</span>' : ''}
        </div>
        <div class="listing-content">
            <div class="listing-header">
                <div>
                    <h3 class="listing-title">${listing.title}</h3>
                    <p class="listing-location">
                        <i class="fas fa-map-marker-alt"></i> ${listing.location}
                    </p>
                </div>
            </div>
            <div class="listing-details">
                <span><i class="fas fa-bed"></i> ${roomTypeLabels[listing.roomType]}</span>
            </div>
            <div class="listing-price">
                <div class="price-main">₵${listing.rent.toLocaleString()}/month</div>
                <div class="price-advance">6-month advance: ₵${listing.advance.toLocaleString()}</div>
            </div>
            <div class="listing-actions">
                <button class="btn btn-primary" onclick="openViewingModal(${listing.id})">
                    <i class="fas fa-calendar-check"></i> Request Viewing
                </button>
                ${listing.has3DTour ? `<button class="btn btn-secondary" onclick="open3DModal(${listing.id})">
                    <i class="fas fa-cube"></i> 3D Tour
                </button>` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Setup filters
function setupFilters() {
    const budgetFilter = document.getElementById('budget-filter');
    const locationFilter = document.getElementById('location-filter');
    const roomTypeFilter = document.getElementById('room-type-filter');
    
    [budgetFilter, locationFilter, roomTypeFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });
}

// Apply filters
function applyFilters() {
    const budgetFilter = document.getElementById('budget-filter').value;
    const locationFilter = document.getElementById('location-filter').value;
    const roomTypeFilter = document.getElementById('room-type-filter').value;
    
    filteredListings = sampleListings.filter(listing => {
        // Budget filter
        if (budgetFilter) {
            const [min, max] = budgetFilter.split('-').map(v => v === '+' ? Infinity : parseInt(v));
            if (budgetFilter.includes('+')) {
                if (listing.rent < min) return false;
            } else {
                if (listing.rent < min || listing.rent > max) return false;
            }
        }
        
        // Location filter
        if (locationFilter) {
            const locationMap = {
                'accra': 'Accra',
                'kumasi': 'Kumasi',
                'tema': 'Tema',
                'takoradi': 'Takoradi',
                'cape-coast': 'Cape Coast'
            };
            if (!listing.location.toLowerCase().includes(locationMap[locationFilter].toLowerCase())) {
                return false;
            }
        }
        
        // Room type filter
        if (roomTypeFilter && listing.roomType !== roomTypeFilter) {
            return false;
        }
        
        return true;
    });
    
    renderListings();
}

// Reset filters
function resetFilters() {
    document.getElementById('budget-filter').value = '';
    document.getElementById('location-filter').value = '';
    document.getElementById('room-type-filter').value = '';
    filteredListings = [...sampleListings];
    renderListings();
}

// Viewing Request Modal
function openViewingModal(propertyId) {
    const modal = document.getElementById('viewing-modal');
    const propertyIdInput = document.getElementById('property-id');
    if (modal && propertyIdInput) {
        propertyIdInput.value = propertyId;
        modal.style.display = 'block';
    }
}

function closeViewingModal() {
    const modal = document.getElementById('viewing-modal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('viewing-request-form').reset();
    }
}

// Submit viewing request
function submitViewingRequest(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        propertyId: formData.get('property-id'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        preferredDate: formData.get('preferred-date'),
        message: formData.get('message')
    };
    
    // In production, this would send to backend/Google Sheets
    console.log('Viewing Request:', data);
    
    // Simulate sending to WhatsApp/backend
    const whatsappMessage = `New Viewing Request:\n\nProperty ID: ${data.propertyId}\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nPreferred Date: ${data.preferredDate || 'Not specified'}\nMessage: ${data.message || 'None'}`;
    const whatsappUrl = `https://wa.me/233XXXXXXXXX?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Show success message
    alert('Viewing request submitted! Our team will contact you via WhatsApp shortly.');
    closeViewingModal();
    
    // In production, you would:
    // 1. Send data to Google Sheets via Apps Script API
    // 2. Send WhatsApp notification to Rent4Less team
    // 3. Send confirmation to tenant
}

// 3D Tour Modal
function open3DModal(propertyId) {
    const modal = document.getElementById('3d-modal');
    const viewer = document.getElementById('3d-viewer');
    const title = document.getElementById('3d-property-title');
    
    if (modal && viewer) {
        const listing = sampleListings.find(l => l.id === propertyId);
        if (listing) {
            title.textContent = `${listing.title} - 3D Virtual Tour`;
            
            // In production, this would load an actual 3D tour (e.g., Matterport, 3D Tour, etc.)
            viewer.innerHTML = `
                <div class="3d-placeholder">
                    <i class="fas fa-cube"></i>
                    <p>3D Tour Loading...</p>
                    <p class="3d-note">Experience the property in 360° before you visit</p>
                    <p style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-light);">
                        In production, this would embed a 3D tour viewer (Matterport, 3D Tour, etc.)
                    </p>
                </div>
            `;
        }
        modal.style.display = 'block';
    }
}

function close3DModal() {
    const modal = document.getElementById('3d-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const viewingModal = document.getElementById('viewing-modal');
    const modal3D = document.getElementById('3d-modal');
    const successModal = document.getElementById('success-modal');
    
    if (event.target === viewingModal) {
        closeViewingModal();
    }
    if (event.target === modal3D) {
        close3DModal();
    }
    if (event.target === successModal) {
        closeSuccessModal();
    }
}

// Landlord Form Functions
function setupLandlordForm() {
    const rentPriceInput = document.getElementById('rent-price');
    const advancePaymentInput = document.getElementById('advance-payment');
    
    if (rentPriceInput && advancePaymentInput) {
        rentPriceInput.addEventListener('input', function() {
            const rent = parseFloat(this.value) || 0;
            advancePaymentInput.value = (rent * 6).toLocaleString();
        });
    }
}

function toggle3DTourOption() {
    const checkbox = document.getElementById('has-3d-tour');
    const details = document.getElementById('3d-tour-details');
    
    if (checkbox && details) {
        details.style.display = checkbox.checked ? 'block' : 'none';
    }
}

function handleImageUpload(event) {
    const files = Array.from(event.target.files);
    const previewGrid = document.getElementById('image-preview-grid');
    
    if (!previewGrid) return;
    
    files.forEach(file => {
        if (file.size > 5 * 1024 * 1024) {
            alert(`File ${file.name} is too large. Maximum size is 5MB.`);
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.createElement('div');
            preview.className = 'image-preview';
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="remove-image" onclick="removeImage(this)">
                    <i class="fas fa-times"></i>
                </button>
            `;
            previewGrid.appendChild(preview);
            uploadedImages.push({ file, preview });
        };
        reader.readAsDataURL(file);
    });
}

function removeImage(button) {
    const preview = button.parentElement;
    const index = Array.from(preview.parentElement.children).indexOf(preview);
    uploadedImages.splice(index, 1);
    preview.remove();
}

// Submit landlord form
function submitLandlordForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        landlord: {
            name: formData.get('landlord-name'),
            phone: formData.get('landlord-phone'),
            email: formData.get('landlord-email'),
            ghanaCard: formData.get('ghana-card')
        },
        property: {
            address: formData.get('property-address'),
            location: formData.get('property-location'),
            roomType: formData.get('room-type'),
            rent: formData.get('rent-price'),
            advance: formData.get('advance-payment'),
            description: formData.get('property-description'),
            has3DTour: formData.get('has-3d-tour') === 'on',
            tourLink: formData.get('3d-tour-link'),
            requestProfessionalPhotos: formData.get('request-professional-photos') === 'on'
        },
        images: uploadedImages.map(img => img.file.name)
    };
    
    // In production, this would:
    // 1. Upload images to cloud storage (AWS S3, Cloudinary, etc.)
    // 2. Send data to Google Sheets via Apps Script API
    // 3. Send notification to Rent4Less team via WhatsApp/Email
    // 4. Send confirmation to landlord
    
    console.log('Landlord Form Data:', data);
    
    // Show success modal
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.style.display = 'block';
    }
    
    // Reset form
    event.target.reset();
    uploadedImages = [];
    document.getElementById('image-preview-grid').innerHTML = '';
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'none';
        window.location.href = 'index.html';
    }
}
