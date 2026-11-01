import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@easyui/react";

export default function Example() {
  return (
    <Table>
      <TableCaption>Recent projects</TableCaption>
      <TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
      <TableBody><TableRow><TableCell>Atlas</TableCell><TableCell>Active</TableCell></TableRow><TableRow><TableCell>Orbit</TableCell><TableCell>Draft</TableCell></TableRow></TableBody>
    </Table>
  );
}
