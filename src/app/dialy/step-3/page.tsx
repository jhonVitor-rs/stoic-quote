"use client";

import { useRegisterStore } from "@/context/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formValidate = z.object({
  apprenticeship: z
    .string()
    .min(20, "O texto deve ter no minimo 20 caracteres"),
});

export default function DialyStep3() {
  const router = useRouter();
  const apprenticeship = useRegisterStore((s) => s.register.apprenticeship);
  const editedApprenticeship = useRegisterStore((s) => s.editedApprenticeship);

  const form = useForm<z.infer<typeof formValidate>>({
    resolver: zodResolver(formValidate),
    defaultValues: {
      apprenticeship,
    },
    mode: "onChange",
  });
}
