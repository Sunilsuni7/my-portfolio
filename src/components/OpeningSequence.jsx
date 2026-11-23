
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import profile from "../assets/profile.jpg";
import "./OpeningSequence.css";

export default function OpeningSequence({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 700),
      setTimeout(() => setStage(2), 1800),
      setTimeout(() => setStage(3), 3000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const enterPortfolio = () => {
    setFinished(true);
    setTimeout(onComplete, 900);
  };

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          className="opening-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          <div className="opening-glow" />
          <div className="opening-grid" />

          <div className="opening-content">

            <motion.p
              className="opening-studio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: stage >= 1 ? 1 : 0, y: 0 }}
            >
              PERSONAL DEVELOPER PORTFOLIO
            </motion.p>

            <motion.h1
              className="opening-name"
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{
                opacity: stage >= 2 ? 1 : 0,
                scale: stage >= 2 ? 1 : 0.7,
                y: 0,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              SUNIL <span>S.</span>
            </motion.h1>

            <motion.div
              className="opening-line"
              initial={{ width: 0 }}
              animate={{ width: stage >= 2 ? 120 : 0 }}
              transition={{ duration: 1 }}
            />

            <motion.h2
              className="opening-subtitle"
              initial={{ opacity: 0, letterSpacing: "12px" }}
              animate={{
                opacity: stage >= 3 ? 1 : 0,
                letterSpacing: "5px",
              }}
              transition={{ duration: 0.9 }}
            >
              THE DEVELOPER SERIES
            </motion.h2>

            <motion.div
              className="opening-portrait"
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{
                opacity: stage >= 3 ? 1 : 0,
                y: 0,
                scale: 1,
              }}
              transition={{ duration: 0.8 }}
            >
              <img src={profile} alt="Sunil S." />
            </motion.div>

            <motion.button
              className="opening-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: stage >= 3 ? 1 : 0, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={enterPortfolio}
              disabled={stage < 3}
            >
              START EXPLORING
              <span> →</span>
            </motion.button>

            <p className="opening-footer">
              PYTHON · WEB DEVELOPMENT · AI
            </p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
