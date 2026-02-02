"use client";

import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { assistants, categories, type Assistant } from "@/lib/assistants";
import { cn } from "@/lib/utils";

export default function AssistantsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("featured");

  const filteredAssistants = assistants.filter((assistant) => {
    const matchesSearch =
      searchQuery === "" ||
      assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "featured" ||
      assistant.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSelectAssistant = (assistant: Assistant) => {
    document.cookie = `selected-assistant=${assistant.id}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.push("/");
  };

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link className="text-sm text-muted-foreground hover:text-foreground" href="/">
            Zurück zum Chat
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        {/* Title */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
          initial={{ opacity: 0, y: -10 }}
        >
          <h1 className="font-bold text-4xl">Assistenten</h1>
          <p className="mt-2 text-muted-foreground">
            Entdecken Sie spezialisierte KI-Assistenten für verschiedene Aufgaben
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Assistenten durchsuchen..."
              value={searchQuery}
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <Button
              className={cn(
                "rounded-full",
                selectedCategory === category.id &&
                  "border-foreground bg-foreground text-background hover:bg-foreground/90"
              )}
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              size="sm"
              variant="outline"
            >
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Assistants Grid */}
        <motion.div
          animate={{ opacity: 1 }}
          className="mt-8 grid gap-4 sm:grid-cols-2"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          {filteredAssistants.map((assistant, index) => (
            <motion.button
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-muted"
              initial={{ opacity: 0, y: 20 }}
              key={assistant.id}
              onClick={() => handleSelectAssistant(assistant)}
              transition={{ delay: 0.1 * index }}
              type="button"
            >
              <div
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-bold text-lg text-white",
                  assistant.avatarColor || "bg-accent"
                )}
              >
                {assistant.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{assistant.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {assistant.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  von {assistant.author}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {filteredAssistants.length === 0 && (
          <div className="mt-12 text-center text-muted-foreground">
            Keine Assistenten gefunden
          </div>
        )}
      </main>
    </div>
  );
}
