import {
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

import {
  SiMysql,
  SiMongodb,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiJupyter,
  SiGooglecolab,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";
import { Database, LineChart, Code2, Globe, Server, Library, Wrench } from "lucide-react";

export const skillCategories = [
  {
    id: "programming",
    number: "01",
    title: "Programming Languages",
    icon: Code2,
    skills: [
      { id: "python", name: "Python", icon: FaPython },
      { id: "sql", name: "SQL", icon: Database },
      { id: "java", name: "Java (Basics)", icon: FaJava },
    ],
  },
  {
    id: "web-technologies",
    number: "02",
    title: "Web Technologies",
    icon: Globe,
    skills: [
      { id: "html", name: "HTML", icon: FaHtml5 },
      { id: "css", name: "CSS", icon: FaCss3Alt },
      { id: "react", name: "React.js", icon: FaReact },
    ],
  },
  {
    id: "database",
    number: "03",
    title: "Databases",
    icon: Server,
    skills: [
      { id: "mysql", name: "MySQL", icon: SiMysql },
      { id: "mongodb", name: "MongoDB", icon: SiMongodb },
    ],
  },
  {
    id: "libraries",
    number: "04",
    title: "Libraries & Frameworks",
    icon: Library,
    skills: [
      { id: "numpy", name: "NumPy", icon: SiNumpy },
      { id: "pandas", name: "Pandas", icon: SiPandas },
      { id: "matplotlib", name: "Matplotlib", icon: LineChart },
      { id: "scikit-learn", name: "Scikit-learn", icon: SiScikitlearn },
    ],
  },
  {
    id: "tools",
    number: "05",
    title: "Developer Tools",
    icon: Wrench,
    skills: [
      { id: "git", name: "Git", icon: FaGitAlt },
      { id: "github", name: "GitHub", icon: FaGithub },
      { id: "vscode", name: "VS Code", icon: VscVscode },
      { id: "jupyter", name: "Jupyter Notebook", icon: SiJupyter },
      { id: "google-colab", name: "Google Colab", icon: SiGooglecolab },
    ],
  },
];

export const categories = [
  { id: "all", label: "All Skills" },
  ...skillCategories.map((c) => ({
    id: c.id,
    label: c.title,
  })),
];

export const technologies = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({
    ...skill,
    category: category.title,
    categoryId: category.id,
  }))
);
