"use client";

import Link from "next/link";
import { ArrowUpRight, Cog, LogOut, Frame, Plus } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { useMutation } from "@tanstack/react-query";
import signOutAction from "../actions/signout.action";
import LoadingIcon from "@/_components/loading-icon";
import Alert from "@/_components/alert";

export default function Sidebar() {
  const {
    mutate: signOut,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: signOutAction,
  });

  return (
    <div className="flex flex-col min-h-svh w-[280px] border-r">
      <div className="flex items-center gap-6 h-[3rem] p-4 border-b">
        <p className="text-xl font-bold">Dashboard</p>
      </div>

      <div className="gap-4 flex flex-col p-4 border-b">
        <p className="text-xs text-muted-foreground">Projects</p>
        <Link href="/dashboard" className="text-sm flex items-center gap-4">
          <Plus className="size-4" />
          New Project
        </Link>
        <Link href="#" className="text-sm flex items-center gap-4">
          <Frame className="size-4" />
          All Projects
        </Link>
      </div>

      <div className="gap-4 flex flex-col p-4 border-b">
        <p className="text-xs text-muted-foreground">Documentation</p>
        <Link href="#" className="text-sm flex items-center gap-4">
          <ArrowUpRight className="size-4" />
          Guides
        </Link>
        <Link href="#" className="text-sm flex items-center gap-4">
          <ArrowUpRight className="size-4" />
          API Reference
        </Link>
      </div>

      <div className="gap-4 flex flex-col p-4 border-b">
        <p className="text-xs text-muted-foreground">Account</p>
        <Link
          href="/dashboard/settings"
          className="text-sm flex items-center gap-4"
        >
          <Cog className="size-4" />
          Settings
        </Link>
        <Alert message={(error as Error)?.message} isError={isError} />
        <Button
          disabled={isPending}
          variant={"ghost"}
          onClick={() => signOut()}
          className="m-0 p-0 text-sm flex items-center justify-start gap-4 hover:text-destructive hover:bg-background"
        >
          {!isPending ? <LogOut className="size-4" /> : <LoadingIcon />}
          Log out
        </Button>
      </div>
    </div>
  );
}
