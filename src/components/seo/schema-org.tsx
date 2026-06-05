
'use client';

/**
 * @fileOverview Enterprise Structured Data Component
 * Provides LocalBusiness, Organization, and Service schema for Google rich snippets.
 */

export function SchemaOrg() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "WaterTreatmentCompany",
    "name": "Aqua Safe Water Technologies",
    "image": "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20Jun%205%2C%202026%2C%2001_00_17%20PM.png",
    "@id": "https://aquasafero.com",
    "url": "https://aquasafero.com",
    "telephone": "+919985850777",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "#07-13-23/2, NH-5 Main Road, Old Gajuwaka",
      "addressLocality": "Visakhapatnam",
      "addressRegion": "AP",
      "postalCode": "530026",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.68962,
      "longitude": 83.2104523
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/aquasafero",
      "https://www.instagram.com/aquasafero",
      "https://www.linkedin.com/company/aquasafero"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aqua Safe Water Technologies",
    "alternateName": "AquaSafe Hub",
    "url": "https://aquasafero.com",
    "logo": "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20Jun%205%2C%202026%2C%2001_00_17%20PM.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919985850777",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "Hindi", "Telugu"]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
