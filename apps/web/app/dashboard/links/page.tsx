import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LinksPage() {
  const links = [
    {
      short: "edgelink.io/a1b2",
      original: "https://google.com",
      clicks: 120,
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Short URL</TableHead>
          <TableHead>Original URL</TableHead>
          <TableHead>Clicks</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {links.map((link, i) => (
          <TableRow key={i}>
            <TableCell>{link.short}</TableCell>
            <TableCell>{link.original}</TableCell>
            <TableCell>{link.clicks}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
