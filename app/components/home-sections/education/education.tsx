import EducationCard from "../../ui/education-card";
import { educationData } from "./education-data";
import { Section, SectionHeader } from "../../ui/section";
import { RevealGroup, RevealItem } from "../../ui/reveal";

export default function Education() {
  return (
    <Section id="education">
      <SectionHeader
        title="Education"
        lead="Both Sapienza degrees finished at 110/110 cum laude, the Bachelor's ranked first in its faculty."
      />

      <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2">
        {educationData.map((item) => (
          <RevealItem key={item.title} className="h-full">
            <EducationCard {...item} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
