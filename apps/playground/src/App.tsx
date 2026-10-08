import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  EasyUIProvider,
  Field,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  getAccentPalette,
  isHexColor,
  type EasyUIRadius,
  type EasyUITheme,
} from "@easyui/react";

type Preset = { id: string; label: string; accent: string | undefined };

const PRESETS: Preset[] = [
  { id: "ink", label: "Ink", accent: undefined },
  { id: "blue", label: "Blue", accent: "#2563eb" },
  { id: "violet", label: "Violet", accent: "#7c3aed" },
  { id: "emerald", label: "Emerald", accent: "#059669" },
  { id: "amber", label: "Amber", accent: "#d97706" },
  { id: "rose", label: "Rose", accent: "#e11d48" },
];

const RADII: EasyUIRadius[] = ["none", "sm", "md", "lg", "full"];

const FONTS = {
  geist: { label: "Geist", value: undefined },
  system: { label: "System", value: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" },
} as const;

type FontKey = keyof typeof FONTS;

const TEAMS = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "growth", label: "Growth" },
];

function normalize(hex: string): string {
  const v = hex.replace(/^#/, "");
  return "#" + (v.length === 3 ? v.split("").map((c) => c + c).join("") : v).toLowerCase();
}

/**
 * The page itself is NOT themed. Only the preview surface is wrapped in
 * EasyUIProvider, so the accent, radius, font, and mode you pick affect the
 * components on the right and nothing else.
 */
export function App() {
  const [accent, setAccent] = useState<string | undefined>(undefined);
  const [draft, setDraft] = useState("#171717"); // starts on the default ink accent
  const [radius, setRadius] = useState<EasyUIRadius>("md");
  const [font, setFont] = useState<FontKey>("geist");
  const [mode, setMode] = useState<EasyUITheme>("light");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState<string | null>(null);
  const [digest, setDigest] = useState(true);
  const [notify, setNotify] = useState(false);
  const emailError =
    email.length > 0 && !/^\S+@\S+\.\S+$/.test(email) ? "Enter an email like name@company.com." : undefined;

  const palette = accent ? getAccentPalette(accent) : null;
  const passes = palette ? palette.contrast >= 4.5 : true;

  function applyDraft(value: string) {
    setDraft(value);
    if (isHexColor(value)) setAccent(value);
  }

  return (
    <div className="page">
      <header className="page__header">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">easyui</span>
        </div>
      </header>

      <main className="page__main">
        <section className="intro">
          <p className="eyebrow">Playground</p>
          <h1 className="title">Pick a brand color. Everything follows.</h1>
          <p className="lede">
            Change the accent, radius, or font. Only the components on the right update. This page
            keeps its own look.
          </p>
        </section>

        <div className="layout">
          <aside className="panel" aria-label="Theme controls">
            <fieldset className="field">
              <legend className="field__label">Accent</legend>
              <div className="swatches">
                {PRESETS.map((p) => {
                  const active = accent === p.accent;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      className="swatch"
                      aria-pressed={active}
                      aria-label={`${p.label} accent`}
                      title={p.label}
                      data-active={active || undefined}
                      style={{ background: p.accent ?? "#171717" }}
                      onClick={() => {
                        setAccent(p.accent);
                        setDraft(p.accent ?? "#171717");
                      }}
                    />
                  );
                })}
              </div>
              <div className="color-input">
                <input
                  type="color"
                  aria-label="Custom accent color"
                  value={isHexColor(draft) ? normalize(draft) : "#2563eb"}
                  onChange={(e) => applyDraft(e.target.value)}
                />
                <input
                  type="text"
                  aria-label="Accent hex value"
                  aria-invalid={!isHexColor(draft) || undefined}
                  value={draft}
                  spellCheck={false}
                  onChange={(e) => applyDraft(e.target.value)}
                />
              </div>
              <p className={passes ? "hint" : "hint hint--warn"} aria-live="polite">
                {palette
                  ? `Text on accent: ${palette.accentForeground} · contrast ${palette.contrast.toFixed(
                      1,
                    )}:1${passes ? "" : " (below AA)"}`
                  : "Default ink. Enter a hex value or choose a preset."}
              </p>
            </fieldset>

            <fieldset className="field">
              <legend className="field__label">Corner radius</legend>
              <div className="segmented" role="radiogroup" aria-label="Corner radius">
                {RADII.map((r) => (
                  <button
                    key={r}
                    type="button"
                    role="radio"
                    aria-checked={radius === r}
                    className="segmented__item"
                    onClick={() => setRadius(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="field">
              <legend className="field__label">Font</legend>
              <div className="segmented" role="radiogroup" aria-label="Font">
                {(Object.keys(FONTS) as FontKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={font === key}
                    className="segmented__item"
                    onClick={() => setFont(key)}
                  >
                    {FONTS[key].label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="field">
              <legend className="field__label">Mode</legend>
              <div className="segmented" role="radiogroup" aria-label="Mode">
                {(["light", "dark"] as EasyUITheme[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={mode === m}
                    className="segmented__item"
                    onClick={() => setMode(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </fieldset>
          </aside>

          <EasyUIProvider
            className="preview"
            accent={accent}
            radius={radius}
            fontFamily={FONTS[font].value}
            theme={mode}
            aria-label="Component preview"
          >
            <section className="card" aria-labelledby="buttons-heading">
              <h2 id="buttons-heading" className="card__title">
                Buttons
              </h2>

              <div className="row">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Delete</Button>
              </div>

              <div className="row">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>

              <div className="row">
                <Button loading>Saving</Button>
                <Button disabled>Disabled</Button>
              </div>
            </section>

            <section className="card" aria-labelledby="form-heading">
              <p className="eyebrow">Invite</p>
              <h2 id="form-heading" className="card__title">
                Add a teammate
              </h2>

              <div className="form-grid">
                <Field label="Work email" description="We'll send the invite here." error={emailError}>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="maya@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>

                <Field label="Team">
                  <Select items={TEAMS} value={team} onValueChange={(v) => setTeam(v as string)}>
                    <SelectTrigger aria-label="Team">
                      <SelectValue placeholder="Choose a team" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEAMS.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="row row--end">
                <Dialog>
                  <DialogTrigger render={<Button variant="secondary">Remove access</Button>} />
                  <DialogContent>
                    <DialogTitle>Remove access for this team?</DialogTitle>
                    <DialogDescription>
                      Members keep their work, but they lose access to the team's projects.
                    </DialogDescription>
                    <DialogFooter>
                      <DialogClose render={<Button variant="ghost">Keep access</Button>} />
                      <Button variant="danger">Remove access</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button disabled={!email || !!emailError || !team}>Send invite</Button>
              </div>
            </section>
            <Card aria-labelledby="workspace-heading">
              <CardHeader>
                <div className="row row--between">
                  <CardTitle id="workspace-heading">Workspace</CardTitle>
                  <Tooltip>
                    <TooltipTrigger render={<Button variant="ghost" size="sm">Copy link</Button>} />
                    <TooltipContent>Copy the invite link</TooltipContent>
                  </Tooltip>
                </div>
                <CardDescription>Choose what this workspace sends and where notes live.</CardDescription>
              </CardHeader>

              <Tabs defaultValue="general">
                <TabsList aria-label="Workspace sections">
                  <TabsTab value="general">General</TabsTab>
                  <TabsTab value="notes">Notes</TabsTab>
                </TabsList>
                <TabsPanel value="general">
                  <CardContent>
                    <Switch
                      label="Notify on new sign-ins"
                      description="Email the workspace owner when someone signs in from a new device."
                      checked={notify}
                      onCheckedChange={setNotify}
                    />
                    <Checkbox
                      label="Weekly digest"
                      description="One summary email every Monday."
                      checked={digest}
                      onCheckedChange={setDigest}
                    />
                  </CardContent>
                </TabsPanel>
                <TabsPanel value="notes">
                  <CardContent>
                    <Field label="Onboarding notes" description="Shown to new members on their first day.">
                      <Textarea rows={4} placeholder="Where to start, who to ask, what to read first." />
                    </Field>
                  </CardContent>
                </TabsPanel>
              </Tabs>

              <CardFooter>
                <Button variant="secondary" size="sm">Discard</Button>
                <Button size="sm">Save changes</Button>
              </CardFooter>
            </Card>
          </EasyUIProvider>
        </div>
      </main>
    </div>
  );
}
