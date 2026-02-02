"use client";

import { ChevronDownIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { assistants, type Assistant } from "@/lib/assistants";
import { cn } from "@/lib/utils";

interface AssistantSelectorProps {
  selectedAssistantId: string;
  onAssistantChange?: (assistantId: string) => void;
}

export function AssistantSelector({
  selectedAssistantId,
  onAssistantChange,
}: AssistantSelectorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const selectedAssistant =
    assistants.find((a) => a.id === selectedAssistantId) ?? assistants[0];

  const handleSelect = (assistant: Assistant) => {
    onAssistantChange?.(assistant.id);
    // Set cookie for persistence
    document.cookie = `selected-assistant=${assistant.id}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-auto w-full justify-between gap-2 px-3 py-2"
          variant="ghost"
        >
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white",
                selectedAssistant.avatarColor || "bg-accent"
              )}
            >
              {selectedAssistant.avatar}
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-sm">{selectedAssistant.name}</span>
            </div>
          </div>
          <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        {assistants.map((assistant) => (
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-3 p-3"
            key={assistant.id}
            onClick={() => handleSelect(assistant)}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
                assistant.avatarColor || "bg-accent"
              )}
            >
              {assistant.avatar}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="font-medium text-sm">{assistant.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {assistant.shortDescription}
              </span>
            </div>
            {assistant.id === selectedAssistant.id && (
              <CheckIcon className="h-4 w-4 shrink-0 text-accent" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            className="flex cursor-pointer items-center gap-2 p-3"
            href="/assistants"
          >
            <span className="text-sm">Alle Assistenten anzeigen</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
