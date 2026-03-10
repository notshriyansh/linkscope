"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Link2, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewLinkPage() {
  const { getToken } = useAuth();

  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expires, setExpires] = useState("");

  const [shortLink, setShortLink] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const previewLink = alias ? `${baseUrl}/${alias}` : "";

  async function createLink() {
    if (!url) {
      toast.error("Enter a URL");
      return;
    }

    setLoading(true);

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
          customAlias: alias || null,
          expiresInDays: expires ? Number(expires) : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setShortLink(data.shortUrl);

      toast.success("Short link created!");
    } catch (err: any) {
      toast.error(err.message);
    }

    setLoading(false);
  }

  function copyLink() {
    navigator.clipboard.writeText(shortLink);
    toast.success("Copied!");
  }

  function downloadQR() {
    const svg = document.getElementById("qr-code");

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx?.drawImage(img, 0, 0);

      const png = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = png;
      link.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  }

  const finalLink = shortLink || previewLink;
  const showPreview = url.length > 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Create Link</h1>
        <p className="text-muted-foreground text-sm">
          Shorten a URL and customize your link
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border rounded-xl p-6 bg-card space-y-5"
        >
          <h2 className="font-semibold">Link Details</h2>

          <div className="space-y-2">
            <label className="text-sm">Original URL</label>

            <Input
              placeholder="https://example.com/your-long-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Custom Alias (optional)</label>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">link.sc/</span>

              <Input
                placeholder="my-link"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Expiration</label>

            <select
              className="border rounded-md p-2 w-full bg-background"
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
            >
              <option value="">Never</option>
              <option value="1">24 Hours</option>
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
            </select>
          </div>

          <Button onClick={createLink} disabled={loading} className="w-full">
            {loading ? "Generating..." : "Generate Link"}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border rounded-xl p-6 bg-card space-y-6"
        >
          <h2 className="font-semibold">Preview</h2>

          {!showPreview && (
            <div className="flex flex-col items-center justify-center h-75 text-muted-foreground gap-4">
              <div className="bg-muted p-4 rounded-full">
                <Link2 size={24} />
              </div>

              <p className="text-sm text-center">
                Enter a URL and generate your link to see the preview
              </p>
            </div>
          )}

          {showPreview && (
            <>
              <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-background p-2 rounded-md">
                    <Link2 size={18} />
                  </div>

                  <span className="font-mono">{shortLink || previewLink}</span>
                </div>

                {shortLink && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={copyLink}
                    className="flex gap-2"
                  >
                    <Copy size={14} />
                    Copy
                  </Button>
                )}
              </div>

              {shortLink && (
                <div className="flex flex-col items-center gap-4">
                  <QRCodeSVG id="qr-code" value={shortLink} size={200} />

                  <Button
                    variant="secondary"
                    onClick={downloadQR}
                    className="flex gap-2"
                  >
                    <Download size={16} />
                    Download QR Code
                  </Button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
