import { educationData } from "../home-sections/education/education-data";
import { workData } from "../home-sections/work/work-data";
import { skillCategories } from "../skills-data";

const SITE = "https://siralex01.github.io";

/**
 * JSON-LD describing the site owner as a Person entity.
 *
 * Derived from the same data files the page renders, so the structured data
 * cannot drift out of sync with the visible content - adding a job or a degree
 * updates both. Search engines penalise schema that contradicts the page.
 */
export default function StructuredData() {
  const person = {
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: "Alessio Maiola",
    givenName: "Alessio",
    familyName: "Maiola",
    jobTitle: workData[0]?.role ?? "Software Engineer",
    description:
      "Software Engineer specialized in AI, Machine Learning, and Cybersecurity. Master's graduate from Sapienza University of Rome, CTF player with TRX.",
    url: SITE,
    image: `${SITE}/alex.webp`,
    email: "mailto:alessio.maiola2001@gmail.com",
    nationality: { "@type": "Country", name: "Italy" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rome",
      addressCountry: "IT",
    },
    worksFor: workData
      .filter((job) => job.current)
      .map((job) => ({ "@type": "Organization", name: job.company })),
    hasOccupation: workData.map((job) => ({
      "@type": "Occupation",
      name: job.role,
      occupationLocation: { "@type": "City", name: "Rome" },
    })),
    alumniOf: [
      ...new Set(educationData.map((item) => item.school)),
    ].map((school) => ({
      "@type": "EducationalOrganization",
      name: school,
      ...(school.includes("Sapienza") ? { sameAs: "https://www.uniroma1.it" } : {}),
    })),
    knowsAbout: skillCategories.map((category) => category.title),
    knowsLanguage: [
      { "@type": "Language", name: "Italian" },
      { "@type": "Language", name: "English" },
    ],
    sameAs: [
      "https://www.linkedin.com/in/alessio-maiola-275718331",
      "https://github.com/SirAlex01",
      "https://theromanxpl0.it/members/siralex/",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "Alessio Maiola Portfolio",
    inLanguage: "en",
    publisher: { "@id": `${SITE}/#person` },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
