# @easyui/react

Calm, accessible React components built on [Base UI](https://base-ui.com), styled with plain CSS variables.

## Install

```sh
npm install @easyui/react
```

Import the stylesheet once, in your entry file:

```tsx
import "@easyui/react/styles.css";
```

## Use

```tsx
import { Button, Field, Input, Switch } from "@easyui/react";

export function InviteForm() {
  return (
    <form>
      <Field label="Work email" description="We'll send the invite here.">
        <Input type="email" name="email" />
      </Field>
      <Switch label="Notify on sign-in" />
      <Button type="submit">Send invite</Button>
    </form>
  );
}
```

Set the accent, radius, or font for a part of the page with `EasyUIProvider`:

```tsx
import { EasyUIProvider } from "@easyui/react";

<EasyUIProvider accent="#2563eb" radius="lg" fontFamily="'Inter', sans-serif">
  <App />
</EasyUIProvider>
```

## Components

Foundations: Alert, Avatar, Badge, Button, Empty, Kbd, Label, Link, Progress, Separator, Skeleton, Spinner.
Forms: Checkbox, Combobox, Field, Input, Radio Group, Select, Slider, Switch, Textarea, Toggle, Toggle Group.
Overlays: Alert Dialog, Dialog, Dropdown Menu, Popover, Sheet, Toast, Tooltip.
Layout and navigation: Accordion, Aspect Ratio, Breadcrumb, Card, Collapsible, Pagination, Table, Tabs.

## Notes

- Peer dependencies: React 18.2 or newer.
- Each component has accessibility tests (axe) in the repository. Keyboard behavior comes from Base UI.
- Motion uses only transform and opacity, and it turns off when `prefers-reduced-motion` is set.
- To copy source into your project instead of installing the package, use the shadcn-format registry. See the docs site, Registry page.

## License

MIT
