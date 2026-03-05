import Link from "next/link";
import { Globe, BarChart3, Code2, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Global Edge Redirects",
    description:
      "Short links resolve from the nearest Cloudflare edge location for ultra-low latency worldwide.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track clicks, devices and geolocation with clean dashboards.",
  },
  {
    icon: Code2,
    title: "Developer Friendly",
    description: "Built on Cloudflare Workers with modern edge infrastructure.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="py-32 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Shorten links at the edge
          </h1>

          <p className="text-muted-foreground text-lg">
            Edge-native URL shortener with global analytics powered by
            Cloudflare Workers.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-md bg-black text-white flex items-center gap-2"
            >
              Go to Dashboard
              <ArrowRight size={16} />
            </Link>

            <Link href="/dashboard/new" className="px-6 py-3 rounded-md border">
              Create Link
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {features.map((f) => (
            <div key={f.title} className="border rounded-lg p-6">
              <div className="mb-4">
                <f.icon size={28} />
              </div>

              <h3 className="font-semibold mb-2">{f.title}</h3>

              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
