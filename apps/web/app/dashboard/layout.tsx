"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 border-r bg-white p-6">
        <h2 className="text-xl font-bold mb-8">EdgeLink</h2>

        <nav className="flex flex-col gap-3 text-sm">
          <Link
            href="/dashboard"
            className="hover:bg-gray-100 px-3 py-2 rounded"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/new"
            className="hover:bg-gray-100 px-3 py-2 rounded"
          >
            Create Link
          </Link>

          <Link
            href="/dashboard/links"
            className="hover:bg-gray-100 px-3 py-2 rounded"
          >
            My Links
          </Link>

          <Link
            href="/dashboard/analytics"
            className="hover:bg-gray-100 px-3 py-2 rounded"
          >
            Analytics
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center border-b bg-white px-6 py-4">
          <h1 className="font-semibold text-lg">Dashboard</h1>

          <UserButton />
        </header>

        <main className="p-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
