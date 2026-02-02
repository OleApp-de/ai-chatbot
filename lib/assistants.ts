import {
  BrainIcon,
  CodeIcon,
  FileTextIcon,
  ImageIcon,
  MessageSquareIcon,
  SearchIcon,
  PenToolIcon,
  CalculatorIcon,
  BookOpenIcon,
  BriefcaseIcon,
  SparklesIcon,
  type LucideIcon,
} from "lucide-react";

export interface AssistantSkill {
  icon: LucideIcon;
  label: string;
}

export interface Assistant {
  id: string;
  name: string;
  avatar: string;
  avatarColor?: string;
  author: string;
  description: string;
  shortDescription: string;
  skills: AssistantSkill[];
  suggestedActions: Array<{
    title: string;
    description: string;
  }>;
  category: "featured" | "writing" | "productivity" | "research" | "creative";
}

export const assistants: Assistant[] = [
  {
    id: "general",
    name: "KI-Assistent",
    avatar: "KI",
    avatarColor: "bg-accent",
    author: "KI-Plattform",
    description:
      "Ihr intelligenter Assistent für Texte, Analysen, kreative Projekte und vieles mehr. Stellen Sie mir Fragen oder lassen Sie mich Ihnen bei Ihren Aufgaben helfen.",
    shortDescription: "Vielseitiger Assistent für alle Aufgaben",
    skills: [
      { icon: MessageSquareIcon, label: "Texte verfassen" },
      { icon: SearchIcon, label: "Recherche" },
      { icon: CodeIcon, label: "Code schreiben" },
      { icon: FileTextIcon, label: "Dokumente analysieren" },
      { icon: BrainIcon, label: "Komplexe Themen erklären" },
      { icon: ImageIcon, label: "Bilder beschreiben" },
    ],
    suggestedActions: [
      {
        title: "Was kannst du alles?",
        description: "Erfahre mehr über meine Fähigkeiten",
      },
      {
        title: "Hilf mir bei einem Projekt",
        description: "Kreative oder technische Unterstützung",
      },
      {
        title: "Erkläre ein Thema",
        description: "Komplexe Sachverhalte einfach verstehen",
      },
      {
        title: "Schreibe einen Text",
        description: "E-Mails, Artikel oder andere Inhalte",
      },
    ],
    category: "featured",
  },
  {
    id: "writer",
    name: "Schreib-Assistent",
    avatar: "SA",
    avatarColor: "bg-blue-500",
    author: "KI-Plattform",
    description:
      "Spezialisiert auf das Verfassen von Texten aller Art. Von E-Mails über Blogposts bis hin zu kreativen Geschichten - ich helfe Ihnen, die richtigen Worte zu finden.",
    shortDescription: "Texte, E-Mails und kreatives Schreiben",
    skills: [
      { icon: PenToolIcon, label: "Kreatives Schreiben" },
      { icon: MessageSquareIcon, label: "E-Mails formulieren" },
      { icon: FileTextIcon, label: "Artikel verfassen" },
      { icon: BookOpenIcon, label: "Geschichten erzählen" },
    ],
    suggestedActions: [
      {
        title: "Schreibe eine E-Mail",
        description: "Professionell und auf den Punkt",
      },
      {
        title: "Verfasse einen Blogpost",
        description: "Interessant und gut strukturiert",
      },
      {
        title: "Hilf mir beim Brainstorming",
        description: "Ideen für Texte entwickeln",
      },
      {
        title: "Verbessere meinen Text",
        description: "Stil und Grammatik optimieren",
      },
    ],
    category: "writing",
  },
  {
    id: "coder",
    name: "Code-Assistent",
    avatar: "CA",
    avatarColor: "bg-emerald-500",
    author: "KI-Plattform",
    description:
      "Ihr Experte für Programmierung und technische Fragen. Ich helfe beim Schreiben, Debuggen und Erklären von Code in verschiedenen Programmiersprachen.",
    shortDescription: "Programmierung und technische Hilfe",
    skills: [
      { icon: CodeIcon, label: "Code schreiben" },
      { icon: SearchIcon, label: "Bugs finden" },
      { icon: BrainIcon, label: "Konzepte erklären" },
      { icon: FileTextIcon, label: "Dokumentation" },
    ],
    suggestedActions: [
      {
        title: "Schreibe eine Funktion",
        description: "In jeder Programmiersprache",
      },
      {
        title: "Erkläre diesen Code",
        description: "Verständlich und detailliert",
      },
      {
        title: "Finde den Bug",
        description: "Debugging-Unterstützung",
      },
      {
        title: "Best Practices zeigen",
        description: "Sauberer und effizienter Code",
      },
    ],
    category: "productivity",
  },
  {
    id: "analyst",
    name: "Analyse-Assistent",
    avatar: "AA",
    avatarColor: "bg-purple-500",
    author: "KI-Plattform",
    description:
      "Spezialisiert auf Datenanalyse, Recherche und das Aufbereiten von Informationen. Ich helfe Ihnen, komplexe Daten zu verstehen und Erkenntnisse zu gewinnen.",
    shortDescription: "Datenanalyse und Recherche",
    skills: [
      { icon: CalculatorIcon, label: "Daten analysieren" },
      { icon: SearchIcon, label: "Recherchieren" },
      { icon: FileTextIcon, label: "Berichte erstellen" },
      { icon: BrainIcon, label: "Trends erkennen" },
    ],
    suggestedActions: [
      {
        title: "Analysiere diese Daten",
        description: "Muster und Erkenntnisse finden",
      },
      {
        title: "Recherchiere ein Thema",
        description: "Umfassend und strukturiert",
      },
      {
        title: "Erstelle einen Bericht",
        description: "Klar und übersichtlich",
      },
      {
        title: "Vergleiche Optionen",
        description: "Pro und Contra abwägen",
      },
    ],
    category: "research",
  },
  {
    id: "creative",
    name: "Kreativ-Assistent",
    avatar: "KA",
    avatarColor: "bg-pink-500",
    author: "KI-Plattform",
    description:
      "Ihr Partner für kreative Projekte. Von Brainstorming über Konzeptentwicklung bis hin zu kreativen Texten - ich bringe frische Ideen in Ihre Projekte.",
    shortDescription: "Kreative Ideen und Inspiration",
    skills: [
      { icon: SparklesIcon, label: "Ideen generieren" },
      { icon: PenToolIcon, label: "Konzepte entwickeln" },
      { icon: ImageIcon, label: "Visuelle Ideen" },
      { icon: BriefcaseIcon, label: "Projektplanung" },
    ],
    suggestedActions: [
      {
        title: "Brainstorming starten",
        description: "Frische Ideen sammeln",
      },
      {
        title: "Konzept entwickeln",
        description: "Von der Idee zum Plan",
      },
      {
        title: "Kreative Texte schreiben",
        description: "Geschichten, Slogans, mehr",
      },
      {
        title: "Projekt planen",
        description: "Struktur und Meilensteine",
      },
    ],
    category: "creative",
  },
];

export const getAssistantById = (id: string): Assistant | undefined => {
  return assistants.find((a) => a.id === id);
};

export const getDefaultAssistant = (): Assistant => {
  return assistants[0];
};

export const getAssistantsByCategory = (
  category: Assistant["category"]
): Assistant[] => {
  return assistants.filter((a) => a.category === category);
};

export const categories = [
  { id: "featured", label: "Empfohlen" },
  { id: "writing", label: "Schreiben" },
  { id: "productivity", label: "Produktivität" },
  { id: "research", label: "Recherche" },
  { id: "creative", label: "Kreativ" },
] as const;
