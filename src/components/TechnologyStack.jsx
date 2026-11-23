import { useState, useMemo } from "react";
import { skillCategories, categories } from "../data/technologies";
import TechnologyCategory from "./TechnologyCategory";
import TechnologyCard from "./TechnologyCard";
import ScrollReveal from "./common/ScrollReveal";

export default function TechnologyStack() {
  const [activeCategory, setActiveCategory] = useState("all");

  const visibleCategories = useMemo(() => {
    if (activeCategory === "all") {
      return skillCategories;
    }
    return skillCategories.filter((cat) => cat.id === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" className="section min-skills-section">
      <div className="container">
        <div className="min-skills-wrapper">
          {/* SECTION HEADER */}
          <ScrollReveal delay={0} className="section-header">
            <div className="min-section-label">
              TECHNICAL SKILLS
            </div>

            <h2 className="section-title">
              Technical Skills
            </h2>

            <p className="min-section-subtitle">
              A structured overview of core programming languages, web technologies, database systems, libraries, and developer tools.
            </p>
          </ScrollReveal>

          {/* CATEGORY FILTER TABS */}
          <ScrollReveal delay={80} className="min-category-tabs-wrapper">
            <div className="min-category-tabs" role="tablist" aria-label="Skill categories">
              {categories.map((cat) => (
                <TechnologyCategory
                  key={cat.id}
                  label={cat.label}
                  isActive={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                />
              ))}
            </div>
          </ScrollReveal>

          {/* SKILL CATEGORIES GRID */}
          <div
            className={`min-skills-categories-grid ${activeCategory === "all" ? "grid-all" : "grid-single"}`}
          >
            {visibleCategories.map((category, idx) => {
              const CatIcon = category.icon;
              return (
                <ScrollReveal
                  key={category.id}
                  delay={idx * 75}
                  className="min-category-card"
                >
                  {/* CATEGORY CARD HEADER */}
                  <div className="min-category-card-header">
                    <div className="min-category-header-title">
                      <h3 className="min-category-title">{category.title}</h3>
                    </div>
                    {CatIcon && (
                      <div className="min-category-icon-badge" aria-hidden="true">
                        <CatIcon size={16} />
                      </div>
                    )}
                  </div>

                  {/* SKILLS CARDS LIST */}
                  <div className="min-skills-cards-list" role="list">
                    {category.skills.map((skill, sIdx) => (
                      <ScrollReveal
                        key={skill.id || skill.name}
                        delay={idx * 40 + sIdx * 35}
                        yOffset={14}
                        duration={450}
                        as="div"
                      >
                        <TechnologyCard skill={skill} />
                      </ScrollReveal>
                    ))}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
