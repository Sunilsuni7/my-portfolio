
import { motion } from "framer-motion";
import { BriefcaseBusiness, Code2, Compass } from "lucide-react";
import "./ProfileSelection.css";

const profiles = [
  {
    title: "Recruiter",
    subtitle: "Explore my professional profile",
    icon: BriefcaseBusiness,
    color: "#8b5cf6",
    description: "Skills, education & resume",
  },
  {
    title: "Developer",
    subtitle: "Explore my coding journey",
    icon: Code2,
    color: "#3b82f6",
    description: "Projects, technologies & code",
  },
  {
    title: "Explorer",
    subtitle: "Discover everything about me",
    icon: Compass,
    color: "#06b6d4",
    description: "My complete portfolio",
  },
];

function ProfileSelection({ onSelect }) {
  return (
    <motion.section
      className="profile-selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="profile-selection-content">
        <motion.p
          className="profile-eyebrow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          WELCOME TO MY WORLD
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Who's watching?
        </motion.h1>

        <p className="profile-subtitle">
          Choose your experience
        </p>

        <div className="profile-cards">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;

            return (
              <motion.button
                key={profile.title}
                className="profile-card"
                onClick={() => onSelect(profile.title)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                whileHover={{ y: -12, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{ "--profile-color": profile.color }}
              >
                <div className="profile-avatar">
                  <Icon size={48} strokeWidth={1.5} />
                </div>

                <h2>{profile.title}</h2>

                <p>{profile.description}</p>

                <span className="profile-card-link">
                  {profile.subtitle} →
                </span>
              </motion.button>
            );
          })}
        </div>

        <p className="profile-footer">
          SUNIL S. — THE DEVELOPER SERIES
        </p>
      </div>
    </motion.section>
  );
}

export default ProfileSelection;
