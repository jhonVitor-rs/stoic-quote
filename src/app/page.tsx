"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <div className="flex w-full max-w-5xl min-h-screen p-2 items-center justify-center bg-background">
        <Button onClick={() => router.push("/dialy/step-1")}>
          Novo Registro
        </Button>
      </div>
    </div>
  );
}
