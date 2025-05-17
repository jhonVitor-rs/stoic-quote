"use client";

import { NextPage, PreviousPage } from "@/components/navigation-buttons";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRegisterStore } from "@/context/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formValidate = z.object({
  apprenticeship: z
    .string()
    .min(20, "O texto deve ter no minimo 20 caracteres"),
});

export default function DialyStep3() {
  const router = useRouter();
  const register = useRegisterStore((s) => s.register);
  const editedApprenticeship = useRegisterStore((s) => s.editedApprenticeship);

  useEffect(() => {
    if (
      !register.actionsThatBroughtMe ||
      register.actionsThatBroughtMe.length < 3 ||
      !register.actionsIWillTake ||
      register.actionsIWillTake.length < 3
    ) {
      router.push("/dialy/step-2");
    }
  }, [register, router]);

  const form = useForm<z.infer<typeof formValidate>>({
    resolver: zodResolver(formValidate),
    defaultValues: {
      apprenticeship: register.apprenticeship,
    },
    mode: "onChange",
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    editedApprenticeship(data.apprenticeship);
    router.push("/dialy/resume");
  });

  return (
    <div className="flex flex-col w-full gap-4">
      <CardHeader>
        <CardTitle>Amor Fati de Nietzsche</CardTitle>
        <CardDescription>
          &quot;Amor Fati seria então o supremo ato de amor próprio. Você olha
          pra sua vida e reconhece que pra ser quem voce e hoje, tudo precisou
          acontecer do jeito que aconteceu...
        </CardDescription>
        <CardDescription>
          ... E talvez você nem esteja feliz com quem você é hoje, mas ai e que
          tá. Graças ao que te aconteceu você sabe que precisa mudar e também
          sabe que não vai ser facil.&quot;
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <CardContent className="flex flex-col w-full gap-2">
            <FormField
              control={form.control}
              name="apprenticeship"
              render={({ field }) => (
                <FormItem className="border border-border p-2 rounded-md">
                  <FormLabel>Aprendizados</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Reflita sobre os aprendizados que e possivel tirar das
                    coisas que te aconteceram
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex w-full items-center justify-between">
            <PreviousPage
              onClick={() => router.push("/dialy/step-1")}
              variant="outline"
            />
            <NextPage type="submit" variant="outline" />
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
