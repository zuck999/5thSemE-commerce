import { motion } from "framer-motion";
import { Chart } from "./ chart";


const AnimatedAnalyticsTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.8, y: 0 }}
      transition={{ duration: 1}}>
      <Chart/>
    </motion.div>
  );
};

export default AnimatedAnalyticsTab;
