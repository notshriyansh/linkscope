import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
  Show,
} from "@clerk/nextjs";

import "./globals.css";

export const metadata: Metadata = {
  title: "EdgeLink",
  description: "Edge-native URL analytics platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="flex justify-between p-4 border-b">
            <h1 className="font-bold text-xl">EdgeLink</h1>

            <div className="flex gap-4">
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton />
              </Show>

              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
