"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { memo } from "react";
import { type Assistant, getDefaultAssistant } from "@/lib/assistants";
import type { ChatMessage } from "@/lib/types";
import type { VisibilityType } from "./visibility-selector";

type SuggestedActionsProps = {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>["sendMessage"];
  selectedVisibilityType: VisibilityType;
  assistant?: Assistant;
};

function PureSuggestedActions({ chatId, sendMessage, assistant }: SuggestedActionsProps) {
  const currentAssistant = assistant ?? getDefaultAssistant();
  const suggestedActions = currentAssistant.suggestedActions;

  return (
    <div
      className="grid w-full gap-2 sm:grid-cols-2"
      data-testid="suggested-actions"
    >
      {suggestedActions.map((action, index) => (
        <motion.button
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start gap-1 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-muted"
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          key={action.title}
          onClick={() => {
            window.history.pushState({}, "", `/chat/${chatId}`);
            sendMessage({
              role: "user",
              parts: [{ type: "text", text: action.title }],
            });
          }}
          transition={{ delay: 0.05 * index }}
          type="button"
        >
          <span className="font-medium text-sm">{action.title}</span>
          <span className="text-xs text-muted-foreground line-clamp-2">
            {action.description}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) {
      return false;
    }
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType) {
      return false;
    }
    if (prevProps.assistant?.id !== nextProps.assistant?.id) {
      return false;
    }

    return true;
  }
);
