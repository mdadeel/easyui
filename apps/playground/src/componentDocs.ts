/** Hand-checked against the corresponding @easyui/react implementation. */
export type ComponentDoc = {
  anatomy: string;
  accessibility: string;
  api: { name: string; type: string; defaultValue: string; description: string }[];
  minimal?: string;
};

export const componentDocs: Record<string, ComponentDoc> = {
  badge: {
    anatomy: "Badge is a compact span for a short status or label.",
    accessibility: "Make status understandable from the text, not color alone.",
    api: [{ name: "variant", type: '"neutral" | "accent" | "outline" | "danger"', defaultValue: '"neutral"', description: "Visual treatment." }],
  },
  alert: {
    anatomy: "Compose Alert with AlertTitle and AlertDescription for an inline message.",
    accessibility: "Use role=alert only for messages that need immediate attention. Decorative icons should be hidden from assistive technology.",
    api: [
      { name: "variant", type: '"default" | "success" | "warning" | "danger"', defaultValue: '"default"', description: "Message treatment." },
      { name: "icon", type: "ReactNode", defaultValue: "—", description: "Optional icon at the start." },
    ],
  },
  progress: {
    anatomy: "Progress displays determinate or indeterminate progress through Base UI.",
    accessibility: "Give progress a descriptive label; do not rely on the bar alone to communicate status.",
    api: [
      { name: "label", type: "string", defaultValue: "—", description: "Visible label and accessible name." },
      { name: "value", type: "number", defaultValue: "—", description: "Progress value; omit for indeterminate progress." },
      { name: "showValue", type: "boolean", defaultValue: "false", description: "Displays the value alongside the label." },
    ],
  },
  slider: {
    anatomy: "Slider wraps the Base UI slider for selecting a value within a range.",
    accessibility: "Give the slider a label. Arrow keys, Page Up/Down, Home, and End operate the thumb.",
    api: [
      { name: "label", type: "string", defaultValue: "—", description: "Visible label and accessible name." },
      { name: "showValue", type: "boolean", defaultValue: "false", description: "Displays the current value." },
      { name: "value / onValueChange", type: "value / function", defaultValue: "—", description: "Control the current value." },
    ],
  },
  pagination: {
    anatomy: "Pagination is controlled: keep the current page in state and update it with onPageChange.",
    accessibility: "The navigation and page controls have accessible names; the current page is identified to assistive technology.",
    api: [
      { name: "page", type: "number", defaultValue: "required", description: "Current page, starting at 1." },
      { name: "pageCount", type: "number", defaultValue: "required", description: "Total number of pages." },
      { name: "onPageChange", type: "(page: number) => void", defaultValue: "required", description: "Updates the current page." },
      { name: "siblings", type: "number", defaultValue: "1", description: "Numbers shown on each side of the current page." },
    ],
  },
  textarea: {
    anatomy: "Textarea is a native multiline input. Field can provide label, description, and error associations.",
    accessibility: "Always provide an accessible label. Within a Field, descriptions and errors are associated automatically.",
    api: [{ name: "invalid", type: "boolean", defaultValue: "Field state or false", description: "Marks the control invalid; can be inherited from Field." }],
  },
  avatar: {
    anatomy: "Compose Avatar with AvatarImage and AvatarFallback. The fallback is shown until the image loads or if it fails.",
    accessibility: "Provide appropriate alternative text on AvatarImage and a meaningful fallback.",
    api: [{ name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Avatar size." }],
  },
  spinner: {
    anatomy: "Spinner is an indeterminate loading indicator.",
    accessibility: "Its label is announced in a status region; describe the operation rather than relying on the animation alone.",
    api: [{ name: "label", type: "string", defaultValue: '"Loading"', description: "Status text announced to assistive technology." }],
  },
  toggle: {
    anatomy: "Toggle is a button that stays pressed, suitable for filters or formatting controls.",
    accessibility: "Give the toggle a clear label. Its pressed state is exposed to assistive technology.",
    api: [
      { name: "variant", type: '"default" | "outline"', defaultValue: '"default"', description: "Visual treatment." },
      { name: "size", type: '"sm" | "md"', defaultValue: '"md"', description: "Control size." },
    ],
  },
  card: {
    anatomy: "Compose Card with CardHeader, CardTitle, CardDescription, CardContent, and CardFooter as needed.",
    accessibility: "Choose a meaningful heading level for the context and keep related content together.",
    api: [{ name: "as", type: "ElementType", defaultValue: '"h3"', description: "Heading element rendered by CardTitle." }],
  },
  button: {
    anatomy: "Button renders a native button. Use its variant for emphasis and its size to fit the context.",
    accessibility: "The visible label is the accessible name. Loading disables the button and sets aria-busy; use disabled when an action is unavailable.",
    api: [
      { name: "variant", type: '"primary" | "secondary" | "ghost" | "danger"', defaultValue: '"primary"', description: "Visual emphasis." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Control size." },
      { name: "loading", type: "boolean", defaultValue: "false", description: "Shows a spinner and disables the button." },
      { name: "fullWidth", type: "boolean", defaultValue: "false", description: "Fills the container width." },
      { name: "type", type: '"button" | "submit" | "reset"', defaultValue: '"button"', description: "Native button behavior." },
    ],
    minimal: 'import { Button } from "@easyui/react";\n\nexport default function Example() {\n  return <Button>Get started</Button>;\n}\n',
  },
  input: {
    anatomy: "Input is a native text input. Field can supply the label, description, and error associations.",
    accessibility: "Always provide an accessible label. Within a Field, descriptions and errors are associated automatically; invalid sets aria-invalid.",
    api: [
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Visual control size." },
      { name: "invalid", type: "boolean", defaultValue: "Field state or false", description: "Marks the input invalid; can be inherited from Field." },
    ],
    minimal: 'import { Input } from "@easyui/react";\n\nexport default function Example() {\n  return <Input aria-label="Email" type="email" />;\n}\n',
  },
  switch: {
    anatomy: "Switch wraps the Base UI switch and can render its own label and description.",
    accessibility: "Give the switch a descriptive label. Its checked state is exposed to assistive technology; Space toggles it.",
    api: [
      { name: "label", type: "ReactNode", defaultValue: "—", description: "Text associated with the switch." },
      { name: "description", type: "ReactNode", defaultValue: "—", description: "Additional text associated with the switch." },
      { name: "checked / defaultChecked", type: "boolean", defaultValue: "Base UI default", description: "Controlled or initial checked state." },
      { name: "onCheckedChange", type: "function", defaultValue: "—", description: "Responds to a checked-state change." },
    ],
    minimal: 'import { Switch } from "@easyui/react";\n\nexport default function Example() {\n  return <Switch label="Notifications" defaultChecked />;\n}\n',
  },
  checkbox: {
    anatomy: "Checkbox wraps the Base UI checkbox and can render its own label and description.",
    accessibility: "Use a clear label for each choice. The label is associated with the control, and Space toggles it.",
    api: [
      { name: "label", type: "ReactNode", defaultValue: "—", description: "Text associated with the checkbox." },
      { name: "description", type: "ReactNode", defaultValue: "—", description: "Additional text associated with the checkbox." },
      { name: "checked / defaultChecked", type: "boolean", defaultValue: "Base UI default", description: "Controlled or initial checked state." },
      { name: "onCheckedChange", type: "function", defaultValue: "—", description: "Responds to a checked-state change." },
    ],
  },
  dialog: {
    anatomy: "Compose Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, and DialogClose. Use DialogFooter to group actions.",
    accessibility: "Include a title and description. The modal traps focus, supports Escape, and returns focus to the trigger.",
    api: [
      { name: "open / defaultOpen", type: "boolean", defaultValue: "Base UI default", description: "Controlled or initial open state on Dialog." },
      { name: "onOpenChange", type: "function", defaultValue: "—", description: "Responds to changes in open state." },
      { name: "render", type: "React element", defaultValue: "—", description: "Provided on DialogTrigger or DialogClose to render a custom control." },
    ],
  },
  tabs: {
    anatomy: "Compose Tabs with a TabsList, TabsTab for each choice, and a matching TabsPanel for each value.",
    accessibility: "Give TabsList an accessible name. Arrow-key navigation and roving focus are provided by Base UI.",
    api: [
      { name: "value / defaultValue", type: "value", defaultValue: "—", description: "Controlled or initial selected value on Tabs." },
      { name: "onValueChange", type: "function", defaultValue: "—", description: "Responds to selection changes." },
      { name: "value", type: "value", defaultValue: "—", description: "Matches each tab to its panel." },
    ],
  },
  select: {
    anatomy: "Compose Select, SelectTrigger, SelectValue, SelectContent, and SelectItem. Pass items to the root so the trigger can display labels.",
    accessibility: "Give the trigger an accessible name. Keyboard interaction and typeahead come from Base UI.",
    api: [
      { name: "items", type: "array", defaultValue: "—", description: "Options used to display selected labels." },
      { name: "value / defaultValue", type: "value", defaultValue: "—", description: "Controlled or initial selection." },
      { name: "onValueChange", type: "function", defaultValue: "—", description: "Responds to selection changes." },
      { name: "sideOffset", type: "number", defaultValue: "6", description: "Distance between trigger and popup, on SelectContent." },
    ],
  },
};
