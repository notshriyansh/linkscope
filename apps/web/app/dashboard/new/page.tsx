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
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Create Short Link</h2>
        <p className="text-sm text-gray-500">
          Generate a new short URL instantly
        </p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="https://example.com/very-long-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <Button onClick={createLink} disabled={loading} className="w-full">
          {loading ? "Generating..." : "Generate Short Link"}
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {shortLink && (
        <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
          <p className="text-sm text-gray-500">Your short link</p>

          <div className="flex justify-between items-center">
            <a
              href={shortLink}
              target="_blank"
              className="font-mono text-blue-600"
            >
              {shortLink}
            </a>

            <button
              className="text-sm text-blue-600"
              onClick={() => navigator.clipboard.writeText(shortLink)}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
