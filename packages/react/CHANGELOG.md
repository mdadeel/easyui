# Changelog

All notable changes to `@easyui/react` are listed here. Versions follow semver.
Before 1.0, a minor version can include breaking changes; each one is marked **Breaking**.

## 0.1.0 (unreleased)

First public release candidate.

### Components

- Foundations: Alert, Avatar, Badge, Button, Empty, Kbd, Label, Link, Progress, Separator, Skeleton, Spinner.
- Forms: Checkbox, Combobox, Field, Input, Radio Group, Select, Slider, Switch, Textarea, Toggle, Toggle Group.
- Overlays: Alert Dialog, Dialog, Dropdown Menu, Popover, Sheet, Toast, Tooltip.
- Layout and navigation: Accordion, Aspect Ratio, Breadcrumb, Card, Collapsible, Pagination, Table, Tabs.

### Theming

- `EasyUIProvider` sets accent, radius, font family, and light or dark mode for its subtree.
- Accent text (labels on buttons, checked controls) is chosen for contrast, including hover.
- All styles come from `@easyui/react/styles.css`. Import it once.

### Registry

- A shadcn-format registry (`registry/r/*.json`) with one item per component, plus `easyui-tokens`.

### Known gaps

- No Calendar, Date Picker, Data Table, Command, Context Menu, Menubar, Navigation Menu, Sidebar, Resizable, Scroll Area, Input OTP, Hover Card, Carousel, Chart, or Drawer yet. See `docs/GAP-ANALYSIS.md`.
- The contrast audit for accent presets is a one-off check, not a committed test.
