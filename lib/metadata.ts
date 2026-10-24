import { Metadata } from "next";
import { PERSONAL_INFO } from "./constants";

export const siteMetadata = {
  title: "Nanthini Murugan | Data Analyst",
  description:
    "Aspiring Data Analyst with a strong foundation in Python, SQL, data visualization, and analytical problem-solving. Passionate about transforming raw data into meaningful insights to support business decision-making. Experienced in AI and data analytics projects, with a commitment to continuous learning and professional growth.",
  author: "Nanthini Murugan",
  url: "https://nanthinimurugan.dev",
  keywords: [
    "Nanthini Murugan",
    "Data Analyst",
    "Artificial Intelligence",
    "Data Science",
    "Python Developer",
    "Machine Learning",
    "SQL",
    "Tableau",
    "EduNavigator",
    "TeamUp AI",
    "FixBox",
    "Predictive Modeling",
    "Portfolio",
    "IFET College of Engineering"
  ],
  locale: "en_US",
  type: "website",
};

export const defaultMetadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: "%s | Nanthini Murugan",
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: PERSONAL_INFO.name, url: siteMetadata.url }],
  creator: PERSONAL_INFO.name,
  metadataBase: new URL(siteMetadata.url),
  openGraph: {
    type: "website",
    locale: siteMetadata.locale,
    url: siteMetadata.url,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nanthini Murugan - Data Analyst & AI / Data Science Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: "@nanthinimurugan",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteMetadata.url,
  },
};

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: "Data Analyst & AI / Data Science Student",
    description: PERSONAL_INFO.bio,
    url: siteMetadata.url,
    email: PERSONAL_INFO.email,
    telephone: PERSONAL_INFO.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Neyveli, Cuddalore",
      addressRegion: "Tamil Nadu",
      addressCountry: "India",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: PERSONAL_INFO.college,
      },
    ],
    knowsAbout: [
      "Data Analytics",
      "Python",
      "SQL",
      "Machine Learning",
      "Data Visualization",
      "Tableau",
      "Full-Stack Development",
      "Predictive Modeling",
    ],
  };
}
