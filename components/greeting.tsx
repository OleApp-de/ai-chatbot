import { motion } from "framer-motion";

export const Greeting = () => {
  return (
    <div
      className="mx-auto mt-4 flex size-full max-w-3xl flex-col items-center justify-center px-4 md:mt-16 md:px-8"
      key="overview"
    >
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent"
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.3 }}
      >
        <span className="font-bold text-2xl text-accent-foreground">LB</span>
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-balance text-center font-bold text-2xl md:text-4xl"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
      >
        Willkommen bei LED Board Bielefeld
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 text-balance text-center text-lg text-muted-foreground md:text-xl"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
      >
        Wie kann ich Ihnen heute helfen?
      </motion.div>
    </div>
  );
};
