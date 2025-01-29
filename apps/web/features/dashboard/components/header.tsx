"use client";

import { Bell, CircleHelp } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/_components/theme-switcher";
import Logo from "@/_components/Logo";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Badge } from "@workspace/ui/components/badge";
import profileAction from "@/_actions/profile.action";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Header() {
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileAction(),
  });
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav className="flex justify-between items-center w-full h-[3rem] border-b p-4">
      <div className="flex gap-6 items-center">
        <Logo />
        <p className="text-muted-foreground">/</p>

        <div className="flex itemsxcenter gap-4 text-sm">
          {isPending ? (
            <Skeleton className="h-4 w-[100px]" />
          ) : (
            <>
              <Link href="/dashboard">{data?.org_name?.toLowerCase()}</Link>
              <Badge className="text-muted-foreground rounded-full bg-background border-border">
                {data?.plan}
              </Badge>
            </>
          )}
        </div>

        {segments.map((segment, index) => (
          <div key={`${segment}-${index}`} className="flex items-center gap-6">
            <p className="text-muted-foreground">/</p>
            <p className="text-sm">
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Bell className="size-4" />
        <CircleHelp className="size-4" />
      </div>
    </nav>
  );
}
