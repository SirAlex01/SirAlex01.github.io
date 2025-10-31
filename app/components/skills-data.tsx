import {
  FaLock,
  FaDatabase,
  FaProjectDiagram,
  FaNetworkWired,
  FaRobot,
  FaUniversity,
} from "react-icons/fa";
import { GiBrain, GiCircuitry } from "react-icons/gi";
import {
  SiNextdotjs,
} from "react-icons/si";

export const skillCategories = [
  {
    title: "Artificial Intelligence and Machine Learning",
    icon: <GiBrain />,
    skills: [
      "Supervised / Unsupervised Learning",
      "Reinforcement Learning (Q-Learning, DQN, PPO)",
      "Deep Learning Architectures (CNN, RNN, LSTM, Transformers)",
      "Computer Vision (U-Net, Attention Models, Video Prediction)",
      "Natural Language Processing (LLMs, Prompt Engineering)",
      "PyTorch, TensorFlow, scikit-learn",
      "Data Preprocessing and Feature Engineering",
    ],
  },
  {
    title: "Software Engineering and DevOps",
    icon: <FaProjectDiagram />,
    skills: [
      "Software Architecture and Design Patterns",
      "System Design and Distributed Systems",
      "Version Control (Git, GitHub)",
      "Docker, Kubernetes, Jenkins, CI/CD, Containerization",
      "Testing, Logging and Monitoring",
      "Agile Development and Project Planning",
      "Dependable Distributed Systems",
      "Algorithm Design and Formal Verification",
    ],
  },
  {
    title: "Web and Backend Engineering",
    icon: <SiNextdotjs />,
    skills: [
      "Full Stack Web Development (Next.js, React, TypeScript)",
      "FastAPI, Flask, Node.js REST APIs",
      "JWT Authentication and Async Endpoints",
      "SSR, SPA, and API Design Patterns",
      "Tailwind CSS, ShadCN/UI, Responsive Design",
      "Dynamic Routing and Component Reusability",
    ],
  },
  {
    title: "Cybersecurity and Ethical Hacking",
    icon: <FaLock />,
    skills: [
      "CTF Challenges (Crypto, Pwn, Web, Rev)",
      "Binary Exploitation (GDB, IDA, pwntools)",
      "Cryptanalysis (RSA, AES, Diffie-Hellman, LCG attacks)",
      "Web Exploitation (SQL injections, CSRF, SSRF, XSS)",
      "Reverse Engineering and Vulnerability Analysis",
      "Security Governance and Secure Coding Practices",
    ],
  },
  {
    title: "Data and Database Systems",
    icon: <FaDatabase />,
    skills: [
      "PostgreSQL, MySQL, SQLite",
      "SQLAlchemy ORM and Migrations",
      "Data Modeling and Query Optimization",
      "Large-Scale Data Management (HBase, Hadoop)",
      "ETL Tools (Pentaho Data Integration)",
      "Big Data Processing and Analysis",
    ],
  },
  {
    title: "Networking and Systems",
    icon: <FaNetworkWired />,
    skills: [
      "TCP/IP, UDP, HTTP/HTTPS, SSL/TLS",
      "LAN/Wi-Fi Simulation (C++, NetAnim, Wireshark)",
      "Firewall Configuration and VPN Management",
      "System Administration (Linux, UNIX, Bash)",
      "Socket Programming and Network Protocols",
    ],
  },
  {
    title: "Programming and Tooling",
    icon: <GiCircuitry />,
    skills: [
      "Python, C, C++, Java, JavaScript, TypeScript, PHP, Go, Scala",
      "OOP and Functional Programming",
      "MATLAB, NumPy, Pandas, OpenCV",
      "Linux CLI Tools, Shell Scripting, Git",
      "Next.js, React, Tailwind CSS, ShadCN/UI, Framer Motion",
    ],
  },
  {
    title: "Robotics and Control Systems",
    icon: <FaRobot />,
    skills: [
      "Robotics Kinematics and Control",
      "Automatic Control Systems",
    ],
  },
  {
    title: "Foundations and Theoretical Knowledge",
    icon: <FaUniversity />,
    skills: [
      "Algorithm Analysis and Computational Complexity",
      "Probability, Statistics and Operations Research",
      "Data Mining, Big Data Computing and Decision Analytics",
      "Optimization, Linear Algebra and Numerical Methods",
      "Formal Methods, Logic Design and System Verification",
      "Physics, Electronics, and Control Systems Theory",
      "Geometry and Mathematical Analysis",
    ],
  },
];
