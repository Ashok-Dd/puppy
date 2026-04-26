import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import styles from './Sections.module.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ProjectsContent() {
  const { projects } = portfolioData;
  const [[page, direction], setPage] = useState([0, 0]);

  const index = Math.abs(page % projects.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const project = projects[index];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.sliderWrapper}>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={styles.slideBtn} 
          onClick={() => paginate(-1)}
        >
          <FiChevronLeft />
        </motion.button>
        
        <div className={styles.slideContainer}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div 
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              className={styles.projectSlide}
            >
              <div className={styles.projectHeader}>
                <div className={styles.projectTitleGroup}>
                  <h3>{project.title}</h3>
                  <h4>{project.subtitle}</h4>
                </div>
                <span className={styles.projectStatus} style={{ background: project.statusColor }}>
                  {project.status}
                </span>
              </div>

              <p className={styles.projectDesc}>{project.description}</p>

              <div className={styles.projectPoints}>
                {project.points.map((point, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className={styles.pointItem}
                  >
                    <span className={styles.pointDot} style={{ background: project.accent }} />
                    <p>{point}</p>
                  </motion.div>
                ))}
              </div>

              <div className={styles.projectStack}>
                {project.stack.map((tech, i) => (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    key={i} 
                    className={styles.techBadge} 
                    style={{ borderColor: project.accent + '66' }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={styles.slideBtn} 
          onClick={() => paginate(1)}
        >
          <FiChevronRight />
        </motion.button>
      </div>
      
      <div className={styles.sliderDots}>
        {projects.map((_, i) => (
          <motion.div 
            key={i} 
            animate={{ 
              scale: i === index ? 1.3 : 1,
              backgroundColor: i === index ? "var(--section-color)" : "rgba(255,255,255,0.1)"
            }}
            className={styles.dot}
            onClick={() => setPage([i, i > index ? 1 : -1])}
          />
        ))}
      </div>
    </div>
  );
}

