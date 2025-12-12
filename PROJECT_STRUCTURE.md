# Portfolio Project Structure with Multiple Media Assets

## Overview
This document illustrates the enhanced structure for portfolio items that now support multiple photos and videos per project.

## Data Structure Changes

### Before
Each project had a single thumbnail and video URL:
```javascript
{
  id: "proj-001",
  title: "Velocity Unveiled",
  thumbnail: "/thumbnails/velocity-unveiled.jpg",
  videoUrl: "https://vimeo.com/placeholder-001",
  // ... other fields
}
```

### After
Each project now has a gallery array supporting multiple media assets:
```javascript
{
  id: "proj-001",
  title: "Velocity Unveiled",
  thumbnail: "/thumbnails/velocity-unveiled.jpg",
  videoUrl: "https://vimeo.com/placeholder-001",
  gallery: [
    {
      type: "image",
      url: "/gallery/velocity-unveiled-1.jpg",
      caption: "Behind the scenes at Apex Motorsports"
    },
    {
      type: "image",
      url: "/gallery/velocity-unveiled-2.jpg",
      caption: "Precision engineering in motion"
    },
    {
      type: "video",
      url: "https://vimeo.com/placeholder-gallery-001",
      caption: "Making of Velocity Unveiled"
    }
  ],
  // ... other fields
}
```

## Backend Schema Changes (Strapi)

Added a new `gallery` field to the project content type:
```json
{
  "gallery": {
    "type": "media",
    "multiple": true,
    "allowedTypes": [
      "images",
      "videos"
    ]
  }
}
```

## Frontend Implementation

### Portfolio Page
- Added media count display showing number of items in gallery
- Changed project cards to link to detail pages
- Removed direct video links in favor of detail page navigation

### Project Detail Page
New page with the following features:
- Carousel-style media gallery with navigation arrows
- Media counter showing current position (e.g., 1/5)
- Caption display for each media item
- Thumbnail strip for quick navigation between media items
- Responsive design for all device sizes

## File Structure
```
client/
├── src/
│   ├── api/
│   │   └── projectsApi.js (updated to handle gallery data)
│   ├── data/
│   │   └── projects.js (updated with gallery data)
│   ├── pages/
│   │   ├── Portfolio.jsx (updated with links to detail pages)
│   │   └── ProjectDetail.jsx (new detail page)
│   ├── components/
│   │   └── (existing components unchanged)
│   └── App.js (updated with new route)
└── src/App.css (updated with new styles)
```

## API Enhancements
- Modified `mapProject` function to process gallery media
- Added `mapMediaGallery` helper function
- Updated `resolveMediaUrl` to handle various media object structures

## User Experience Improvements
1. **Portfolio Grid**: Users can see how many media items are available for each project
2. **Project Detail**: Dedicated page for immersive media browsing
3. **Navigation**: Easy switching between different media items in a project
4. **Responsive Design**: Works well on all device sizes
5. **Accessibility**: Proper keyboard navigation and screen reader support

## Benefits
- Enhanced visual storytelling capabilities
- Better organization of project assets
- Improved user engagement through detailed project views
- Consistent experience across all device types
- Scalable structure that can accommodate future enhancements