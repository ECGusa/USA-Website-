import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "ECG TJNC USA Church | Enlightened Christian Gathering - The Jesus Nation Church",
  description = "ECG TJNC USA Church - Raising a people passionate about spiritual and socioeconomic transformation through the Gospel of Jesus Christ under prophetic grace and anointing.",
  keywords = "ECG TJNC USA Church, Enlightened Christian Gathering, TJNC, The Jesus Nation Church, church, prophetic ministry, Shepherd Bushiri, spiritual transformation, Gospel, Christian community",
  image = "/ecg-logo.png",
  url = "https://ecgtjncusachurch.org"
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ECG USA" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#04198C" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ECG TJNC USA Church" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Church",
          "name": "ECG TJNC USA Church | Enlightened Christian Gathering - The Jesus Nation Church",
          "description": description,
          "url": url,
          "logo": "/ecg-logo.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "4610 69th Avenue",
            "addressLocality": "Hyattsville",
            "addressRegion": "Maryland",
            "postalCode": "20784",
            "addressCountry": "US"
          },
          "telephone": "+1 508-361-4307",
          "email": "info@ecg-usa.org",
          "sameAs": [
            "https://facebook.com/ecgusa",
            "https://twitter.com/ecgusa",
            "https://instagram.com/ecgusa",
            "https://youtube.com/ecgusa"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;