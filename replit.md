# Underground Jesus - Conference 2026

## Project Overview

A static promotional website for the Underground Jesus Conference 2026. Exported from Webflow.

## Tech Stack

- **Type:** Static HTML/CSS/JS site (Webflow export)
- **Languages:** HTML5, CSS3, JavaScript
- **Libraries:** GSAP (animations via CDN), Webflow.js, Adobe Typekit fonts
- **Payments/Tickets:** Square/SquareLink integration (external links)

## Project Structure

```
/
├── index.html                        # Main landing page
├── 401.html                          # Password protection page (Webflow default)
├── css/
│   ├── normalize.css                 # CSS reset
│   ├── webflow.css                   # Webflow core styles
│   └── underground-jesus.webflow.css # Site-specific styles
├── js/
│   └── webflow.js                    # Webflow interactions/animations
├── images/                           # All image assets (PNG, JPG, AVIF)
└── videos/                           # Background video assets (MP4, WebM)
```

## Running the Project

The site is served via Python's built-in HTTP server:

- **Workflow:** "Start application"
- **Command:** `python3 -m http.server 5000 --bind 0.0.0.0`
- **Port:** 5000

## Deployment

Configured as a static deployment with `publicDir: "."`.
