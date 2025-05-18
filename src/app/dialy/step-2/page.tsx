"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NextPage, PreviousPage } from "@/components/navigation-buttons";
import { useRegisterStore } from "@/context/provider";
import { Plus, X } from "lucide-react";

const schema = z.object({
  actions_happened: z
    .array(
      z.object({
        desc: z
          .string()
          .min(10, "A descrição deve ter pelo menos 10 caracteres"),
      })
    )
    .min(3, "Adicione pelo menos 3 ações que aconteceram."),
  actions_will_happen: z
    .array(
      z.object({
        desc: z
          .string()
          .min(10, "A descrição deve ter pelo menos 10 caracteres"),
      })
    )
    .min(3, "Adicione pelo menos 3 ações futuras."),
});

type FormType = z.infer<typeof schema>;

export default function DailyStep2() {
  const router = useRouter();
  const { myEvents, otherEvents, actionsThatBroughtMe, actionsIWillTake } =
    useRegisterStore((s) => s.register);
  const editedActions = useRegisterStore((s) => s.editedActions);

  useEffect(() => {
    if (!myEvents || !otherEvents) {
      router.push("/dialy/step-1");
    }
  }, [myEvents, otherEvents, router]);

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      actions_happened: actionsThatBroughtMe.length
        ? actionsThatBroughtMe
        : [{ desc: "" }],
      actions_will_happen: actionsIWillTake.length
        ? actionsIWillTake
        : [{ desc: "" }],
    },
    mode: "onChange",
  });

  const {
    fields: happenedFields,
    append: appendHappened,
    remove: removeHappened,
  } = useFieldArray({ control: form.control, name: "actions_happened" });

  const {
    fields: willHappenFields,
    append: appendWillHappen,
    remove: removeWillHappen,
  } = useFieldArray({ control: form.control, name: "actions_will_happen" });

  const onSubmit = (data: FormType) => {
    editedActions(data.actions_happened, data.actions_will_happen);
    router.push("/dialy/step-3");
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <CardHeader>
        <CardTitle>“Por que escolher é difícil?”</CardTitle>
        <CardDescription>
          Porque a cada decisão definimos quem somos — e, de um ponto de vista
          existencial, essa é uma responsabilidade tremenda.
        </CardDescription>
        <CardDescription>
          Quando você diz “não vou escolher”, você já está escolhendo: escolheu
          ficar parado.
        </CardDescription>
        <CardDescription>— Ludo Viajante</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <CardContent className="flex flex-col gap-6">
            {/* Ações passadas */}
            <FormItem className="border p-4 rounded-md">
              <FormLabel>Ações que me trouxeram até aqui</FormLabel>
              {happenedFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`actions_happened.${index}.desc`}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 mb-2">
                      <FormControl>
                        <Input {...field} placeholder="Descreva a ação" />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeHappened(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => appendHappened({ desc: "" })}
              >
                <Plus className="w-4 h-4 mr-2" /> Adicionar ação
              </Button>
              <FormDescription className="mt-2">
                Escreva ao menos 3 ações que contribuíram para o ponto onde você
                está hoje.
              </FormDescription>
            </FormItem>

            {/* Ações futuras */}
            <FormItem className="border p-4 rounded-md">
              <FormLabel>Ações que irei tomar</FormLabel>
              {willHappenFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`actions_will_happen.${index}.desc`}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 mb-2">
                      <FormControl>
                        <Input {...field} placeholder="Descreva a ação" />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeWillHappen(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => appendWillHappen({ desc: "" })}
              >
                <Plus className="w-4 h-4 mr-2" /> Adicionar ação
              </Button>
              <FormDescription className="mt-2">
                Liste ao menos 3 ações que você pretende tomar a partir de
                agora. Podem ser metas simples, que você consiga realizar
                amanhã.
              </FormDescription>
            </FormItem>

            <CardDescription>
              Porém, nem sempre nossas escolhas nos levam aonde desejamos — e
              isso nos leva ao próximo passo.
            </CardDescription>
          </CardContent>

          <CardFooter className="flex justify-between">
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
