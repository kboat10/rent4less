# Backend Integration Guide

This guide explains how to connect the Rent4Less MVP to backend services for Google Sheets, WhatsApp, and image storage.

## Google Sheets Integration

### Step 1: Create Google Sheet

Create a new Google Sheet with two tabs:

**Tab 1: Viewing Requests**
| Property ID | Name | Phone | Email | Preferred Date | Message | Timestamp |
|-------------|------|-------|-------|----------------|---------|-----------|

**Tab 2: Landlord Listings**
| Landlord Name | Phone | Email | Ghana Card | Address | Location | Room Type | Rent | Advance | Description | Images | 3D Tour | Professional Photos | Timestamp |
|---------------|-------|-------|------------|---------|----------|-----------|------|---------|-------------|--------|---------|-------------------|-----------|

### Step 2: Create Google Apps Script

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Replace the default code with:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.type === 'viewing_request') {
      const viewingSheet = sheet.getSheetByName('Viewing Requests');
      viewingSheet.appendRow([
        data.propertyId,
        data.name,
        data.phone,
        data.email || '',
        data.preferredDate || '',
        data.message || '',
        new Date()
      ]);
      return ContentService.createTextOutput(JSON.stringify({success: true}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.type === 'landlord_listing') {
      const listingSheet = sheet.getSheetByName('Landlord Listings');
      listingSheet.appendRow([
        data.landlord.name,
        data.landlord.phone,
        data.landlord.email || '',
        data.landlord.ghanaCard || '',
        data.property.address,
        data.property.location,
        data.property.roomType,
        data.property.rent,
        data.property.advance,
        data.property.description,
        data.property.images.join(', '),
        data.property.has3DTour ? 'Yes' : 'No',
        data.property.tourLink || '',
        data.property.requestProfessionalPhotos ? 'Yes' : 'No',
        new Date()
      ]);
      return ContentService.createTextOutput(JSON.stringify({success: true}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Invalid type'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Save the script
5. Deploy → New Deployment
6. Select type: **Web app**
7. Set execute as: **Me**
8. Set who has access: **Anyone**
9. Click **Deploy**
10. Copy the **Web App URL**

### Step 3: Update script.js

Replace the form submission functions with:

```javascript
const GOOGLE_SHEETS_URL = 'YOUR_WEB_APP_URL_HERE';

async function submitViewingRequest(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = {
    type: 'viewing_request',
    propertyId: formData.get('property-id'),
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    preferredDate: formData.get('preferred-date'),
    message: formData.get('message')
  };
  
  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    if (result.success) {
      alert('Viewing request submitted! Our team will contact you via WhatsApp shortly.');
      closeViewingModal();
    } else {
      alert('Error submitting request. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error submitting request. Please try again.');
  }
}

async function submitLandlordForm(event) {
  event.preventDefault();
  
  // ... (existing form data collection code)
  
  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'landlord_listing',
        landlord: { /* ... */ },
        property: { /* ... */ }
      })
    });
    
    const result = await response.json();
    if (result.success) {
      const successModal = document.getElementById('success-modal');
      if (successModal) {
        successModal.style.display = 'block';
      }
    } else {
      alert('Error submitting listing. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error submitting listing. Please try again.');
  }
}
```

## WhatsApp Integration

### Option 1: WhatsApp Web Links (Quick MVP)

Update `submitViewingRequest()` in `script.js`:

```javascript
function submitViewingRequest(event) {
  event.preventDefault();
  
  // ... collect form data ...
  
  const whatsappNumber = '233XXXXXXXXX'; // Replace with Rent4Less WhatsApp number
  const message = `New Viewing Request:\n\nProperty ID: ${data.propertyId}\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nPreferred Date: ${data.preferredDate || 'Not specified'}\nMessage: ${data.message || 'None'}`;
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  
  // Also save to Google Sheets
  // ... (Google Sheets code from above)
}
```

### Option 2: WhatsApp Business API (Production)

1. Set up WhatsApp Business API account
2. Get API credentials
3. Use API to send messages programmatically

## Image Storage

### Option 1: Cloudinary (Recommended for MVP)

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your upload preset and cloud name
3. Update `handleImageUpload()` in `script.js`:

```javascript
const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset';
const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';

async function handleImageUpload(event) {
  const files = Array.from(event.target.files);
  const previewGrid = document.getElementById('image-preview-grid');
  
  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );
      
      const data = await response.json();
      const imageUrl = data.secure_url;
      
      // Store imageUrl and display preview
      // ... (preview code)
      
      uploadedImages.push({ file, url: imageUrl });
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Failed to upload ${file.name}`);
    }
  }
}
```

### Option 2: Firebase Storage

1. Set up Firebase project
2. Enable Storage
3. Get Firebase config
4. Use Firebase SDK to upload images

## 3D Tour Integration

### Matterport Integration

1. Create Matterport account
2. Upload 3D scans
3. Get embed code for each property
4. Update `open3DModal()` in `script.js`:

```javascript
function open3DModal(propertyId) {
  const listing = sampleListings.find(l => l.id === propertyId);
  if (listing && listing.matterportId) {
    const viewer = document.getElementById('3d-viewer');
    viewer.innerHTML = `
      <iframe 
        width="100%" 
        height="500" 
        src="https://my.matterport.com/show/?m=${listing.matterportId}" 
        frameborder="0" 
        allowfullscreen
      ></iframe>
    `;
  }
}
```

## Email Notifications

### SendGrid Integration

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get API key
3. Create email templates
4. Send emails on form submissions

```javascript
const SENDGRID_API_KEY = 'your_api_key';

async function sendEmail(to, subject, html) {
  await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'noreply@rent4less.com' },
      subject: subject,
      content: [{ type: 'text/html', value: html }]
    })
  });
}
```

## Testing

1. Test Google Sheets integration with sample data
2. Verify WhatsApp links open correctly
3. Test image uploads to cloud storage
4. Verify 3D tours load properly
5. Test email notifications

## Security Notes

- Never expose API keys in client-side code
- Use environment variables for sensitive data
- Implement rate limiting
- Validate all user inputs
- Sanitize data before storing

