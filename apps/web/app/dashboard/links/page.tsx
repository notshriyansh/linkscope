"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

type LinkType = {
  id: string;
  short_code: string;
  original_url: string;
};

export default function LinksPage() {
  const { getToken } = useAuth();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    async function loadLinks() {
      const token = await getToken({ template: "edge" });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setLinks(data.links);
    }

    loadLinks();
  }, []);

  function copyLink(shortCode: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${shortCode}`;

    navigator.clipboard.writeText(url);
    setCopied(shortCode);

    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Links</h2>

        <Link
          href="/dashboard/new"
          className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800"
        >
          Create Link
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">Short URL</th>
              <th className="p-4 text-left">Original URL</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {links.map((link) => (
              <tr key={link.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono">{link.short_code}</td>

                <td className="p-4 text-gray-600 truncate max-w-md">
                  {link.original_url}
                </td>

                <td className="p-4 flex gap-4">
                  <button
                    onClick={() => copyLink(link.short_code)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {copied === link.short_code ? "Copied!" : "Copy"}
                  </button>

                  <Link
                    href={`/dashboard/analytics/${link.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Analytics
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
