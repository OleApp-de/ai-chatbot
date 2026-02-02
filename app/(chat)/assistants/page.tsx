"use client";

import { motion } from "framer-motion";
import { SearchIcon, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChatHeader } from "@/components/chat-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { assistants, categories, type Assistant } from "@/lib/assistants";
import { cn } from "@/lib/utils";

// Helper to get favorites from cookie
function getFavoritesFromCookie(): string[] {
  if (typeof document === "undefined") return ["general"];
  const match = document.cookie.match(/favorite-assistants=([^;]+)/);
  if (match) {
    try {
      return JSON.parse(decodeURIComponent(match[1]));
    } catch {
      return ["general"];
    }
  }
  return ["general"];
}

function saveFavoritesToCookie(favorites: string[]) {
  document.cookie = `favorite-assistants=${encodeURIComponent(JSON.stringify(favorites))}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

export default function AssistantsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>(["general"]);

  useEffect(() => {
    setFavorites(getFavoritesFromCookie());
  }, []);

  const filteredAssistants = assistants.filter((assistant) => {
    const matchesSearch =
      searchQuery === "" ||
      assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      assistant.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (assistantId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(assistantId)
      ? favorites.filter((id) => id !== assistantId)
      : [...favorites, assistantId];
    setFavorites(newFavorites);
    saveFavoritesToCookie(newFavorites);
    
    if (newFavorites.includes(assistantId)) {
      toast.success("Zu Favoriten hinzugefugt");
    } else {
      toast.success("Aus Favoriten entfernt");
    }
  };

  const handleSelectAssistant = (assistant: Assistant) => {
    document.cookie = `selected-assistant=${assistant.id}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex h-dvh flex-col">
      <ChatHeader selectedModelId="" />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 lg:px-8">
          {/* Title */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            initial={{ opacity: 0, y: -10 }}
          >
            <h1 className="font-bold text-3xl md:text-4xl">Assistenten</h1>
            <p className="mt-2 text-balance text-muted-foreground">
              Entdecken Sie spezialisierte KI-Assistenten für verschiedene Aufgaben
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-8 max-w-md"
            initial={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-12 rounded-full border-border bg-muted/50 pl-10"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Assistenten durchsuchen..."
                value={searchQuery}
              />
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              className={cn(
                "rounded-full",
                selectedCategory === "all" &&
                  "border-foreground bg-foreground text-background hover:bg-foreground/90"
              )}
              onClick={() => setSelectedCategory("all")}
              size="sm"
              variant="outline"
            >
              Alle
            </Button>
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
            className="mt-10 grid gap-4 sm:grid-cols-2"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            {filteredAssistants.map((assistant, index) => {
              const isFavorite = favorites.includes(assistant.id);
              return (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-foreground/20 hover:shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  key={assistant.id}
                  transition={{ delay: 0.05 * index }}
                >
                  {/* Favorite Star Button */}
                  <button
                    className={cn(
                      "absolute right-3 top-3 p-1 rounded-full transition-colors",
                      isFavorite 
                        ? "text-yellow-500 hover:text-yellow-600" 
                        : "text-muted-foreground/50 hover:text-muted-foreground opacity-0 group-hover:opacity-100"
                    )}
                    onClick={(e) => toggleFavorite(assistant.id, e)}
                    type="button"
                  >
                    <StarIcon className={cn("h-5 w-5", isFavorite && "fill-current")} />
                  </button>
                  
                  {/* Clickable content */}
                  <button
                    className="flex flex-1 items-start gap-4 text-left"
                    onClick={() => handleSelectAssistant(assistant)}
                    type="button"
                  >
                    <div
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-bold text-lg text-white transition-transform group-hover:scale-105",
                        assistant.avatarColor || "bg-accent"
                      )}
                    >
                      {assistant.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">{assistant.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {assistant.shortDescription}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        von {assistant.author}
                      </p>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>

          {filteredAssistants.length === 0 && (
            <div className="mt-12 text-center text-muted-foreground">
              Keine Assistenten gefunden
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
