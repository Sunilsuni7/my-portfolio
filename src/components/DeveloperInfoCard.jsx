import { motion } from 'framer-motion';

export default function DeveloperInfoCard({ title, items, icon: Icon, reducedMotion }) {
  return (
    <motion.div
      className="developer-info-card premium-card"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      whileHover={reducedMotion ? {} : { y: -5, transition: { duration: 0.2 } }}
      tabIndex={0}
    >
      <div className="card-header">
        <Icon size={20} className="text-accent" />
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
