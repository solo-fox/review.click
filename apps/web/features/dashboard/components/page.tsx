import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Filter, Search } from "lucide-react";
import ProjectCard from "./project-card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 h-full p-4">
      <div className="flex gap-4 max-w-sm">
        <Button size={"sm"}>New project</Button>
        <div className="relative">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 pr-4"
          />
        </div>
        <Button
          size={"icon"}
          variant={"outline"}
          className="p-4 border border-dashed"
        >
          <Filter className="size-4" />
        </Button>
      </div>

      <p className="text-2xl">Projects</p>

      <div className="grid grid-cols-2 gap-4 w-full h-0 flex-grow overflow-y-scroll">
        <ProjectCard name="reviewnow" description="Hard coded example" />
      </div>
    </div>
  );
}
