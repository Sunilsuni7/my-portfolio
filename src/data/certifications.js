import infosysCertImg from '../assets/infosys-python-foundation.png';
import ibmCertImg from '../assets/ibm-deep-learning.png';
import deloitteCertImg from '../assets/deloitte-data-analytics.png';

export const certifications = [
  {
    id: "python-foundation-certification",
    title: "Python Foundation Certification",
    organization: "Infosys Springboard",
    date: "May 2026",
    completionDate: "May 2, 2026",
    issuedDate: "May 5, 2026",
    recipient: "Sunil S",
    skills: ["Python", "Problem Solving", "Object-Oriented Programming"],
    image: infosysCertImg,
    imagePublicPath: "infosys-python-foundation.png",
    hasImage: true,
  },
  {
    id: "ibm-deep-learning",
    title: "IBM Deep Learning with PyTorch, Keras and TensorFlow",
    organization: "IBM / Coursera",
    date: "February 25, 2026",
    completionDate: "February 25, 2026",
    recipient: "Sunil S",
    skills: ["Deep Learning", "PyTorch", "Keras", "TensorFlow"],
    image: ibmCertImg,
    imagePublicPath: "ibm-deep-learning.png",
    hasImage: true,
  },
  {
    id: "data-analytics-job-simulations",
    title: "Data Analytics Job Simulations",
    organization: "Deloitte",
    date: "July 2026",
    completionDate: "July 2, 2026",
    recipient: "Sunil S",
    skills: ["Data Analysis", "Forensic Technology", "Business Analysis"],
    image: deloitteCertImg,
    imagePublicPath: "deloitte-data-analytics.png",
    hasImage: true,
  },
];
