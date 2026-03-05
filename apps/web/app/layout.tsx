import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
  Show,
} from "@clerk/nextjs";

import Link from "next/link";
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
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className="bg-background">
          <header className="border-b">
            <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4">
              <Link href="/" className="font-bold text-lg">
                EdgeLink
              </Link>

              <div className="flex gap-4 items-center">
                <Show when="signed-out">
                  <SignInButton />
                  <SignUpButton />
                </Show>

                <Show when="signed-in">
                  <UserButton />
                </Show>
              </div>
            </div>
          </header>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
