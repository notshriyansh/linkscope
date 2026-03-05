"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", clicks: 40 },
  { day: "Tue", clicks: 65 },
  { day: "Wed", clicks: 120 },
  { day: "Thu", clicks: 90 },
];

export default function AnalyticsPage() {
  return (
    <div className="w-full h-100">
      <h2 className="text-xl font-semibold mb-4">Clicks Over Time</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="clicks" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
