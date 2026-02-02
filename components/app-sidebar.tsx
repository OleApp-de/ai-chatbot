"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import { PlusIcon, TrashIcon } from "@/components/icons";
import { SidebarAssistants } from "@/components/sidebar-assistants";
import {
  getChatHistoryPaginationKey,
  SidebarHistory,
} from "@/components/sidebar-history";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function AppSidebar({
  user,
  selectedAssistantId = "general",
}: {
  user: User | undefined;
  selectedAssistantId?: string;
}) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const { mutate } = useSWRConfig();
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  const handleDeleteAll = () => {
    const deletePromise = fetch("/api/history", {
      method: "DELETE",
    });

    toast.promise(deletePromise, {
      loading: "Alle Chats werden gelöscht...",
      success: () => {
        mutate(unstable_serialize(getChatHistoryPaginationKey));
        setShowDeleteAllDialog(false);
        router.replace("/");
        router.refresh();
        return "Alle Chats erfolgreich gelöscht";
      },
      error: "Chats konnten nicht gelöscht werden",
    });
  };

  return (
    <>
      <Sidebar className="group-data-[side=left]:border-r-0">
        <SidebarHeader>
          <SidebarMenu>
            {/* Logo and New Chat */}
            <div className="flex flex-row items-center justify-between px-2 py-1">
              <Link
                className="flex items-center gap-2"
                href="/"
                onClick={() => setOpenMobile(false)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                  <span className="font-bold text-sm text-accent-foreground">KI</span>
                </div>
                <span className="font-bold text-lg">KI-Plattform</span>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      setOpenMobile(false);
                      router.push("/");
                      router.refresh();
                    }}
                    size="sm"
                    type="button"
                    variant="ghost"
                  >
                    <PlusIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="end" className="hidden md:block">
                  Neuer Chat
                </TooltipContent>
              </Tooltip>
            </div>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {/* Assistenten-Liste */}
          <SidebarAssistants selectedAssistantId={selectedAssistantId} />
          
          <SidebarSeparator />
          
          {/* Chat History */}
          <SidebarHistory user={user} />
        </SidebarContent>
        <SidebarFooter>
          {user && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs text-muted-foreground">Chatverlauf</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="h-6 w-6 p-0"
                      onClick={() => setShowDeleteAllDialog(true)}
                      size="sm"
                      type="button"
                      variant="ghost"
                    >
                      <TrashIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent align="end" className="hidden md:block">
                    Alle Chats löschen
                  </TooltipContent>
                </Tooltip>
              </div>
              <SidebarUserNav user={user} />
            </div>
          )}
        </SidebarFooter>
      </Sidebar>

      <AlertDialog
        onOpenChange={setShowDeleteAllDialog}
        open={showDeleteAllDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alle Chats löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Alle Ihre
              Chats werden dauerhaft gelöscht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAll}>
              Alle löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
