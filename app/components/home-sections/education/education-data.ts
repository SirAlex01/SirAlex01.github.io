export interface EducationItem {
  title: string;
  school: string;
  years: string;
  mark: string;
  icon: string; // e.g. "graduation-cap"
  thesis?: string; // only this one is optional
  link?: string; // ✅ optional external link
}

export const educationData: EducationItem[] = [
  {
    title: "Master's Degree in Engineering in Computer Science",
    school: "Sapienza University, Rome",
    years: "2023 – 2025",
    thesis: "An AI framework for Linear B Translation into Ancient Greek and English",
    mark: "In progress",
    icon: "graduation-cap",
    link: "https://www.uniroma1.it/en/pagina-strutturale/home"
  },
  {
    title: "Bachelor's Degree in Computer and Automation Engineering",
    school: "Sapienza University, Rome",
    years: "2020 – 2023",
    thesis: "Change Detection on Satellite Images using Neural Networks",
    mark: "110/110 cum laude",
    icon: "graduation-cap",
    link: "https://www.uniroma1.it/en/pagina-strutturale/home"
  },
  {
    title: "High School Diploma in Classical Studies",
    school: "Istituto Sant'Apollinare, Rome",
    years: "2015 – 2020",
    mark: "100/100 cum laude",
    icon: "school",
    link: "https://www.istitutoapollinare.org"
  },
  {
    title: "Certified C1 Advanced (IELTS Academic) – English",
    school: "IELTS IDP, Rome",
    years: "2024",
    mark: "7.5/9.0",
    icon: "languages",
    link: "https://ielts.idp.com"
  },
];
