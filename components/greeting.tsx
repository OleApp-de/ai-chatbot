import { motion } from "framer-motion";
import { BrainIcon, CodeIcon, FileTextIcon, ImageIcon, MessageSquareIcon, SearchIcon } from "lucide-react";

// Mock assistant data - in production this would come from props or API
const assistant = {
  name: "KI-Assistent",
  avatar: "KI",
  author: "KI-Plattform",
  description: "Ihr intelligenter Assistent für Texte, Analysen, kreative Projekte und vieles mehr. Stellen Sie mir Fragen oder lassen Sie mich Ihnen bei Ihren Aufgaben helfen.",
  skills: [
    { icon: MessageSquareIcon, label: "Texte verfassen" },
    { icon: SearchIcon, label: "Recherche" },
    { icon: CodeIcon, label: "Code schreiben" },
    { icon: FileTextIcon, label: "Dokumente analysieren" },
    { icon: BrainIcon, label: "Komplexe Themen erklären" },
    { icon: ImageIcon, label: "Bilder beschreiben" },
  ],
};

export const Greeting = () => {
  return (
    <div
      className="mx-auto mt-8 flex size-full max-w-2xl flex-col items-center px-4 md:mt-16 md:px-8"
      key="overview"
    >
      {/* Avatar */}
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent shadow-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <span className="font-bold text-3xl text-accent-foreground">{assistant.avatar}</span>
      </motion.div>

      {/* Name */}
      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-bold text-2xl md:text-3xl"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.3 }}
      >
        {assistant.name}
      </motion.h1>

      {/* Author */}
      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="mt-1 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.35 }}
      >
        von {assistant.author}
      </motion.p>

      {/* Description */}
      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 max-w-md text-balance text-center text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.4 }}
      >
        {assistant.description}
      </motion.p>

      {/* Skills */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
      >
        {assistant.skills.map((skill, index) => (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            key={skill.label}
            transition={{ delay: 0.5 + index * 0.05 }}
          >
            <skill.icon className="h-3.5 w-3.5" />
            <span>{skill.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Divider before quick actions */}
      <motion.div
        animate={{ opacity: 1 }}
        className="mt-8 w-full"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.7 }}
      >
        <p className="mb-3 text-center text-sm text-muted-foreground">
          Probieren Sie es aus:
        </p>
      </motion.div>
    </div>
  );
};
