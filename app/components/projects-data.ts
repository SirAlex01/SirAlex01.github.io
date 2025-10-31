export const projectsMetadata = {
  title: "Projects",
  subtitle: "A collection of my academic and personal projects, showcasing my journey through AI, machine learning, cybersecurity, and software engineering."
};

export const projects = [
  {
    id: "linear-b-translation",
    title: "An AI Framework for Linear B Translation into Ancient Greek and English",
    src: "/projects/master.webp",
    links: ["https://github.com/SirAlex01/MasterThesis"],
    description: "An end-to-end AI pipeline for translating Mycenaean Linear B into Ancient Greek and English, integrating a state-of-the-art cognate-matching model, auxiliary classification tasks, and prompt-engineered LLMs (Gemini 2.5 Flash) to enhance accuracy and consistency.",
    skills: ["Natural Language Processing", "Artificial Intelligence", "Machine Learning", "Python"],
    period: "Jan 2025 - Oct 2025"
  },
  {
    id: "grosso",
    title: "GROSSO - Automatic Prompter for Attack/Defense CTFs",
    src: "/projects/grosso.webp",
    links: ["https://github.com/SirAlex01/GROSSO"],
    description: "An interactive tool that enables API-based communication with an informed instance of Gemini for automatic vulnerability detection and exploit generation, featuring an interactive chat interface for exploit refinement. Designed for Attack-Defense CTFs and developed in preparation for the CyberChallenge.IT finals.",
    skills: ["Python", "Vulnerability Assessment"],
    period: "Jun 2025 - Jul 2025"
  },
  {
    id: "bipedal-walker",
    title: "Reinforcement Learning algorithms on Bipedal Walker",
    src: "/projects/bipedal_walker.gif",
    links: ["https://github.com/SirAlex01/Machine-Learning-Project"],
    description: "Implemented and compared various Reinforcement Learning algorithms, including Q-table, Deep Q-Network (DQN), and Proximal Policy Optimization (PPO), within the Bipedal Walker environment of Gymnasium. Analyzed performance and effectiveness of each algorithm in training an agent to navigate challenging terrain.",
    skills: ["Python", "Reinforcement Learning", "Machine Learning", "Artificial Intelligence"],
    period: "Jul 2024"
  },
  {
    id: "video-prediction",
    title: "Video Prediction",
    src: "/projects/videopred.webp",
    links: ["https://github.com/SirAlex01/Computer-Vision-Project-Maiola-Matini"],
    description: "A Computer Vision project tackling video prediction by testing and enhancing the latest models with a focus on integrating Temporal and Spatial Attention mechanisms. Experimented on MovingMNIST and UCF101 datasets to improve model performance in video understanding tasks using state-of-the-art attention-based techniques.",
    skills: ["Python", "Machine Learning", "PyTorch", "Artificial Intelligence", "Computer Vision"],
    period: "Aug 2024 - Sep 2024"
  },
  {
    id: "emofy",
    title: "EMOFY",
    src: "/projects/emofy.webp",
    links: ["https://github.com/kev187038/EMOFY"],
    description: "A distributed application built using Docker, Kubernetes (Minikube), and Jenkins for face detection and emotion recognition. Users upload images stored in MinIO alongside model checkpoints. The system supports automatic retraining using correctly labeled images and allows users to apply filters to enhance the dataset for improved model training.",
    skills: ["HTML", "JavaScript", "Bootstrap", "Docker", "Minikube", "CI/CD", "Jenkins", "Java", "CSS", "Kubernetes", "DevOps"],
    period: "Jan 2024 - Oct 2024"
  },
  {
    id: "data-integration",
    title: "Data Integration",
    src: "/projects/pentaho.webp",
    links: ["https://github.com/SirAlex01/LSDM-IIS"],
    description: "Used Pentaho Data Integration to address a data integration task formally defined through an Information Integration System. The project involved materializing the global schema while exploring query virtualization, and formally demonstrating equivalence between queries executed on the global schema and those virtualized on the source schema.",
    skills: ["Information Integration", "Big Data Management", "Pentaho Data Integration"],
    period: "Jul 2024 - Aug 2024"
  },
  {
    id: "graph-vs-relational",
    title: "Comparison between Relational and Graph data models",
    src: "/projects/graph_db.webp",
    links: ["https://github.com/kev187038/Data-Management-Project"],
    description: "Compared the performance of graph data models and relational data models using Neo4j and PostgreSQL, focusing on a richly interconnected domain - the English dictionary, with synonyms, antonyms, hyponyms, and hypernyms. Assessed the strengths and weaknesses of each model in representing and querying complex relationships.",
    skills: ["Relational Data Model", "Graph Data Model", "PostgreSQL", "Neo4j"],
    period: "Apr 2024 - May 2024"
  },
  {
    id: "hbase-presentation",
    title: "HBase Presentation",
    src: "/projects/hbase.webp",
    links: ["https://github.com/SirAlex01/Large-Scale-Data-Management-Project"],
    description: "Presented HBase, a tool from the Hadoop framework, for managing data using the column family data model. Demonstrated its integration with the broader Hadoop ecosystem (HDFS and MapReduce) and illustrated advantages of using HBase for scalable data management and real-time data processing scenarios.",
    skills: ["HBase", "Java", "Big Data Management", "Hadoop Framework"],
    period: "Apr 2024 - May 2024"
  },
  {
    id: "change-detection",
    title: "Change detection in satellite images",
    src: "/projects/unet.webp",
    links: ["https://github.com/SirAlex01/1933744_LABIAGI"],
    description: "Bachelor's thesis project utilizing machine learning models, specifically U-Nets, to detect changes caused by human activities in the Onera Satellite Change Detection Dataset. Demonstrated the suitability of U-Net architecture for change detection when paired with appropriate loss functions.",
    skills: ["Python", "Machine Learning", "Artificial Intelligence"],
    period: "May 2023 - Jun 2023"
  },
  {
    id: "malloc-implementation",
    title: "Malloc reimplementation from scratch",
    src: "/projects/malloc.webp",
    links: ["https://github.com/SirAlex01/1933744_PseudoMalloc_SO.git"],
    description: "Reimplemented the malloc function from scratch using C, designing a custom memory allocation system that efficiently manages dynamic memory. Addressed challenges such as fragmentation and allocation strategies, gaining deeper understanding of memory management concepts and system-level programming.",
    skills: ["C"],
    period: "Jun 2023"
  },
  {
    id: "sapienza-casino",
    title: "Sapienza Casino",
    src: "/projects/casino.webp",
    links: ["https://github.com/SirAlex01/Sapienza-casino"],
    description: "A virtual casino environment with different gambling games developed for the Web Languages and Technologies course. Showcases full web stack development including front-end and back-end integration, dynamic content handling, session management, and real-time user interaction in online environments.",
    skills: ["PHP", "HTML", "JavaScript", "CSS", "jQuery"],
    period: "Mar 2023 - May 2023"
  },
  {
    id: "ml-models-reimplementation",
    title: "Machine Learning Models reimplementation",
    src: "/projects/ml_models.webp",
    links: ["https://drive.google.com/file/d/1l5qa9dbAC7AezP_T6nICMoe5nGoacD_N/view?usp=sharing"],
    description: "Reimplemented various machine learning models from scratch and compared their performance with scikit-learn implementations using the Online News Popularity Dataset. This hands-on experience provided deep understanding of algorithm mechanics, efficiency, and highlighted strengths and limitations of each approach.",
    skills: ["Python", "Machine Learning", "Artificial Intelligence"],
    period: "Feb 2023 - Apr 2023"
  },
  {
    id: "lan-wifi-simulation",
    title: "Simulating LAN and Wi-Fi Networks",
    src: "/projects/udp_adhoc_ack.webp",
    links: ["https://github.com/SirAlex01/HomeworkTLC", "https://github.com/Dr3dre/exercises-on-IEEE-802.11-NetAnim"],
    description: "Simulated virtual LAN and Wi-Fi networks using C++, Wireshark, and NetAnim. Created various scenarios to analyze traffic and packet flow within networks, gaining solid understanding of telecommunications fundamentals and operational principles of network systems.",
    skills: ["C++", "Wireshark", "NetAnim"],
    period: "Oct 2022 - Dec 2022"
  }
];
