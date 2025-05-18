"use client";

import { CardRegister } from "@/components/card-register";
import { NewRegister } from "@/components/new-register";
import { useRegisterStore } from "@/context/provider";
import { Plus } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const dialy = useRegisterStore((s) => s.dialy);
  const newregisterRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header fixo */}
      <header className="sticky top-0 left-0 w-full bg-primary/40 z-10 p-4">
        <div className="container mx-auto">
          <p className="text-center text-sm md:text-base">
            Este app não possui banco de dados, ele salva os dados em local
            storage (memória do navegador), então para garantir que seus
            registros estejam salvos faça o download em PDF. Obrigado.
          </p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {dialy.length > 0 ? (
          <div className="flex flex-1 w-full flex-wrap gap-4 justify-start">
            {dialy.map((r, i) => (
              <CardRegister key={i} register={r} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-120px)]">
            <div className="text-center">
              <h2 className="text-xl font-medium mb-2">
                Nenhum registro encontrado
              </h2>
              <p className="text-gray-500 mb-4">
                Clique no botão + para adicionar seu primeiro registro diário
              </p>
              <div className="flex justify-center">
                <NewRegister ref={newregisterRef} className="mx-auto">
                  <Plus />
                </NewRegister>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Botão de novo registro (fixo no canto inferior direito quando há registros) */}
      {dialy.length > 0 && (
        <div className="fixed bottom-4 right-4 z-20">
          <NewRegister ref={newregisterRef}>
            <Plus />
          </NewRegister>
        </div>
      )}
    </div>
  );
}
