"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  path: string;
}

export function RedirectButton({ children, className, path, ...rest }: Props) {
  const router = useRouter();

  return (
    <Button
      className={cn(className)}
      onClick={() => router.push(path)}
      {...rest}
    >
      {children}
    </Button>
  );
}
