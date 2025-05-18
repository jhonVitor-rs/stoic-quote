"use client";

import { useRouter } from "next/navigation";
import { useRegisterStore } from "@/context/provider";
import { TRegister } from "@/context/registerStore";
import { convertDate } from "@/hooks/convert-date";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function CardRegister({ register }: { register: TRegister }) {
  const router = useRouter();
  const fillRegister = useRegisterStore((s) => s.fill);

  const handelClick = () => {
    if (register && register.id) {
      fillRegister(register);
      setTimeout(() => {
        router.push("/dialy/resume");
      }, 50);
    }
  };

  return (
    <Button
      onClick={handelClick}
      className="w-60 h-20 flex items-center justify-center border-l-8 border-primary p-0"
      variant={"outline"}
    >
      <CardHeader className="flex-1 items-start justify-start">
        <CardTitle>{register.name}</CardTitle>
        <CardDescription>{convertDate(register.createdAt)}</CardDescription>
      </CardHeader>
    </Button>
  );
}
