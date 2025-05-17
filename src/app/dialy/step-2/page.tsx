"use client";

import { NextPage, PreviousPage } from "@/components/navigation-buttons";
import { Button } from "@/components/ui/button";
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
import { useRegisterStore } from "@/context/provider";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const formValidator = z.object({
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

type FormType = z.infer<typeof formValidator>;

export default function DailyStep2() {
  const router = useRouter();
  const register = useRegisterStore((s) => s.register);
  const editedActions = useRegisterStore((s) => s.editedActions);

  useEffect(() => {
    if (
      !register.myEvents ||
      register.myEvents === "" ||
      !register.otherEvents ||
      register.otherEvents === ""
    ) {
      router.push("/dialy/step-1");
    }
  }, [register, router]);

  const form = useForm<FormType>({
    resolver: zodResolver(formValidator),
    defaultValues: {
      actions_happened: register.actionsThatBroughtMe?.length
        ? register.actionsThatBroughtMe
        : [{ desc: "" }],
      actions_will_happen: register.actionsIWillTake?.length
        ? register.actionsIWillTake
        : [{ desc: "" }],
    },
    mode: "onChange",
  });

  const handleSubmit = form.handleSubmit((data) => {
    editedActions(data.actions_happened, data.actions_will_happen);
    router.push("/dialy/step-3");
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

  const happenedArrayError =
    form.formState.errors.actions_happened?.root?.message;
  const willHappenArrayError =
    form.formState.errors.actions_will_happen?.root?.message;

  return (
    <div className="flex flex-col w-full gap-4">
      <CardHeader>
        <CardTitle>&quot;Porque escolher é difícil?</CardTitle>
        <CardDescription>
          Porque a cada decisão definimos quem somos, e de um ponto de vista
          existencial essa é uma responsabilidade tremenda...
        </CardDescription>
        <CardDescription>
          ... então quando você se depara com aquela decisão difícil, que você
          diz: &quot;eu não vou escolher, eu não quero&quot;, você já está
          escolhendo — escolheu ficar parado.
        </CardDescription>
        <CardDescription>Ludo Viajante</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <CardContent className="flex flex-col w-full gap-4">
            {/* AÇÕES QUE ACONTECERAM */}
            <FormItem className="border p-4 rounded-md">
              <FormLabel>Ações que me trouxeram aqui</FormLabel>
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
                      {happenedFields.length > 3 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeHappened(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
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
              {happenedArrayError && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {happenedArrayError}
                </p>
              )}
              <FormDescription className="mt-2">
                Escreva aqui todas as ações que te trouxeram até o ponto em que
                você está. Mínimo de 3 ações.
              </FormDescription>
            </FormItem>

            {/* AÇÕES QUE IRÃO ACONTECER */}
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
                      {willHappenFields.length > 3 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeWillHappen(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
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
              {willHappenArrayError && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {willHappenArrayError}
                </p>
              )}
              <FormDescription className="mt-2">
                Escreva aqui quais ações você vai tomar para sair do ponto em
                que você está, podem ser coisas simples que você irá realizar
                amanhã. Mínimo de 3 ações.
              </FormDescription>
            </FormItem>

            <CardDescription>
              Porém nem sempre nossas escolhas nos levam aonde queremos, e isto
              nos leve ao próximo passo.
            </CardDescription>
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
