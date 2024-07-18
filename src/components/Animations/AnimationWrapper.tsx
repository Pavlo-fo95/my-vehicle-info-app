import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface AnimationWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({ children, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props} 
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;