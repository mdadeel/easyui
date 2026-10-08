import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  AspectRatio,
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  Empty,
  Input,
  Kbd,
  Label,
  Pagination,
  Progress,
  Slider,
  Spinner,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Toggle,
  ToggleGroup,
} from "@easyui/react";

const INVOICES = [
  { id: "INV-1042", client: "Northwind", amount: "$2,400.00", status: "Paid" },
  { id: "INV-1043", client: "Contoso", amount: "$860.00", status: "Due" },
  { id: "INV-1044", client: "Fabrikam", amount: "$1,125.50", status: "Overdue" },
];

/** Demos for the batch 1 and batch 2 components. Each card is one component family. */
export function ComponentsDemo() {
  const [pressed, setPressed] = useState<string[]>(["bold"]);
  const [volume, setVolume] = useState(40);
  const [uploaded, setUploaded] = useState(64);
  const [page, setPage] = useState(2);
  const [range, setRange] = useState<[number, number]>([20, 80]);

  return (
    <>
      <Card aria-labelledby="alerts-heading">
        <CardHeader>
          <CardTitle id="alerts-heading">Alerts and status</CardTitle>
          <CardDescription>Inline messages, progress, and loading. Each one has a text role for screen readers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="warning">
            <AlertTitle>Trial ends in 3 days</AlertTitle>
            <AlertDescription>Add a payment method to keep your projects.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Saved</AlertTitle>
          </Alert>
          <Progress label="Upload" value={uploaded} showValue />
          <div className="row">
            <Button variant="secondary" size="sm" onClick={() => setUploaded((v) => (v >= 100 ? 0 : v + 20))}>
              Advance upload
            </Button>
            <Spinner label="Syncing" />
            <span>
              Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search
            </span>
          </div>
        </CardContent>
      </Card>

      <Card aria-labelledby="inputs-heading">
        <CardHeader>
          <CardTitle id="inputs-heading">Toggles and ranges</CardTitle>
          <CardDescription>Pressed state is shown by surface and ring, not color alone.</CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleGroup aria-label="Text style" multiple value={pressed} onValueChange={setPressed}>
            <Toggle value="bold" aria-label="Bold" variant="outline">
              <strong>B</strong>
            </Toggle>
            <Toggle value="italic" aria-label="Italic" variant="outline">
              <em>I</em>
            </Toggle>
            <Toggle value="underline" aria-label="Underline" variant="outline">
              <u>U</u>
            </Toggle>
          </ToggleGroup>
          <Slider
            label="Volume"
            showValue
            value={volume}
            onValueChange={(v) => setVolume(typeof v === "number" ? v : v[0])}
            min={0}
            max={100}
          />
          <Slider
            label="Price range"
            showValue
            value={range}
            onValueChange={(v) => setRange(v as [number, number])}
            min={0}
            max={100}
          />
          <Label htmlFor="demo-label-input" required>
            Project name
          </Label>
          <Input id="demo-label-input" placeholder="Atlas" />
        </CardContent>
      </Card>

      <Card aria-labelledby="nav-heading">
        <CardHeader>
          <CardTitle id="nav-heading">Navigation and disclosure</CardTitle>
          <CardDescription>Where you are, what is next, and what is hidden for now.</CardDescription>
        </CardHeader>
        <CardContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Atlas</BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbCurrent>Invoices</BreadcrumbCurrent>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Collapsible>
            <CollapsibleTrigger>Advanced options</CollapsibleTrigger>
            <CollapsiblePanel>Webhooks, API keys, and export formats live here.</CollapsiblePanel>
          </Collapsible>
          <Pagination page={page} pageCount={12} onPageChange={setPage} />
        </CardContent>
      </Card>

      <Card aria-labelledby="data-heading">
        <CardHeader>
          <CardTitle id="data-heading">Data and empty states</CardTitle>
          <CardDescription>Tables scroll sideways on small screens instead of breaking the layout.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Invoices this month</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.client}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AspectRatio ratio={16 / 9} className="demo-ratio">
            <div className="demo-ratio__inner">16 : 9 media slot</div>
          </AspectRatio>
          <Empty
            title="No archived projects"
            description="Projects you archive show up here for 30 days."
            action={<Button variant="secondary" size="sm">Browse projects</Button>}
          />
        </CardContent>
      </Card>
    </>
  );
}
