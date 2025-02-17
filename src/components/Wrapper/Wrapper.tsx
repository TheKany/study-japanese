import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section style={{ margin: "0 auto", width: "90%" }}>{children}</section>
      </motion.div>
    </AnimatePresence>
  );
};

export default Wrapper;
