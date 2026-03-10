"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const data = [
  { date: "Mon", clicks: 4 },
  { date: "Tue", clicks: 8 },
  { date: "Wed", clicks: 3 },
  { date: "Thu", clicks: 10 },
  { date: "Fri", clicks: 6 },
];

export function ClicksChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clicks Over Time</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#3b82f6"
                fill="url(#gradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
