"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewLinkPage() {
  const { getToken } = useAuth();

  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createLink() {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");
    setShortLink("");

    try {
      const token = await getToken({ template: "edge" });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          originalUrl: url,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create link");
      }

      setShortLink(data.shortUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-xl font-semibold">Create Short Link</h2>

      <Input
        placeholder="Paste your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <Button onClick={createLink} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {shortLink && (
        <div className="p-4 border rounded bg-muted space-y-2">
          <p className="text-sm text-gray-500">Short Link</p>

          <a
            href={shortLink}
            target="_blank"
            className="text-blue-600 font-medium"
          >
            {shortLink}
          </a>

          <button
            className="text-xs text-gray-500 underline"
            onClick={() => navigator.clipboard.writeText(shortLink)}
          >
            Copy link
          </button>
        </div>
      )}
    </div>
  );
}
