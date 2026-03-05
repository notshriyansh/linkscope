"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-6">
        <h2 className="text-xl font-bold mb-6">EdgeLink</h2>

        <nav className="flex flex-col gap-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/new">Create Link</Link>
          <Link href="/dashboard/links">My Links</Link>
          <Link href="/dashboard/analytics">Analytics</Link>
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex justify-between items-center border-b p-4">
          <h1 className="font-semibold">Dashboard</h1>
          <UserButton />
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
