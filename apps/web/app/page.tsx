import { Show } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Show when="signed-out">
        <p className="text-lg">Sign in to start creating EdgeLinks</p>
      </Show>

      <Show when="signed-in">
        <p className="text-lg">Welcome to EdgeLink</p>
      </Show>
    </main>
  );
}
