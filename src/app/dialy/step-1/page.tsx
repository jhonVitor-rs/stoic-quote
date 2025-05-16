"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
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
import { Button } from "@/components/ui/button";

const formValidator = z.object({
  my_events: z.string().min(10),
  other_events: z.string().min(10),
});

export default function DialyStep1() {
  const register = useRegisterStore((s) => s.register);
  const editedEvents = useRegisterStore((s) => s.editedEvents);

  const form = useForm<z.infer<typeof formValidator>>({
    resolver: zodResolver(formValidator),
    defaultValues: {
      my_events: register.myEvents,
      other_events: register.otherEvents,
    },
  });

  const handlesubmit = form.handleSubmit(async (data) => {
    console.log(data);
    editedEvents(data.my_events, data.other_events);
  });

  return (
    <div className="flex flex-col w-full gap-4">
      <CardHeader className="">
        <CardTitle>Epicteto dizia:</CardTitle>
        <CardDescription>
          &quot;A vida tem dois lados, um pelo qual pode ser levado, seus
          valores, seuas ações o seu senso de sí, e outro pelo qual não pode,
          concentre-se apenas naquilo que esta sob seu controle,...&quot;
        </CardDescription>
        <CardDescription>
          Para os estoicos somos apenas atores em uma peça, a unica coisa que um
          ator pode fazer e desempenhas da melhor forma o papael que lhe foi
          atribuído
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={handlesubmit} className="flex flex-col w-full gap-4">
          <CardContent className="flex flex-col w-full gap-2">
            <FormField
              control={form.control}
              name="other_events"
              render={({ field }) => (
                <FormItem className="border border-border p-2 rounded-md">
                  <FormLabel>Fora de controle:</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Liste aqui as coisas que aconteceram hoje com você que
                    estavam fora do seu alcance
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="my_events"
              render={({ field }) => (
                <FormItem className="border border-border p-2 rounded-md">
                  <FormLabel>Meu controle:</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Agora liste aqui as coisas que aconteceram hoje com você que
                    estavam no seu controle.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardDescription>
              Para os estoicos nós somos apenas atores em uma peça, a única
              coisa que um ator pode fazer e desempenhar da melhor forma o papel
              que lhe foi atribuido.
            </CardDescription>
            <CardDescription>
              Epicteto também dizia &quot; que um podium e uma cadeia são apenas
              lugares, em qualquer um dos dois o poder de escolha pode ser
              mantido se você quiser&quot;, e isto nos leva a próximo passo...
            </CardDescription>
          </CardContent>
          <CardFooter className="flex w-full justify-end">
            <Button
              type="submit"
              variant={"outline"}
              className="rounded-full border-primary"
            >
              <ArrowRight />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
