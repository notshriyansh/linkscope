"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LinkType = {
  id: string;
  short_code: string;
  original_url: string;
  clicks: number;
};

export default function AnalyticsOverviewPage() {
  const { getToken } = useAuth();
  const [links, setLinks] = useState<LinkType[]>([]);

  useEffect(() => {
    async function load() {
      const token = await getToken({ template: "edge" });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setLinks(data.links || []);
    }

    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Performance overview for all your links
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Link Performance</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.id}
              href={`/dashboard/analytics/${link.id}`}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary transition"
            >
              <div>
                <p className="font-medium">
                  {process.env.NEXT_PUBLIC_API_URL}/{link.short_code}
                </p>
                <p className="text-sm text-muted-foreground truncate max-w-md">
                  {link.original_url}
                </p>
              </div>

              <div className="text-right">
                <p className="font-medium">{link.clicks}</p>
                <p className="text-xs text-muted-foreground">Clicks</p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
