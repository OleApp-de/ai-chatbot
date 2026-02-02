"use client";

import { BotIcon, MoreHorizontalIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { assistants, type Assistant } from "@/lib/assistants";
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

export function SidebarAssistants({ selectedAssistantId }: SidebarAssistantsProps) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

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
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          href="/assistants"
          onClick={() => setOpenMobile(false)}
        >
          Alle anzeigen
        </Link>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {assistants.map((assistant) => (
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
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
