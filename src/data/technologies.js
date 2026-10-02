import { FaPython, FaJava, FaJs, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub } from 'react-icons/fa';
import { Terminal, Database, Cpu, Layout, Globe, Wrench, LineChart, Code2, Layers, Network } from 'lucide-react';

export const categories = [
  { id: 'Programming', label: '01 — Programming' },
  { id: 'Frontend', label: '02 — Frontend' },
  { id: 'Backend', label: '03 — Backend' },
  { id: 'Database', label: '04 — Database' },
  { id: 'Data & AI', label: '05 — Data & AI' },
  { id: 'Tools', label: '06 — Tools' }
];

export const technologies = [
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    icon: FaPython,
    description: 'Used for application logic, data processing, automation and AI-oriented projects.',
    projects: ['Customer Churn Analysis', 'AI-Powered Supplier Chatbot', 'Intelligent AI Productivity Assistant']
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Programming',
    icon: FaJava,
    description: 'Strong object-oriented foundation used for robust standalone desktop applications.',
    projects: ['Cargo Express Courier Management']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Programming',
    icon: FaJs,
    description: 'Core language for interactive web interfaces and seamless client-side state management.',
    projects: ['Classic Shop for Electronic Gadgets']
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Frontend',
    icon: FaHtml5,
    description: 'Semantic markup structure for accessible and SEO-friendly web components.',
    projects: ['Classic Shop for Electronic Gadgets']
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Frontend',
    icon: FaCss3Alt,
    description: 'Modern styling including flexbox, grid, and responsive design systems.',
    projects: ['Classic Shop for Electronic Gadgets']
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend',
    icon: FaReact,
    description: 'Used to build component-based, highly responsive web interfaces.',
    projects: ['Classic Shop for Electronic Gadgets', 'HealthCarePro']
  },
  {
    id: 'react-router',
    name: 'React Router',
    category: 'Frontend',
    icon: Network,
    description: 'Declarative routing for dynamic, single-page application architectures.',
    projects: ['Classic Shop for Electronic Gadgets']
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    icon: Globe,
    description: 'React framework utilized for server-side rendering and optimized static generation.',
    projects: ['HealthCarePro']
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    icon: FaNodeJs,
    description: 'Asynchronous event-driven JavaScript runtime for scalable backend services.',
    projects: ['HealthCarePro']
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend',
    icon: Terminal,
    description: 'High-performance Python web framework used for building robust REST APIs.',
    projects: ['Intelligent AI Productivity Assistant']
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Database',
    icon: Database,
    description: 'Relational database querying, structuring, and management.',
    projects: ['Cargo Express Courier Management', 'HealthCarePro']
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Database',
    icon: Database,
    description: 'Reliable, scalable open-source relational database management system.',
    projects: ['Cargo Express Courier Management']
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'Database',
    icon: Database,
    description: 'Lightweight disk-based database for embedded application persistence.',
    projects: ['AI-Powered Supplier Chatbot']
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Data & AI',
    icon: Cpu,
    description: 'Fundamental package for scientific computing and large multi-dimensional arrays.',
    projects: ['Customer Churn Analysis']
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'Data & AI',
    icon: Layout,
    description: 'Data manipulation and analysis library for structured data operations.',
    projects: ['Customer Churn Analysis']
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    category: 'Data & AI',
    icon: LineChart,
    description: 'Comprehensive library for creating static, animated, and interactive visualizations.',
    projects: ['Customer Churn Analysis']
  },
  {
    id: 'scikit',
    name: 'Scikit-learn',
    category: 'Data & AI',
    icon: Layers,
    description: 'Machine learning library utilized for predictive data analysis and modeling.',
    projects: ['Customer Churn Analysis']
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'Data & AI',
    icon: Cpu,
    description: 'Advanced LLM integration for conversational AI and generative capabilities.',
    projects: ['Intelligent AI Productivity Assistant', 'AI-Powered Supplier Chatbot']
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Tools',
    icon: FaGitAlt,
    description: 'Version control system for tracking changes and collaborative engineering.',
    projects: []
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Tools',
    icon: FaGithub,
    description: 'Hosting platform for code repositories, CI/CD, and version control.',
    projects: []
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Tools',
    icon: Code2,
    description: 'Primary extensible code editor and development environment.',
    projects: []
  },
  {
    id: 'jupyter',
    name: 'Jupyter Notebook',
    category: 'Tools',
    icon: Wrench,
    description: 'Interactive computing environment for data science and analysis exploration.',
    projects: ['Customer Churn Analysis']
  },
  {
    id: 'colab',
    name: 'Google Colab',
    category: 'Tools',
    icon: Globe,
    description: 'Cloud-based Jupyter notebook environment equipped with GPU acceleration.',
    projects: ['Customer Churn Analysis']
  }
];
