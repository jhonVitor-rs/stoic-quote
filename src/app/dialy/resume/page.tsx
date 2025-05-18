"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRegisterStore } from "@/context/provider";
import { PreviousPage } from "@/components/navigation-buttons";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { convertDate } from "@/hooks/convert-date";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MyDocument } from "@/components/my-document";

export default function Resume() {
  const {
    name,
    myEvents,
    otherEvents,
    actionsIWillTake,
    actionsThatBroughtMe,
    apprenticeship,
    createdAt,
  } = useRegisterStore((s) => s.register);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!myEvents || myEvents === "" || !otherEvents || otherEvents === "")
      router.push("/dialy/step-1");
    if (
      !actionsThatBroughtMe ||
      actionsThatBroughtMe.length < 3 ||
      !actionsIWillTake ||
      actionsIWillTake.length < 3
    )
      router.push("/dialy/step-2");
    if (!apprenticeship || apprenticeship === "") router.push("/dialy/step-3");
  }, [
    myEvents,
    otherEvents,
    actionsIWillTake,
    actionsThatBroughtMe,
    apprenticeship,
    router,
  ]);

  return (
    <div className="flex flex-col w-full gap-4">
      <CardHeader>
        <CardTitle>Seu aprendizado diário</CardTitle>
        <CardDescription>Revise os dados que você preencheu</CardDescription>
      </CardHeader>

      <Card className="print-container">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{convertDate(createdAt)}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4">
            <div className="border rounded-md p-4">
              <h3 className="font-semibold text-base mb-2">
                Eventos fora do meu controle:
              </h3>
              <p className="text-sm">{otherEvents}</p>
            </div>
            <div className="border rounded-md p-4">
              <h3 className="font-semibold text-base mb-2">
                Eventos sob o meu controle:
              </h3>
              <p className="text-sm">{myEvents}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-md p-4">
              <h3 className="font-semibold text-base mb-2">
                Ações que me trouxeram até aqui:
              </h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {actionsThatBroughtMe.map((a, i) => (
                  <li key={i}>{a.desc}</li>
                ))}
              </ul>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-semibold text-base mb-2">
                Ações que vou tomar agora:
              </h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {actionsIWillTake.map((a, i) => (
                  <li key={i}>{a.desc}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="font-semibold text-base mb-2">
              O que eu aprendi com isso?
            </h3>
            <p className="text-sm">{apprenticeship}</p>
          </div>
        </CardContent>
      </Card>

      <CardDescription>
        Não sou médico nem nada, estas são apenas algumas filosofias que tento
        seguir para minha vida e talvez possam te ajudar também.
      </CardDescription>

      <CardFooter className="flex w-full items-center justify-between">
        <PreviousPage
          onClick={() => router.push("/dialy/step-3")}
          variant={"outline"}
        />

        {isClient ? (
          <PDFDownloadLink
            document={
              <MyDocument
                name={name}
                createdAt={createdAt}
                myEvents={myEvents}
                otherEvents={otherEvents}
                actionsThatBroughtMe={actionsThatBroughtMe}
                actionsIWillTake={actionsIWillTake}
                apprenticeship={apprenticeship}
              />
            }
            fileName={"teste"}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
          >
            {({ loading }) =>
              loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando PDF...
                </>
              ) : (
                "Salvar PDF"
              )
            }
          </PDFDownloadLink>
        ) : (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Carregando...
          </Button>
        )}
      </CardFooter>
    </div>
  );
}
