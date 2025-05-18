"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterStore } from "@/context/provider";
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
import { NextPage } from "@/components/navigation-buttons";

const formSchema = z.object({
  my_events: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),
  other_events: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),
});

export default function DialyStep1() {
  const router = useRouter();
  const { myEvents, otherEvents } = useRegisterStore((s) => s.register);
  const editedEvents = useRegisterStore((s) => s.editedEvents);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      my_events: myEvents,
      other_events: otherEvents,
    },
    mode: "onChange",
  });

  const onSubmit = form.handleSubmit((data) => {
    editedEvents(data.my_events, data.other_events);
    router.push("/dialy/step-2");
  });

  return (
    <div className="flex flex-col w-full gap-4">
      <CardHeader>
        <CardTitle>Epicteto dizia:</CardTitle>
        <CardDescription>
          “A vida tem dois lados: um pelo qual pode ser levada — seus valores,
          suas ações, seu senso de si — e outro pelo qual não pode. Concentre-se
          apenas naquilo que está sob seu controle...”;
        </CardDescription>
        <CardDescription>
          Para os estoicos, somos apenas atores em uma peça. A única coisa que
          um ator pode fazer é desempenhar da melhor forma o papel que lhe foi
          atribuído.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col w-full gap-4">
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="other_events"
              render={({ field }) => (
                <FormItem className="border border-border p-4 rounded-md">
                  <FormLabel>Fora do seu controle</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Ex: Trânsito, clima, reações de outras pessoas..."
                    />
                  </FormControl>
                  <FormDescription>
                    Liste aqui as coisas que aconteceram hoje e estavam fora do
                    seu alcance.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="my_events"
              render={({ field }) => (
                <FormItem className="border border-border p-4 rounded-md">
                  <FormLabel>Sob seu controle</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Ex: Suas escolhas, reações, foco e ações..."
                    />
                  </FormControl>
                  <FormDescription>
                    Agora, liste aqui as coisas que aconteceram hoje e que
                    estavam no seu controle.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-muted-foreground space-y-2 mt-4">
              <CardDescription>
                Para os estoicos, somos apenas atores em uma peça. Nosso papel é
                interpretá-la com excelência, não importa o cenário.
              </CardDescription>
              <CardDescription>
                Epicteto também dizia: “Um pódio e uma cadeia são apenas
                lugares; em ambos, o poder de escolha pode ser mantido — se você
                quiser”. E isso nos leva ao próximo passo...
              </CardDescription>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <NextPage type="submit" variant="outline" />
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
