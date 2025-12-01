# Rent4Less MVP

A rental platform MVP that connects tenants with verified property listings in Ghana. Features include 3D virtual tours, search filters, and streamlined viewing requests.

## Features

### Tenant-Facing Features

1. **Listings Page**
   - 10-30 real, verified listings
   - Images + descriptions
   - Clear display of six-month advance payment

2. **3D Viewing (for selected units)**
   - 1-3 properties with 3D tours
   - Shows the value of "see before you move"

3. **Search Filters**
   - Budget range
   - Location (Accra, Kumasi, Tema, Takoradi, Cape Coast)
   - Room type (Shared/Private/Studio/Apartment)

4. **Viewing Request Button**
   - Simple form with tenant details
   - Sends request to Rent4Less team

### Landlord-Facing Features

1. **Landlord Listing Form**
   - Name, property details, rent price
   - Image upload (up to 10 images)
   - Property description

2. **Verification Step (Manual)**
   - Phone call verification
   - Ghana Card check
   - Site visit if needed

3. **Free Professional Photos (Optional)**
   - Encourages landlords to join
   - Makes listings look more trustworthy

4. **3D Tour Option**
   - Optional 3D virtual tour integration
   - Can provide existing tour link or request professional 3D tour

### Backend (MVP-Style: Manual Operations)

- Google Sheet to track listings
- Manual validation of tenants
- WhatsApp scheduling for viewings
- Manual updates of occupancy

## User Journey

### Tenant Side
1. Visits Rent4Less website
2. Browses verified listings
3. Views 3D tours (if available)
4. Requests viewing
5. Receives WhatsApp confirmation
6. Visits property
7. Gives feedback
8. (If successful) Rents the unit

### Landlord Side
1. Sees campaign (social media or referral)
2. Submits property through form
3. Rent4Less verifies the listing
4. Listing goes live
5. Tenant inquiries come in
6. Property gets filled faster
7. Landlord gives feedback

## File Structure

```
Rent4Less/
├── index.html          # Tenant-facing listings page
├── landlord.html       # Landlord listing form
├── styles.css          # All styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Setup

1. **Local Development**
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve . -p 8000
   ```

2. **Open in Browser**
   - Navigate to `http://localhost:8000`

## Backend Integration

### Google Sheets Integration

To connect the forms to Google Sheets:

1. **Create a Google Sheet** with columns for:
   - Viewing Requests: Property ID, Name, Phone, Email, Preferred Date, Message, Timestamp
   - Landlord Listings: Landlord Name, Phone, Email, Ghana Card, Property Address, Location, Room Type, Rent, Description, Images, 3D Tour, Timestamp

2. **Set up Google Apps Script**:
   - Create a new Apps Script project
   - Write a function to receive POST requests
   - Save data to the Google Sheet
   - Deploy as a web app

3. **Update `script.js`**:
   - Replace console.log statements with actual API calls
   - Add error handling and loading states

### WhatsApp Integration

For WhatsApp notifications:

1. **WhatsApp Business API** (Recommended for production)
   - Set up WhatsApp Business API account
   - Use API to send automated messages

2. **WhatsApp Web Links** (Quick MVP solution)
   - Use `https://wa.me/PHONENUMBER?text=MESSAGE` format
   - Pre-fill messages with form data

### Image Storage

For production image uploads:

1. **Cloud Storage Options**:
   - AWS S3
   - Cloudinary
   - Firebase Storage
   - Google Cloud Storage

2. **Update `script.js`**:
   - Add image upload function
   - Store image URLs in database/Google Sheets
   - Display images from cloud storage

### 3D Tour Integration

For 3D virtual tours:

1. **3D Tour Platforms**:
   - Matterport (most popular)
   - 3D Tour
   - Kuula
   - Roundme

2. **Embedding**:
   - Get embed code from platform
   - Replace placeholder in `open3DModal()` function
   - Store 3D tour links in property data

## Customization

### Update Contact Information

Edit contact details in:
- `index.html` (footer)
- `landlord.html` (footer)
- `script.js` (WhatsApp number in `submitViewingRequest()`)

### Add More Locations

Update location options in:
- `index.html` (location filter)
- `landlord.html` (property location dropdown)
- `script.js` (location mapping in `applyFilters()`)

### Modify Sample Listings

Edit `sampleListings` array in `script.js` to add/remove/modify property listings.

## Deployment

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Deploy automatically

### Option 2: Netlify
1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Deploy automatically

### Option 3: GitHub Pages
1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Select main branch

## Next Steps for Production

1. **Backend Development**
   - Set up proper database (PostgreSQL, MongoDB, etc.)
   - Create REST API endpoints
   - Implement authentication

2. **Payment Integration**
   - Integrate payment gateway (Paystack, Stripe, etc.)
   - Handle 6-month advance payments
   - Payment confirmation system

3. **Email System**
   - Set up email service (SendGrid, Mailgun, etc.)
   - Automated confirmation emails
   - Notification system

4. **Admin Dashboard**
   - Dashboard for Rent4Less team
   - Manage listings
   - View viewing requests
   - Update property status

5. **Mobile App**
   - React Native or Flutter app
   - Push notifications
   - In-app messaging

## License

This project is created for Rent4Less. All rights reserved.

---

**Built for Rent4Less - Making rental housing accessible and transparent in Ghana**
