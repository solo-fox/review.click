import { Card } from "@workspace/ui/components/card";
import { ChevronRight } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
}

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <Card className="p-6 hover:bg-muted/50 cursor-pointer group max-w-sm h-40">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium">{props.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {props.description}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </Card>
  );
}
