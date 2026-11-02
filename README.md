# KOENA houses — Real Estate Static Website

This repository contains a static real estate website for KOENA houses, built using HTML, CSS, and JavaScript. The project was expanded for Part 3 to include stronger interactivity, SEO improvements, and validated form functionality.

## Project overview

The site includes the following pages:
- `index.html` — homepage with property positioning and CTA messaging
- `about.html` — company overview and brand story
- `service.html` — services and package information
- `properties.html` — searchable/listed property portfolio with lightbox modal
- `contact.html` — general contact form with validation and mailto submission flow
- `enquiry.html` — property enquiry form with client-side validation

## Files included
- `style.css` — main site styling and responsive layout
- `script.js` — mobile navigation, property filtering, lightbox modal, and form validation logic
- `robots.txt` — crawler instructions for search engines
- `sitemap.xml` — XML sitemap for indexing
- `images/logo.svg` — custom site logo used in the header/footer

## SEO implementation
- Title tags and meta descriptions were added to each page
- Relevant local keywords such as “real estate,” “property listings,” and “home buying” were included in page metadata
- Clean internal linking was maintained across all pages
- A sitemap and robots file were created for crawler guidance
- Mobile-friendly responsive layout and accessible form controls were retained for usability

## Functionality added
- Responsive mobile navigation menu
- Property search and category filtering on the listings page
- Image lightbox modal for property cards
- Contact and enquiry forms with JavaScript validation
- Local storage for saved enquiry submissions
- OpenStreetMap integration for the contact page map section
- Form actions that point to a real email endpoint for submission handling

## Local run instructions
Open the project in a browser, or serve it locally:

```bash
python -m http.server 8000
```

Then visit:
- `http://localhost:8000`

## Changelog
### 2026-11-02 — Part 3 enhancements and fixes
- Added search and category filtering to the properties page to improve usability and allow quick discovery of listings.
- Added a lightbox modal so users can preview property images in a larger view without leaving the listing page.
- Added JavaScript validation for both the contact form and enquiry form, including required fields, email pattern checks, and minimum message length rules.
- Implemented client-side submission handling that saves form data in `localStorage` under the `koena_submissions` key for demonstration purposes.
- Added a map section on the contact page using an embedded OpenStreetMap iframe to improve location-based information.
- Added SEO metadata to each HTML page, including title tags, meta descriptions, keywords, Open Graph tags, and canonical links.
- Created `robots.txt` and `sitemap.xml` to support search engine crawl instructions and indexing.
- Updated the site branding assets by introducing a custom SVG logo in the `images` folder.
- Improved overall accessibility with labelled form fields, aria-live status output, and responsive mobile navigation.
- Reviewed the site structure and corrected minor inconsistencies in form IDs, page descriptions, and page content continuity.
- Updated the published domain references to the GitHub Pages-style URL format for search and deployment readiness.

### Feedback implementation and corrections
- Added consistent page titles and descriptions to better match the real estate brand and improve search relevance.
- Standardised form structures and semantics across `contact.html` and `enquiry.html` to keep the user experience aligned with the assignment requirements.
- Improved navigation and CTA consistency to support continuity between pages and strengthen conversion pathways.
- Ensured all pages point to the correct local assets and maintain a professional, mobile-friendly layout.

## References
1. MDN Web Docs. (2026). HTML forms and validation. https://developer.mozilla.org/en-US/docs/Learn/Forms
2. MDN Web Docs. (2026). LocalStorage. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
3. OpenStreetMap. (2026). Embed map examples. https://www.openstreetmap.org
4. Google Search Central. (2026). Search Essentials. https://developers.google.com/search/docs/fundamentals/seo-starter-guide
5. W3C. (2026). HTML standard and accessibility guidelines. https://www.w3.org/standards/webdesign/htmlcss

## Note
This website is a static front-end project and does not use a backend service for storing submissions or sending emails. The implemented validation and storage are browser-side and intended to demonstrate functionality for the assessment.
