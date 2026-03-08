"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type LinkType = {
  id: string;
  short_code: string;
  original_url: string;
  clicks: number;
};

export default function LinksPage() {
  const { getToken } = useAuth();

  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLinks() {
      const token = await getToken({ template: "edge" });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setLinks(data.links || []);
      setLoading(false);
    }

    loadLinks();
  }, []);

  function copyLink(shortCode: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${shortCode}`;

    navigator.clipboard.writeText(url);

    toast.success("Link copied to clipboard");
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Links</h1>
          <p className="text-sm text-muted-foreground">
            Manage all your shortened links
          </p>
        </div>

        <Link href="/dashboard/new">
          <Button>Create Link</Button>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Short URL</TableHead>
              <TableHead>Original URL</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead className="w-40">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id} className="hover:bg-muted/50">
                <TableCell className="font-mono text-blue-600">
                  {process.env.NEXT_PUBLIC_API_URL}/{link.short_code}
                </TableCell>

                <TableCell className="text-muted-foreground max-w-md truncate">
                  {link.original_url}
                </TableCell>

                <TableCell>
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    {link.clicks} clicks
                  </span>
                </TableCell>

                <TableCell className="flex gap-4 items-center">
                  <button
                    onClick={() => copyLink(link.short_code)}
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <Copy size={14} />
                    Copy
                  </button>

                  <Link
                    href={`/dashboard/analytics/${link.id}`}
                    className="text-primary text-sm hover:underline"
                  >
                    Analytics
                  </Link>

                  <Dialog>
                    <DialogTrigger className="text-sm text-primary hover:underline">
                      QR
                    </DialogTrigger>

                    <DialogContent className="flex flex-col items-center gap-4">
                      <DialogTitle>QR Code</DialogTitle>
                      <QRCodeSVG
                        value={`${process.env.NEXT_PUBLIC_API_URL}/${link.short_code}`}
                        size={200}
                      />

                      <p className="text-sm font-mono">
                        {process.env.NEXT_PUBLIC_API_URL}/{link.short_code}
                      </p>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
