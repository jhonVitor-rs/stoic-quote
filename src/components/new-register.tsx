"use client";

import { useRouter } from "next/navigation";
import { ReactNode, forwardRef } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterStore } from "@/context/provider";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const formValidate = z.object({
  name: z.string().min(6, "O nome precis ter no minimo 6 caracteres."),
});

// Usando forwardRef
export const NewRegister = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, ...rest }, ref) => {
    const router = useRouter();
    const newRegister = useRegisterStore((s) => s.new);
    const fillRegister = useRegisterStore((s) => s.fill);

    const form = useForm<z.infer<typeof formValidate>>({
      resolver: zodResolver(formValidate),
      defaultValues: {
        name: "",
      },
    });

    const handleSubmit = form.handleSubmit(async (data) => {
      const r = newRegister(data.name);
      fillRegister(r);
      router.push("/dialy/step-1");
    });

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={ref} className={cn(className)} {...rest}>
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo registro</DialogTitle>
            <DialogDescription>
              Entre com um nome para seu registro.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={handleSubmit}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Tente utilizar um nome simples que referencie seu dia
                      talvez.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Criar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
);

NewRegister.displayName = "NewRegister";
