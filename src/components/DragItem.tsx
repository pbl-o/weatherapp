import { motion } from "framer-motion";

interface Props {
  color: string;
  children: React.ReactNode;
} 



export const TheMotionEl = ( {color, children}: Props ) => {
  return (
    <motion.div
      style={{
        width: "auto",
        height: "100%",
        backgroundColor: color,
        borderRadius: "10px",
        padding:'1rem'
      }}
      drag
      dragConstraints={{ top: -100, bottom: 100, left: -100, right: 100 }}
      whileDrag={{ scale: 1.2, rotate: 15 }}
      whileTap={{ cursor: "grabbing" }}
    >
      {children}
    </motion.div>
  );
};