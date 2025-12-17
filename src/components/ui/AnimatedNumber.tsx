import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  format?: (value: number) => string;
  duration?: number;
}

const AnimatedNumber = ({
  value,
  format = (v) => Math.round(v).toString(),
  duration = 3,
}: AnimatedNumberProps) => {
  const motionValue = useMotionValue(0);
  const formatted = useTransform(motionValue, (latest) =>
    format(latest)
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
    });

    return controls.stop;
  }, [value, duration, motionValue]);

  return <motion.span>{formatted}</motion.span>;
};

export default AnimatedNumber;
