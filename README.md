# Sunil S. — Software Developer Portfolio

A premium, interactive, and responsive developer portfolio built with React and Vite. It highlights my background in Information Science Engineering, technical skills, practical full-stack/AI projects, and professional experience.

## Overview

- **Author:** Sunil S.
- **Role:** Software Developer (Python, React, Full-Stack, AI)
- **Email:** sunilsriramappa@gmail.com
- **LinkedIn:** [linkedin.com/in/sunil-s-460a5937b](https://www.linkedin.com/in/sunil-s-460a5937b)
- **GitHub:** [github.com/Sunilsuni7](https://github.com/Sunilsuni7)

## Features

- **Interactive 3D Hero:** Custom WebGL profile presentation using `@react-three/fiber` and `@react-three/drei`.
- **Developer Ecosystem UI:** Interactive technology stack cards with categorized filtering.
- **Projects Showcase:** Accessible modal-based project viewing.
- **Experience Timeline:** Vertical, responsive timeline of professional and internship experiences.
- **Code-Split Architecture:** Heavy dependencies (like Three.js) are lazily loaded and chunked for high performance.
- **Accessibility & UX:** Fully responsive, semantic HTML, `prefers-reduced-motion` support, and keyboard navigable.

## Tech Stack

- **Frontend:** React, Vite
- **Styling:** Custom CSS, Framer Motion (for fluid animations)
- **3D Graphics:** Three.js, React Three Fiber
- **Icons:** Lucide React, React Icons

## Getting Started

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Sunilsuni7/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Build for Production

To generate a production-ready optimized build:

```bash
npm run build
```
This will create a `dist/` directory with minified assets. Note: Vite will properly chunk vendor libraries like `three.js` to ensure the core application remains lightweight.
