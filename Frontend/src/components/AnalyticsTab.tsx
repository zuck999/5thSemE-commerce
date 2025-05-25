import { motion } from "framer-motion";


const AnimatedAnalyticsTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.8, y: 0 }}
      transition={{ duration: 10 , repeat: Infinity ,ease: "easeInOut"}}
      className="flex justify-center items-center text-9xl text-white"
    >

      AnalyticsTab
    </motion.div>
  );
};

export default AnimatedAnalyticsTab;
