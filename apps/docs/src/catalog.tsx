import { useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  AspectRatio,
  Avatar,
  AvatarFallback,
  Badge,
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
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Empty,
  Field,
  Input,
  Kbd,
  Label,
  Link,
  Pagination,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  Radio,
  RadioGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Textarea,
  Toggle,
  ToggleGroup,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  toast,
} from "@easyui/react";

export type Group = "Foundations" | "Forms" | "Overlays" | "Layout and navigation";

export interface ComponentDoc {
  slug: string;
  name: string;
  group: Group;
  summary: string;
  /** Import line plus a short example. This text is shown as the code sample. */
  usage: string;
  /** Live example. Uses real components, so it always matches the library. */
  preview: ReactNode;
  /** Plain-language notes on behavior or accessibility. */
  notes: string[];
}

export const GROUPS: Group[] = ["Foundations", "Forms", "Overlays", "Layout and navigation"];

// Small stateful wrappers keep the examples honest without a state library.
function PaginationExample() {
  const [page, setPage] = useState(3);
  return <Pagination page={page} pageCount={9} onPageChange={setPage} />;
}

function SliderExample() {
  const [value, setValue] = useState(40);
  return (
    <Slider
      label="Volume"
      showValue
      value={value}
      min={0}
      max={100}
      onValueChange={(v) => setValue(typeof v === "number" ? v : v[0])}
    />
  );
}

function ToggleGroupExample() {
  const [value, setValue] = useState<string[]>(["bold"]);
  return (
    <ToggleGroup aria-label="Text style" multiple value={value} onValueChange={setValue}>
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
  );
}

export const COMPONENTS: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    group: "Foundations",
    summary: "The main action. Four variants, three sizes, and a loading state that keeps its width.",
    usage: `import { Button } from "@easyui/react";

<Button>Save changes</Button>
<Button variant="secondary">Discard</Button>
<Button variant="danger" loading>Deleting</Button>`,
    preview: (
      <div className="demo-row">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Delete</Button>
        <Button loading>Saving</Button>
      </div>
    ),
    notes: ["Text on the accent color is chosen for contrast automatically, in every state."],
  },
  {
    slug: "badge",
    name: "Badge",
    group: "Foundations",
    summary: "A small status label for counts, tags, and states.",
    usage: `import { Badge } from "@easyui/react";

<Badge variant="accent">New</Badge>
<Badge variant="outline">Beta</Badge>
<Badge variant="danger">Failed</Badge>`,
    preview: (
      <div className="demo-row">
        <Badge variant="accent">New</Badge>
        <Badge variant="outline">Beta</Badge>
        <Badge variant="danger">Failed</Badge>
      </div>
    ),
    notes: [],
  },
  {
    slug: "link",
    name: "Link",
    group: "Foundations",
    summary: "A text link with the accent color, underline on hover, and a clear focus ring.",
    usage: `import { Link } from "@easyui/react";

<Link href="/docs">Read the docs</Link>`,
    preview: <Link href="#components">Read the component list</Link>,
    notes: ["Use a real link for navigation and a Button for actions."],
  },
  {
    slug: "kbd",
    name: "Kbd",
    group: "Foundations",
    summary: "Shows a keyboard shortcut.",
    usage: `import { Kbd } from "@easyui/react";

<Kbd>⌘</Kbd> <Kbd>K</Kbd>`,
    preview: (
      <p className="demo-text">
        Search with <Kbd>⌘</Kbd> <Kbd>K</Kbd>, or press <Kbd>/</Kbd> anywhere.
      </p>
    ),
    notes: [],
  },
  {
    slug: "separator",
    name: "Separator",
    group: "Foundations",
    summary: "A thin divider, horizontal or vertical.",
    usage: `import { Separator } from "@easyui/react";

<Separator />
<Separator orientation="vertical" />`,
    preview: (
      <div className="demo-stack">
        <span>Projects</span>
        <Separator />
        <span>Members</span>
      </div>
    ),
    notes: [],
  },
  {
    slug: "avatar",
    name: "Avatar",
    group: "Foundations",
    summary: "A user image with a text fallback when the image is missing or loading.",
    usage: `import { Avatar, AvatarFallback } from "@easyui/react";

<Avatar size="lg">
  <AvatarFallback>MR</AvatarFallback>
</Avatar>`,
    preview: (
      <div className="demo-row">
        <Avatar>
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>JK</AvatarFallback>
        </Avatar>
      </div>
    ),
    notes: ["Pass an AvatarImage inside the Avatar. The fallback shows until the image loads."],
  },
  {
    slug: "label",
    name: "Label",
    group: "Foundations",
    summary: "A form label with an optional required marker. Use Field when you can.",
    usage: `import { Label } from "@easyui/react";

<Label htmlFor="project" required>Project name</Label>
<input id="project" />`,
    preview: (
      <div className="demo-stack">
        <Label htmlFor="demo-project" required>
          Project name
        </Label>
        <Input id="demo-project" placeholder="Atlas" />
      </div>
    ),
    notes: ["The asterisk is hidden from screen readers. Say 'required' in the description if it matters."],
  },
  {
    slug: "alert",
    name: "Alert",
    group: "Foundations",
    summary: "A short inline message in four tones. It stays in the page flow.",
    usage: `import { Alert, AlertTitle, AlertDescription } from "@easyui/react";

<Alert variant="warning">
  <AlertTitle>Trial ends in 3 days</AlertTitle>
  <AlertDescription>Add a payment method to keep your projects.</AlertDescription>
</Alert>`,
    preview: (
      <Alert variant="warning">
        <AlertTitle>Trial ends in 3 days</AlertTitle>
        <AlertDescription>Add a payment method to keep your projects.</AlertDescription>
      </Alert>
    ),
    notes: ["Use a toast for messages that disappear. Use an Alert for messages that should stay until fixed."],
  },
  {
    slug: "empty",
    name: "Empty",
    group: "Foundations",
    summary: "A placeholder for a view with no content yet. Give it one next step.",
    usage: `import { Empty, Button } from "@easyui/react";

<Empty
  title="No archived projects"
  description="Projects you archive show up here for 30 days."
  action={<Button variant="secondary">Browse projects</Button>}
/>`,
    preview: (
      <Empty
        title="No archived projects"
        description="Projects you archive show up here for 30 days."
        action={<Button variant="secondary" size="sm">Browse projects</Button>}
      />
    ),
    notes: [],
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    group: "Foundations",
    summary: "A pulsing placeholder that matches the shape of content still loading.",
    usage: `import { Skeleton } from "@easyui/react";

<Skeleton style={{ width: "70%" }} />
<Skeleton style={{ width: "45%" }} />`,
    preview: (
      <div className="demo-stack" aria-hidden="true">
        <Skeleton style={{ width: "70%" }} />
        <Skeleton style={{ width: "45%" }} />
      </div>
    ),
    notes: ["Mark the loading region with aria-busy, and hide the skeleton itself from assistive tech."],
  },
  {
    slug: "spinner",
    name: "Spinner",
    group: "Foundations",
    summary: "An indeterminate loading indicator. It always has a label for screen readers.",
    usage: `import { Spinner } from "@easyui/react";

<Spinner label="Syncing" />`,
    preview: (
      <div className="demo-row">
        <Spinner label="Syncing" />
        <span>Syncing your files…</span>
      </div>
    ),
    notes: [],
  },
  {
    slug: "progress",
    name: "Progress",
    group: "Foundations",
    summary: "A determinate progress bar. The fill animates its width, and reduced motion turns that off.",
    usage: `import { Progress } from "@easyui/react";

<Progress label="Upload" value={64} showValue />`,
    preview: <Progress label="Upload" value={64} showValue />,
    notes: ["Leave value out for an indeterminate bar. The label is the accessible name."],
  },
  {
    slug: "input",
    name: "Input",
    group: "Forms",
    summary: "A single-line text field in two sizes, with the focus ring and invalid state built in.",
    usage: `import { Input } from "@easyui/react";

<Input type="email" placeholder="name@company.com" />
<Input size="sm" aria-invalid="true" />`,
    preview: <Input placeholder="name@company.com" />,
    notes: ["Use Field to add a label, description, and error. It wires up the ARIA attributes for you."],
  },
  {
    slug: "textarea",
    name: "Textarea",
    group: "Forms",
    summary: "A multi-line text field with the same states as Input.",
    usage: `import { Textarea } from "@easyui/react";

<Textarea rows={4} placeholder="Where to start, who to ask." />`,
    preview: <Textarea rows={3} placeholder="Where to start, who to ask, what to read first." />,
    notes: [],
  },
  {
    slug: "field",
    name: "Field",
    group: "Forms",
    summary: "Connects a label, a description, and an error message to the control inside it.",
    usage: `import { Field, Input } from "@easyui/react";

<Field label="Work email" description="We'll send the invite here." error={error}>
  <Input type="email" />
</Field>`,
    preview: (
      <Field label="Work email" description="We'll send the invite here." error="Enter an email like name@company.com.">
        <Input type="email" defaultValue="maya@company" />
      </Field>
    ),
    notes: ["The error is announced when it appears. Pass undefined to clear it."],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    group: "Forms",
    summary: "A checkbox with a label and optional description. The hit area is larger than the box.",
    usage: `import { Checkbox } from "@easyui/react";

<Checkbox
  label="Weekly digest"
  description="One summary email every Monday."
  checked={digest}
  onCheckedChange={setDigest}
/>`,
    preview: <Checkbox label="Weekly digest" description="One summary email every Monday." defaultChecked />,
    notes: ["Checked and indeterminate states use the accent color and keep their text readable."],
  },
  {
    slug: "radio-group",
    name: "Radio Group",
    group: "Forms",
    summary: "One choice from a short list, with a label and description for each option.",
    usage: `import { RadioGroup, Radio } from "@easyui/react";

<RadioGroup aria-label="Plan" value={plan} onValueChange={setPlan}>
  <Radio value="free" label="Free" description="Up to 3 projects." />
  <Radio value="pro" label="Pro" description="Unlimited projects." />
</RadioGroup>`,
    preview: (
      <RadioGroup aria-label="Plan" defaultValue="free">
        <Radio value="free" label="Free" description="Up to 3 projects and 2 members." />
        <Radio value="pro" label="Pro" description="Unlimited projects, roles, and audit logs." />
      </RadioGroup>
    ),
    notes: ["Give the group an accessible name with aria-label or a labelled wrapper."],
  },
  {
    slug: "switch",
    name: "Switch",
    group: "Forms",
    summary: "An on/off control for settings that apply right away.",
    usage: `import { Switch } from "@easyui/react";

<Switch
  label="Notify on new sign-ins"
  description="Email the owner when someone signs in from a new device."
  checked={notify}
  onCheckedChange={setNotify}
/>`,
    preview: <Switch label="Notify on new sign-ins" description="Email the owner when someone signs in from a new device." />,
    notes: ["Use a Checkbox for choices that take effect on submit."],
  },
  {
    slug: "slider",
    name: "Slider",
    group: "Forms",
    summary: "Picks a number on a track. Arrow keys, Page Up and Down, Home, and End all work.",
    usage: `import { Slider } from "@easyui/react";

<Slider
  label="Volume"
  showValue
  value={volume}
  min={0}
  max={100}
  onValueChange={(v) => setVolume(v as number)}
/>`,
    preview: <SliderExample />,
    notes: ["Pass an array to get a range slider with two thumbs."],
  },
  {
    slug: "toggle",
    name: "Toggle",
    group: "Forms",
    summary: "A button that stays pressed. Use it for formatting, filters, and on/off buttons.",
    usage: `import { Toggle } from "@easyui/react";

<Toggle aria-label="Bold" variant="outline">
  <strong>B</strong>
</Toggle>`,
    preview: (
      <Toggle aria-label="Pin project" variant="outline" defaultPressed>
        Pinned
      </Toggle>
    ),
    notes: ["Pressed state uses a surface and a ring, so it does not depend on color alone."],
  },
  {
    slug: "toggle-group",
    name: "Toggle Group",
    group: "Forms",
    summary: "A joined set of toggles. Arrow keys move between them.",
    usage: `import { ToggleGroup, Toggle } from "@easyui/react";

<ToggleGroup aria-label="Text style" multiple value={styles} onValueChange={setStyles}>
  <Toggle value="bold" aria-label="Bold">B</Toggle>
  <Toggle value="italic" aria-label="Italic">I</Toggle>
</ToggleGroup>`,
    preview: <ToggleGroupExample />,
    notes: ["Leave out multiple for a single choice, like a view switcher."],
  },
  {
    slug: "select",
    name: "Select",
    group: "Forms",
    summary: "Choose one option from a list. Keyboard and typeahead work out of the box.",
    usage: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@easyui/react";

<Select value={team} onValueChange={setTeam}>
  <SelectTrigger aria-label="Team">
    <SelectValue placeholder="Choose a team" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="design">Design</SelectItem>
    <SelectItem value="eng">Engineering</SelectItem>
  </SelectContent>
</Select>`,
    preview: (
      <Select defaultValue="design">
        <SelectTrigger aria-label="Team">
          <SelectValue placeholder="Choose a team" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="eng">Engineering</SelectItem>
          <SelectItem value="ops">Operations</SelectItem>
        </SelectContent>
      </Select>
    ),
    notes: ["Use Combobox when the list is long enough that typing to filter is faster."],
  },
  {
    slug: "combobox",
    name: "Combobox",
    group: "Forms",
    summary: "A text input that filters a list as you type. Good for long lists.",
    usage: `import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from "@easyui/react";

<Combobox items={teams}>
  <ComboboxInput placeholder="Search teams" />
  <ComboboxContent>
    <ComboboxEmpty>No team matches that search.</ComboboxEmpty>
    <ComboboxList>
      {(team) => <ComboboxItem key={team.value} value={team}>{team.label}</ComboboxItem>}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
    preview: (
      <Combobox items={["Design", "Engineering", "Operations"]}>
        <ComboboxInput placeholder="Search teams" />
        <ComboboxContent>
          <ComboboxEmpty>No team matches that search.</ComboboxEmpty>
          <ComboboxList>{(team: string) => <ComboboxItem key={team} value={team}>{team}</ComboboxItem>}</ComboboxList>
        </ComboboxContent>
      </Combobox>
    ),
    notes: ["Type to filter, then use the arrow keys and Enter to choose."],
  },
  {
    slug: "dialog",
    name: "Dialog",
    group: "Overlays",
    summary: "A modal window for a task that needs full attention. Focus stays inside until it closes.",
    usage: `import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button } from "@easyui/react";

<Dialog>
  <DialogTrigger render={<Button variant="secondary">Remove access</Button>} />
  <DialogContent>
    <DialogTitle>Remove access for this team?</DialogTitle>
    <DialogDescription>They will lose access to every project.</DialogDescription>
    <DialogFooter>
      <DialogClose render={<Button variant="ghost">Keep access</Button>} />
      <Button variant="danger">Remove access</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    preview: (
      <Dialog>
        <DialogTrigger render={<Button variant="secondary">Remove access</Button>} />
        <DialogContent>
          <DialogTitle>Remove access for this team?</DialogTitle>
          <DialogDescription>They will lose access to every project.</DialogDescription>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost">Keep access</Button>} />
            <Button variant="danger">Remove access</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    notes: ["Escape and the close button both dismiss it, and focus returns to the trigger."],
  },
  {
    slug: "alert-dialog",
    name: "Alert Dialog",
    group: "Overlays",
    summary: "A dialog that asks the user to confirm something destructive. It cannot be dismissed by clicking outside.",
    usage: `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose, Button } from "@easyui/react";

<AlertDialog>
  <AlertDialogTrigger render={<Button variant="danger">Delete account</Button>} />
  <AlertDialogContent>
    <AlertDialogTitle>Delete your account?</AlertDialogTitle>
    <AlertDialogDescription>Your projects are removed after 30 days.</AlertDialogDescription>
    <AlertDialogFooter>
      <AlertDialogClose render={<Button variant="ghost">Keep account</Button>} />
      <Button variant="danger">Delete account</Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    preview: (
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="danger">Delete account</Button>} />
        <AlertDialogContent>
          <AlertDialogTitle>Delete your account?</AlertDialogTitle>
          <AlertDialogDescription>Your projects are removed after 30 days. You can cancel before then.</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="ghost">Keep account</Button>} />
            <Button variant="danger">Delete account</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    notes: ["Use it only when the action cannot be undone easily."],
  },
  {
    slug: "sheet",
    name: "Sheet",
    group: "Overlays",
    summary: "A panel that slides in from the left, right, or bottom. On small screens it works as a mobile menu.",
    usage: `import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, Button } from "@easyui/react";

<Sheet>
  <SheetTrigger render={<Button variant="ghost">Open menu</Button>} />
  <SheetContent side="left">
    <SheetTitle>Navigation</SheetTitle>
    <SheetDescription>Projects, members, and billing.</SheetDescription>
  </SheetContent>
</Sheet>`,
    preview: (
      <Sheet>
        <SheetTrigger render={<Button variant="ghost">Open menu</Button>} />
        <SheetContent side="left">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>On small screens, the sidebar opens here.</SheetDescription>
        </SheetContent>
      </Sheet>
    ),
    notes: ["Set side to 'bottom' for a sheet that rises from the bottom edge."],
  },
  {
    slug: "popover",
    name: "Popover",
    group: "Overlays",
    summary: "A floating panel for a few controls, anchored to its trigger.",
    usage: `import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, Button } from "@easyui/react";

<Popover>
  <PopoverTrigger render={<Button variant="secondary">Filters</Button>} />
  <PopoverContent align="start">
    <PopoverTitle>Filter projects</PopoverTitle>
    <PopoverDescription>Changes apply as soon as you pick them.</PopoverDescription>
  </PopoverContent>
</Popover>`,
    preview: (
      <Popover>
        <PopoverTrigger render={<Button variant="secondary">Filters</Button>} />
        <PopoverContent align="start">
          <PopoverTitle>Filter projects</PopoverTitle>
          <PopoverDescription>Changes apply as soon as you pick them.</PopoverDescription>
        </PopoverContent>
      </Popover>
    ),
    notes: ["Use a Dialog when the panel needs to block the page."],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    group: "Overlays",
    summary: "A short hint on hover and keyboard focus. Not for essential information.",
    usage: `import { Tooltip, TooltipTrigger, TooltipContent, Button } from "@easyui/react";

<Tooltip>
  <TooltipTrigger render={<Button variant="ghost" size="sm">Copy link</Button>} />
  <TooltipContent>Copy the invite link</TooltipContent>
</Tooltip>`,
    preview: (
      <Tooltip>
        <TooltipTrigger render={<Button variant="secondary">Copy link</Button>} />
        <TooltipContent>Copy the invite link</TooltipContent>
      </Tooltip>
    ),
    notes: ["Hover the button or tab to it. The tooltip is linked to its trigger with aria-describedby."],
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    group: "Overlays",
    summary: "A menu of actions opened from a button. Arrow keys move through items.",
    usage: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Button } from "@easyui/react";

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="secondary">More</Button>} />
  <DropdownMenuContent>
    <DropdownMenuItem onClick={rename}>Rename</DropdownMenuItem>
    <DropdownMenuItem onClick={archive}>Archive</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    preview: (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="secondary">More</Button>} />
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => toast({ title: "Renamed", description: "The project has its new name." })}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast({ title: "Project archived", type: "error" })}>Archive</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    notes: ["Use it for actions. For choosing a value in a form, use Select."],
  },
  {
    slug: "toast",
    name: "Toast",
    group: "Overlays",
    summary: "A short message that appears and dismisses itself. Call toast() from anywhere.",
    usage: `import { ToastProvider, toast, Button } from "@easyui/react";

// Once, near the root of the app:
<ToastProvider>{children}</ToastProvider>

// Anywhere:
<Button onClick={() => toast({ title: "Invite sent", type: "success" })}>Send</Button>`,
    preview: <ToastExample />,
    notes: ["Toasts use role=status, so they are announced without moving focus."],
  },
  {
    slug: "card",
    name: "Card",
    group: "Layout and navigation",
    summary: "A surface that groups related content, with a header, body, and footer.",
    usage: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@easyui/react";

<Card>
  <CardHeader>
    <CardTitle>Workspace</CardTitle>
    <CardDescription>Choose what this workspace sends.</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>
    <Button size="sm">Save changes</Button>
  </CardFooter>
</Card>`,
    preview: (
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>Choose what this workspace sends and where notes live.</CardDescription>
        </CardHeader>
        <CardContent>
          <Checkbox label="Weekly digest" defaultChecked />
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">Discard</Button>
          <Button size="sm">Save changes</Button>
        </CardFooter>
      </Card>
    ),
    notes: [],
  },
  {
    slug: "tabs",
    name: "Tabs",
    group: "Layout and navigation",
    summary: "Switches between panels of related content. Arrow keys move between tabs.",
    usage: `import { Tabs, TabsList, TabsTab, TabsPanel } from "@easyui/react";

<Tabs defaultValue="general">
  <TabsList aria-label="Workspace sections">
    <TabsTab value="general">General</TabsTab>
    <TabsTab value="notes">Notes</TabsTab>
  </TabsList>
  <TabsPanel value="general">…</TabsPanel>
  <TabsPanel value="notes">…</TabsPanel>
</Tabs>`,
    preview: (
      <Tabs defaultValue="general">
        <TabsList aria-label="Workspace sections">
          <TabsTab value="general">General</TabsTab>
          <TabsTab value="notes">Notes</TabsTab>
        </TabsList>
        <TabsPanel value="general">
          <p className="demo-text">General settings for this workspace.</p>
        </TabsPanel>
        <TabsPanel value="notes">
          <p className="demo-text">Onboarding notes for new members.</p>
        </TabsPanel>
      </Tabs>
    ),
    notes: ["Only the active panel is mounted. Controls inside inactive panels reset when you switch away."],
  },
  {
    slug: "accordion",
    name: "Accordion",
    group: "Layout and navigation",
    summary: "A stack of sections where each one opens on its own. Good for FAQs.",
    usage: `import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@easyui/react";

<Accordion>
  <AccordionItem value="billing">
    <AccordionTrigger>Who receives invoices?</AccordionTrigger>
    <AccordionPanel>Invoices go to the workspace owner.</AccordionPanel>
  </AccordionItem>
</Accordion>`,
    preview: (
      <Accordion>
        <AccordionItem value="billing">
          <AccordionTrigger>Who receives invoices?</AccordionTrigger>
          <AccordionPanel>Invoices go to the workspace owner, with a copy to billing.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="seats">
          <AccordionTrigger>What counts as a seat?</AccordionTrigger>
          <AccordionPanel>Each person with access counts as one seat. Guests are free.</AccordionPanel>
        </AccordionItem>
      </Accordion>
    ),
    notes: [],
  },
  {
    slug: "collapsible",
    name: "Collapsible",
    group: "Layout and navigation",
    summary: "One block of content that opens and closes. Use Accordion for a list of them.",
    usage: `import { Collapsible, CollapsibleTrigger, CollapsiblePanel } from "@easyui/react";

<Collapsible>
  <CollapsibleTrigger>Advanced options</CollapsibleTrigger>
  <CollapsiblePanel>Webhooks, API keys, and export formats.</CollapsiblePanel>
</Collapsible>`,
    preview: (
      <Collapsible>
        <CollapsibleTrigger>Advanced options</CollapsibleTrigger>
        <CollapsiblePanel>Webhooks, API keys, and export formats live here.</CollapsiblePanel>
      </Collapsible>
    ),
    notes: [],
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    group: "Layout and navigation",
    summary: "Shows where the current page sits. The last item is marked as the current page.",
    usage: `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbCurrent } from "@easyui/react";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
      <BreadcrumbSeparator />
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbCurrent>Invoices</BreadcrumbCurrent>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    preview: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#components">Projects</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#components">Atlas</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbCurrent>Invoices</BreadcrumbCurrent>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    notes: ["The separator is decorative and hidden from screen readers."],
  },
  {
    slug: "pagination",
    name: "Pagination",
    group: "Layout and navigation",
    summary: "Numbered pages with previous and next. Gaps show when there are many pages.",
    usage: `import { Pagination } from "@easyui/react";

<Pagination page={page} pageCount={9} onPageChange={setPage} />`,
    preview: <PaginationExample />,
    notes: ["Controlled: you own the page number and fetch the matching rows."],
  },
  {
    slug: "aspect-ratio",
    name: "Aspect Ratio",
    group: "Layout and navigation",
    summary: "Keeps media at a fixed shape while the width changes.",
    usage: `import { AspectRatio } from "@easyui/react";

<AspectRatio ratio={16 / 9}>
  <img src="/cover.jpg" alt="Project cover" />
</AspectRatio>`,
    preview: (
      <AspectRatio ratio={16 / 9} className="demo-ratio">
        <div className="demo-ratio__inner">16 : 9</div>
      </AspectRatio>
    ),
    notes: ["Children are clipped to the box. Images and video fill it with object-fit: cover."],
  },
  {
    slug: "table",
    name: "Table",
    group: "Layout and navigation",
    summary: "A styled table with a muted header. The wrapper scrolls sideways on small screens.",
    usage: `import { Table, TableCaption, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@easyui/react";

<Table>
  <TableCaption>Invoices this month</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-1042</TableCell>
      <TableCell>$2,400.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    preview: (
      <Table>
        <TableCaption>Invoices this month</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV-1042</TableCell>
            <TableCell>Northwind</TableCell>
            <TableCell>$2,400.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV-1043</TableCell>
            <TableCell>Contoso</TableCell>
            <TableCell>$860.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    notes: ["Table is a layout-free wrapper. Sorting and pagination are your code, using aria-sort on the header."],
  },
];

// The app root mounts ToastProvider, so this button only needs to call toast().
function ToastExample() {
  return (
    <div className="demo-row">
      <Button
        variant="primary"
        onClick={() => toast({ title: "Invite sent", description: "Maya has 48 hours to join.", type: "success" })}
      >
        Show a toast
      </Button>
    </div>
  );
}

export function findComponent(slug: string): ComponentDoc | undefined {
  return COMPONENTS.find((c) => c.slug === slug);
}
