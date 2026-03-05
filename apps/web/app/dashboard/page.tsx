import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Links</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">12</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">1,248</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clicks Today</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">92</p>
        </CardContent>
      </Card>
    </div>
  );
}
