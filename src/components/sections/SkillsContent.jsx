import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import styles from './Sections.module.css';
import { 
  SiPython, SiJavascript, SiReact, SiFastapi, SiFlask, 
  SiPytorch, SiScikitlearn, SiMongodb, SiSqlite, SiGit, 
  SiPostman, SiJupyter, SiOpencv, SiPandas, SiNumpy,
  SiPytorch as SiTorch, SiTensorflow, SiOpenai
} from 'react-icons/si';
import { 
  FiCode, FiCpu, FiDatabase, 
  FiBarChart2, FiTool, FiLock,
  FiZap, FiEye
} from 'react-icons/fi';
import { TbBrain, TbRobot } from 'react-icons/tb';
import { FaJava } from 'react-icons/fa';

const categoryIconMap = {
  languages: <FiCode />,
  ai: <TbBrain />,
  frameworks: <FiZap />,
  data: <FiBarChart2 />,
  tools: <FiTool />,
  security: <FiLock />,
  agentic: <TbRobot />,
  cv: <FiEye />
};

const skillIconMap = {
  'Python': <SiPython color="#3776AB" />,
  'Java': <FaJava color="#007396" />,
  'SQL': <FiDatabase color="#4479A1" />,
  'React.js': <SiReact color="#61DAFB" />,
  'FastAPI': <SiFastapi color="#05998B" />,
  'Flask': <SiFlask color="#FFFFFF" />,
  'PyTorch': <SiPytorch color="#EE4C2C" />,
  'YOLOv8': <SiTorch color="#EE4C2C" />,
  'Scikit-learn': <SiScikitlearn color="#F7931E" />,
  'Pandas': <SiPandas color="#150458" />,
  'NumPy': <SiNumpy color="#013243" />,
  'MongoDB': <SiMongodb color="#47A248" />,
  'SQLite': <SiSqlite color="#003B57" />,
  'Git': <SiGit color="#F05032" />,
  'Postman': <SiPostman color="#FF6C37" />,
  'Jupyter': <SiJupyter color="#F37626" />,
  'OpenCV': <SiOpencv color="#5C3EE8" />,
  'LLM Apps': <SiOpenai color="#412991" />,
  'Computer Vision': <FiEye color="#00ff88" />,
  'Machine Learning': <TbBrain color="#a855f7" />,
  'Deep Learning': <SiTensorflow color="#FF6F00" />,
  'NLP': <FiCode color="#00e5ff" />,
  'RAG': <FiDatabase color="#00ff88" />,
  'Vector DB': <SiMongodb color="#00ff88" />,
  'JWT': <SiOpenai color="#a855f7" />, // Using OpenAI as a placeholder for security/AI
  'Matplotlib': <FiBarChart2 color="#ffab00" />,
  'EDA': <FiBarChart2 color="#00e5ff" />,
};

export default function SkillsContent() {
  const { skills } = portfolioData;

  if (!skills) return <div className={styles.error}>No skills data found</div>;

  return (
    <div className={styles.skillsContainer}>
      <div className={styles.skillsGrid}>
        {skills.map((skillGroup, i) => (
          <motion.div 
            key={skillGroup.id || i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={styles.skillGroupCard} 
            style={{ '--group-color': skillGroup.color }}
          >
            <div className={styles.skillGroupHeader}>
              <span className={styles.skillIcon}>
                {categoryIconMap[skillGroup.id] || skillGroup.icon}
              </span>
              <h3>{skillGroup.category}</h3>
            </div>
            <div className={styles.skillList}>
              {skillGroup.items.map((item, j) => (
                <motion.span 
                  key={j} 
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className={styles.skillBadge}
                >
                  <span className={styles.badgeIcon}>{skillIconMap[item]}</span>
                  {item}
                </motion.span>
              ))}
            </div>
            <div className={styles.cardGlow} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

