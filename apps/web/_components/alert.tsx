"use client";

import { AlertCircle, CheckCircle } from "lucide-react";
import {
  Alert as AlertUi,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";

interface AlertProps {
  message: string;
  isError: boolean;
}

export default function Alert({ message, isError }: AlertProps) {
  if (!message) return null;

  const title = isError ? "Error" : "Success";

  return (
    <AlertUi variant={isError ? "destructive" : "default"}>
      <AlertTitle className="flex items-center gap-2">
        {isError ? (
          <AlertCircle className="size-4" />
        ) : (
          <CheckCircle className="size-4" />
        )}{" "}
        {title}
      </AlertTitle>

      <AlertDescription>
        <p>{decodeURIComponent(message)}</p>
      </AlertDescription>
    </AlertUi>
  );
}
