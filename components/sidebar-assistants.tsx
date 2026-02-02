"use client";

import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { assistants, getAssistantById, type Assistant } from "@/lib/assistants";
import { cn } from "@/lib/utils";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

interface SidebarAssistantsProps {
  selectedAssistantId: string;
}

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
  return ["general"]; // Default favorite
}

export function SidebarAssistants({ selectedAssistantId }: SidebarAssistantsProps) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const [favoriteIds, setFavoriteIds] = useState<string[]>(["general"]);

  useEffect(() => {
    setFavoriteIds(getFavoritesFromCookie());
  }, []);

  const favoriteAssistants = favoriteIds
    .map((id) => getAssistantById(id))
    .filter((a): a is Assistant => a !== undefined);

  const handleSelectAssistant = (assistant: Assistant) => {
    document.cookie = `selected-assistant=${assistant.id}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setOpenMobile(false);
    router.push("/");
    router.refresh();
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between">
        <span>Assistenten</span>
        <Link
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          href="/assistants"
          onClick={() => setOpenMobile(false)}
        >
          <SearchIcon className="h-3 w-3" />
          <span>Entdecken</span>
        </Link>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {favoriteAssistants.map((assistant) => (
            <SidebarMenuItem key={assistant.id}>
              <SidebarMenuButton
                className={cn(
                  "h-auto py-2",
                  selectedAssistantId === assistant.id && "bg-sidebar-accent"
                )}
                onClick={() => handleSelectAssistant(assistant)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                      assistant.avatarColor || "bg-accent"
                    )}
                  >
                    {assistant.avatar}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium text-sm truncate">
                      {assistant.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {assistant.shortDescription}
                    </span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          
          {favoriteAssistants.length === 0 && (
            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
              Keine Favoriten.
              <Link className="block mt-1 text-foreground hover:underline" href="/assistants">
                Assistenten entdecken
              </Link>
            </div>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
