"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
}

export function PreviousPage({ className, variant, size, ...rest }: props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          {...rest}
          className={cn("rounded-full border-primary", className)}
          variant={variant}
          size={size}
          type="button"
        >
          <ArrowLeft />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Tem certeza que quer voltar? você não pode mudar o passado</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function NextPage({ className, variant, size, ...rest }: props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          {...rest}
          className={cn("rounded-full border-primary", className)}
          variant={variant}
          size={size}
        >
          <ArrowRight />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Sempre olhando para frente</p>
      </TooltipContent>
    </Tooltip>
  );
}
