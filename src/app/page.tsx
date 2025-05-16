import { RedirectButton } from "@/components/redirect-buttons";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <RedirectButton path="/dialy/step-1">Novo registro</RedirectButton>
    </div>
  );
}
