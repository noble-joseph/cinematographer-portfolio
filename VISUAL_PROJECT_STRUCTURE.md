# Visual Project Structure

## Portfolio Item Structure Diagram

```mermaid
graph TD
    A[Project] --> B[Basic Info]
    A --> C[Media Assets]
    
    B --> B1[id]
    B --> B2[title]
    B --> B3[slug]
    B --> B4[year]
    B --> B5[client]
    B --> B6[role]
    B --> B7[categories]
    B --> B8[type]
    B --> B9[thumbnail]
    B --> B10[videoUrl]
    B --> B11[shortDescription]
    B --> B12[isFeatured]
    
    C --> C1[gallery]
    C1 --> C1A[Media Item 1]
    C1 --> C1B[Media Item 2]
    C1 --> C1C[Media Item 3]
    C1 --> C1D[Media Item n...]
    
    C1A --> C1A1[type: image/video]
    C1A --> C1A2[url]
    C1A --> C1A3[caption]
    
    C1B --> C1B1[type: image/video]
    C1B --> C1B2[url]
    C1B --> C1B3[caption]
    
    C1C --> C1C1[type: image/video]
    C1C --> C1C2[url]
    C1C --> C1C3[caption]
```

## Application Architecture Diagram

```mermaid
graph TD
    A[Client Application] --> B[Portfolio Page]
    A --> C[Project Detail Page]
    A --> D[API Layer]
    
    B --> B1[Project Cards]
    B --> B2[Media Count Display]
    B --> B3[Links to Detail Pages]
    
    C --> C1[Media Gallery]
    C --> C2[Navigation Controls]
    C --> C3[Thumbnail Strip]
    C --> C4[Project Information]
    
    D --> D1[Projects API]
    D --> D2[Data Mapping]
    D --> D3[Media Processing]
    
    D1 --> E[(Data Source)]
    E --> E1[Local Data]
    E --> E2[Strapi CMS]
```

## File Structure Tree

```
d:\iadithkrishna\
├── ak-portfolio-cms\
│   └── src\
│       └── api\
│           └── project\
│               └── content-types\
│                   └── project\
│                       └── schema.json (modified)
│
├── client\
│   └── src\
│       ├── api\
│       │   └── projectsApi.js (modified)
│       ├── components\
│       │   ├── Navbar.js (unchanged)
│       │   └── Navbar.css (unchanged)
│       ├── data\
│       │   └── projects.js (modified)
│       ├── pages\
│       │   ├── Portfolio.jsx (modified)
│       │   ├── ProjectDetail.jsx (new)
│       │   ├── Home.jsx (unchanged)
│       │   ├── About.jsx (unchanged)
│       │   └── Journeys.jsx (unchanged)
│       ├── App.js (modified)
│       └── App.css (modified)
│
├── PROJECT_STRUCTURE.md (new documentation)
├── SUMMARY_OF_CHANGES.md (new documentation)
└── VISUAL_PROJECT_STRUCTURE.md (this file)
```

## User Flow Diagram

```mermaid
graph LR
    A[User Visits Portfolio] --> B[Views Project Grid]
    B --> C[Sees Media Counts]
    C --> D[Clicks on Project Card]
    D --> E[Navigates to Project Detail]
    E --> F[Browses Media Gallery]
    F --> G[Uses Navigation Controls]
    G --> H[Views Different Media Items]
    H --> I[Selects from Thumbnail Strip]
```

## Component Relationship Diagram

```mermaid
graph TD
    A[App Component] --> B[Router]
    B --> C[Navbar]
    B --> D[Portfolio Page]
    B --> E[Project Detail Page]
    B --> F[Other Pages]
    
    D --> D1[Project Card Components]
    D1 --> D1A[Project Link]
    D1 --> D1B[Thumbnail Display]
    D1 --> D1C[Project Info]
    D1 --> D1D[Media Count]
    D1 --> D1E[View Project Button]
    
    E --> E1[Media Gallery Component]
    E --> E2[Project Info Component]
    E --> E3[Thumbnail Strip Component]
    
    E1 --> E1A[Main Media Display]
    E1 --> E1B[Navigation Arrows]
    E1 --> E1C[Media Counter]
    E1 --> E1D[Caption Display]
    
    E3 --> E3A[Thumbnail Items]
    E3A --> E3A1[Image Thumbnails]
    E3A --> E3A2[Video Thumbnails]
```