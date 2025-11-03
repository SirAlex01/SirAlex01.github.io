export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alessio Maiola",
    "jobTitle": "Software Engineer",
    "description": "Software Engineer specialized in AI, Machine Learning, and Cybersecurity. Master's graduate from Sapienza University of Rome, CTF player with TRX.",
    "url": "https://siralex01.github.io",
    "email": "alessio.maiola2001@gmail.com",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Sapienza University of Rome",
      "sameAs": "https://www.uniroma1.it"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
      "Cybersecurity",
      "Software Engineering",
      "Data Engineering",
      "Python",
      "CTF",
      "Computer Science"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/alessio-maiola-275718331",
      "https://github.com/SirAlex01"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
