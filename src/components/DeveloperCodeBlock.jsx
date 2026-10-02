import { motion } from 'framer-motion';

export default function DeveloperCodeBlock() {
  return (
    <motion.div 
      className="developer-code-block premium-card"
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
      }}
    >
      <div className="code-header">
        <div className="code-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="code-title">developer.js</span>
      </div>
      <pre className="code-content">
        <code>
          <span className="keyword">const</span> <span className="variable">developer</span> = {"{\n"}
          {"  "}<span className="property">focus</span>: <span className="string">"Full Stack + AI"</span>,{"\n"}
          {"  "}<span className="property">primary</span>: [<span className="string">"Python"</span>, <span className="string">"React"</span>],{"\n"}
          {"  "}<span className="property">backend</span>: [<span className="string">"FastAPI"</span>, <span className="string">"Node.js"</span>],{"\n"}
          {"  "}<span className="property">database</span>: [<span className="string">"SQL"</span>, <span className="string">"SQLite"</span>]{"\n"}
          {"}"};
        </code>
      </pre>
    </motion.div>
  );
}
