const notes = [
  {
    title: "Data Structures and Algorithms - Lecture Notes",
    author: "John Doe",
    username: "john_d123",
    subject: "Computer Science",
    course: "B.Tech CSE (5th Semester)",
    description: "Comprehensive lecture notes covering essential data structures and algorithms, including trees, graphs, sorting algorithms, and dynamic programming concepts.",
    tags: ["DSA", "Algorithms", "Graphs", "Sorting"],
    datePosted: "2024-10-14",
    views: 156,
    downloads: 67,
    fileType: "PDF",
    likecount: 90,
    profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGK3diR3Zi-mnOXEaj-3ewmFyRYVxGzVzZw&s'
  },
  {
    title: "Organic Chemistry - Chapter 3 Summary",
    author: "Jane Smith",
    username: "jane_chem101",
    subject: "Chemistry",
    course: "B.Sc Chemistry (3rd Semester)",
    description: "A summarized version of Chapter 3 (Aldehydes and Ketones) of Organic Chemistry. Includes reaction mechanisms, key concepts, and important notes for revision.",
    tags: ["Chemistry", "OrganicChem", "Aldehydes", "Ketones"],
    datePosted: "2024-10-12",
    views: 102,
    downloads: 50,
    fileType: "DOCX",
    likecount: 90,
    profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGK3diR3Zi-mnOXEaj-3ewmFyRYVxGzVzZw&s'
  },
  {
    title: "Modern History - World War II Notes",
    author: "Rajiv Kumar",
    username: "rajiv_historybuff",
    subject: "History",
    course: "B.A History (2nd Year)",
    description: "Detailed notes on the causes, events, and consequences of World War II. Includes maps, timelines, and important figures involved in the war.",
    tags: ["History", "WorldWarII", "ModernHistory"],
    datePosted: "2024-10-10",
    views: 200,
    downloads: 95,
    fileType: "PDF",
    likecount: 90,
    profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGK3diR3Zi-mnOXEaj-3ewmFyRYVxGzVzZw&s'
  },
  {
    title: "Introduction to Machine Learning - Lecture 5 Notes",
    author: "Ananya Gupta",
    username: "ananya_ai_learner",
    subject: "Artificial Intelligence",
    course: "B.Tech CSE (6th Semester)",
    description: "Lecture notes covering unsupervised learning algorithms, including k-means clustering and principal component analysis (PCA). Includes code snippets and visualizations.",
    tags: ["MachineLearning", "AI", "UnsupervisedLearning", "PCA"],
    datePosted: "2024-10-15",
    views: 310,
    downloads: 140,
    fileType: "PDF",
    likecount: 90,
    profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGK3diR3Zi-mnOXEaj-3ewmFyRYVxGzVzZw&s'
  },
  {
    title: "Electrical Circuit Analysis - Notes and Examples",
    author: "Neha Verma",
    username: "neha_ee",
    subject: "Electrical Engineering",
    course: "B.Tech EEE (4th Semester)",
    description: "Complete notes on electrical circuit analysis, covering topics like Ohm’s law, Kirchhoff's laws, AC and DC circuits, and Thevenin’s Theorem with practical examples.",
    tags: ["ElectricalEngineering", "Circuits", "OhmsLaw", "Thevenin"],
    datePosted: "2024-10-09",
    views: 120,
    downloads: 70,
    fileType: "PDF",
    likecount: 90,
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGK3diR3Zi-mnOXEaj-3ewmFyRYVxGzVzZw&s"
  },
  {
    title: "Power Systems Analysis - Lecture Notes",
    author: "Rohit Sharma",
    username: "rohit_psa",
    subject: "Electrical Engineering",
    course: "B.Tech EEE (6th Semester)",
    description: "Notes on power systems, including transmission line theory, fault analysis, and load flow studies with solved examples.",
    tags: ["PowerSystems", "TransmissionLines", "LoadFlowAnalysis", "FaultAnalysis"],
    datePosted: "2024-10-11",
    views: 85,
    downloads: 50,
    fileType: "PDF",
    likecount: 70,
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHhJ0eq6h13TI3cHBR3_LIuIKrtHjRmtRybA&s"
  },
  {
    title: "Digital Electronics - Logic Gates and Circuits",
    author: "Aarti Mehta",
    username: "aarti_ece_2024",
    subject: "Electronics Engineering",
    course: "B.Tech ECE (3rd Semester)",
    description: "Lecture notes covering logic gates, flip-flops, counters, and combinational circuits with step-by-step examples.",
    tags: ["DigitalElectronics", "LogicGates", "FlipFlops", "CombinationalCircuits"],
    datePosted: "2024-09-30",
    views: 200,
    downloads: 150,
    fileType: "DOCX",
    likecount: 110,
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL0qGMrFHYKBLGyyVJbF3YlEjMS5C1BXWTIA&s"
  },
  {
    title: "Advanced Java Programming - Concepts and Examples",
    author: "Vikas Singh",
    username: "vikas_java_master",
    subject: "Computer Science",
    course: "B.Tech CSE (5th Semester)",
    description: "In-depth notes on advanced Java topics like multithreading, collections framework, and networking in Java.",
    tags: ["Java", "Multithreading", "CollectionsFramework", "Networking"],
    datePosted: "2024-10-05",
    views: 300,
    downloads: 220,
    fileType: "PDF",
    likecount: 180,
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMCcDANHjEkVEtzFcz_aGDN_H7_9aBaKf2Mg&s"
  },
  {
    title: "Object-Oriented Programming in Java",
    author: "Vikas Singh",
    username: "vikas_java_master",
    subject: "Computer Science",
    course: "B.Tech CSE (5th Semester)",
    description: "Notes on OOP concepts in Java, including inheritance, polymorphism, encapsulation, and abstraction with code examples.",
    tags: ["OOP", "Java", "Inheritance", "Polymorphism"],
    datePosted: "2024-09-20",
    views: 270,
    downloads: 180,
    fileType: "PPT",
    likecount: 150,
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfupX8fSxmfs9ZSnFhDZVZVpzs1A9Q7XUeag&s"
  },
  {
    title: "Web Development - Frontend Basics",
    author: "Ananya Roy",
    username: "ananya_webdev",
    subject: "Web Development",
    course: "Web Development Bootcamp",
    description: "Comprehensive notes on frontend development using HTML, CSS, and JavaScript, focusing on responsive design.",
    tags: ["WebDevelopment", "Frontend", "HTML", "CSS", "JavaScript"],
    datePosted: "2024-08-15",
    views: 350,
    downloads: 300,
    fileType: "PDF",
    likecount: 250,
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCp1kZJxBO9QHiBgRtPJeIgLVyIDyyWgDsfA&s"
  },
  {
    title: "Backend Development with Node.js",
    author: "Ananya Roy",
    username: "ananya_webdev",
    subject: "Web Development",
    course: "Web Development Bootcamp",
    description: "Detailed notes on backend development using Node.js, covering REST APIs, Express, and MongoDB integration.",
    tags: ["WebDevelopment", "Nodejs", "Backend", "MongoDB", "RESTAPIs"],
    datePosted: "2024-09-25",
    views: 400,
    downloads: 350,
    fileType: "DOCX",
    likecount: 300,
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3sTLbRtJbJWS6rvqeFbVbQaWnNECQmtZNrw&s"
  }
];


   const authors = [
    {
      id: 1,
      name: "John Doe",
      profilePic: "https://example.com/profile/johndoe.jpg",
      bio: "A passionate computer science student with a keen interest in data structures and algorithms. Loves sharing knowledge and helping others succeed in their studies.",
      email: "johndoe@example.com",
      degree: "B.Tech in Computer Science",
      achievements: [
        "Winner of the National Coding Championship 2024",
        "Published research paper on Machine Learning",
        "Top 5% in Data Structures and Algorithms course"
      ],
      strongSubjects: ["Data Structures", "Algorithms", "Object-Oriented Programming"],
      socialMedia: {
        facebook: "https://facebook.com/johndoe",
        twitter: "https://twitter.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe"
      }
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic: "https://example.com/profile/janesmith.jpg",
      bio: "An enthusiastic chemistry major dedicated to simplifying complex concepts. Enjoys teaching and creating educational materials.",
      email: "janesmith@example.com",
      degree: "B.Sc in Chemistry",
      achievements: [
        "Presented research at the National Chemistry Symposium 2023",
        "Published article in Chemistry Journal",
        "Conducted workshops for high school students"
      ],
      strongSubjects: ["Organic Chemistry", "Physical Chemistry", "Analytical Chemistry"],
      socialMedia: {
        facebook: "https://facebook.com/janesmith",
        twitter: "https://twitter.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith"
      }
    },
    {
      id: 3,
      name: "Rajiv Kumar",
      profilePic: "https://example.com/profile/rajivkumar.jpg",
      bio: "History buff and aspiring educator, focusing on modern history. Aims to make history engaging and accessible for all students.",
      email: "rajivkumar@example.com",
      degree: "B.A in History",
      achievements: [
        "Awarded Best Student in History Department 2024",
        "Organized historical documentaries screening event",
        "Published articles on historical events in local magazine"
      ],
      strongSubjects: ["Modern History", "World History", "Cultural Studies"],
      socialMedia: {
        facebook: "https://facebook.com/rajivkumar",
        twitter: "https://twitter.com/rajivkumar",
        linkedin: "https://linkedin.com/in/rajivkumar"
      }
    },
    {
      id: 4,
      name: "Ananya Gupta",
      profilePic: "https://example.com/profile/ananyagupta.jpg",
      bio: "AI enthusiast and technology lover. Currently exploring machine learning and its applications in real-world problems.",
      email: "ananyagupta@example.com",
      degree: "B.Tech in Computer Science",
      achievements: [
        "Completed internship at a leading AI startup",
        "Developed a project on image recognition using AI",
        "Presented at the International AI Conference 2024"
      ],
      strongSubjects: ["Machine Learning", "Artificial Intelligence", "Data Analysis"],
      socialMedia: {
        facebook: "https://facebook.com/ananyagupta",
        twitter: "https://twitter.com/ananyagupta",
        linkedin: "https://linkedin.com/in/ananyagupta"
      }
    },
    {
      id: 5,
      name: "Neha Verma",
      profilePic: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg",
      bio: "Electrical engineering student with a strong focus on circuit analysis. Passionate about renewable energy and sustainable engineering practices.",
      email: "nehaverma@example.com",
      degree: "B.Tech in Electrical Engineering",
      achievements: [
        "Interned at a renewable energy firm",
        "Awarded best project in Electrical Circuits course",
        "Participated in National Robotics Competition"
      ],
      strongSubjects: ["Circuit Analysis", "Electromagnetics", "Control Systems"],
      socialMedia: {
        facebook: "https://facebook.com/nehaverma",
        twitter: "https://twitter.com/nehaverma",
        linkedin: "https://linkedin.com/in/nehaverma"
      }
    }
  ];
  

  const courseSubjects = [
    {
      course: "B.Tech CSE",
      subjects: [
        "Data Structures",
        "Algorithms",
        "Operating Systems",
        "Database Management Systems",
        "Computer Networks",
        "Machine Learning",
        "Artificial Intelligence",
        "Software Engineering",
        "Compiler Design",
        "Distributed Systems",
        "Thory of Computation"
      ]
    },
    {
      course: "B.Tech EEE",
      subjects: [
        "Electrical Circuits",
        "Power Systems",
        "Control Systems",
        "Electrical Machines",
        "Analog Electronics",
        "Digital Electronics",
        "Microprocessors and Microcontrollers",
        "Electromagnetic Theory",
        "Power Electronics",
        "High Voltage Engineering"
      ]
    },
    {
      course: "B.Tech ECE",
      subjects: [
        "Signal Processing",
        "Analog Circuits",
        "Digital Circuits",
        "Microprocessors",
        "Telecommunication Systems",
        "VLSI Design",
        "Embedded Systems",
        "Control Systems",
        "Antennas and Wave Propagation",
        "Optical Communication"
      ]
    },
    {
      course: "B.Sc Chemistry",
      subjects: [
        "Organic Chemistry",
        "Inorganic Chemistry",
        "Physical Chemistry",
        "Analytical Chemistry",
        "Environmental Chemistry",
        "Industrial Chemistry",
        "Spectroscopy",
        "Thermodynamics",
        "Polymer Chemistry",
        "Biochemistry"
      ]
    },
    {
      course: "B.Sc Physics",
      subjects: [
        "Mechanics",
        "Electromagnetism",
        "Quantum Physics",
        "Thermodynamics",
        "Optics",
        "Nuclear Physics",
        "Solid State Physics",
        "Particle Physics",
        "Electronics",
        "Statistical Mechanics"
      ]
    },
    {
      course: "B.Sc Mathematics",
      subjects: [
        "Calculus",
        "Linear Algebra",
        "Abstract Algebra",
        "Probability and Statistics",
        "Differential Equations",
        "Real Analysis",
        "Complex Analysis",
        "Number Theory",
        "Topology",
        "Discrete Mathematics"
      ]
    },
    {
      course: "B.A History",
      subjects: [
        "Ancient History",
        "Medieval History",
        "Modern History",
        "World History",
        "Indian History",
        "Political History",
        "Cultural History",
        "Economic History",
        "Historical Research Methods",
        "History of Science and Technology"
      ]
    },
    {
      course: "B.A English",
      subjects: [
        "English Literature",
        "Literary Criticism",
        "Shakespeare Studies",
        "Romantic Poetry",
        "Modern Drama",
        "American Literature",
        "Indian Writing in English",
        "Linguistics",
        "Postcolonial Literature",
        "Creative Writing"
      ]
    },
    {
      course: "B.Com",
      subjects: [
        "Financial Accounting",
        "Business Law",
        "Corporate Accounting",
        "Taxation",
        "Auditing",
        "Cost Accounting",
        "Economics",
        "Management Accounting",
        "Financial Management",
        "Entrepreneurship"
      ]
    },
    {
      course: "BBA",
      subjects: [
        "Principles of Management",
        "Business Economics",
        "Marketing Management",
        "Human Resource Management",
        "Financial Management",
        "Operations Management",
        "Organizational Behavior",
        "Business Communication",
        "Entrepreneurship Development",
        "Strategic Management"
      ]
    },
    {
      course: "Web Development Bootcamp",
      subjects: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Version Control (Git)",
        "RESTful APIs",
        "Responsive Web Design"
      ]
    },
    {
      course: "MBA",
      subjects: [
        "Marketing Management",
        "Financial Management",
        "Human Resource Management",
        "Operations Management",
        "Business Analytics",
        "Strategic Management",
        "Organizational Behavior",
        "Business Ethics",
        "Entrepreneurship",
        "Leadership and Change Management"
      ]
    }
  ];
  
  export default courseSubjects;
  
  export { notes, authors,courseSubjects };