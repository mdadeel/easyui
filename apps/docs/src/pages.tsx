import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EasyUIProvider,
  Field,
  Input,
  Kbd,
  Link,
  Separator,
  Slider,
  Switch,
  type EasyUIRadius,
  type EasyUITheme,
} from "@easyui/react";
import changelog from "../../../packages/react/CHANGELOG.md?raw";
import { CodeBlock } from "./CodeBlock";
import { COMPONENTS, GROUPS, findComponent, type Group } from "./catalog";
import { go } from "./router";

const INSTALL = "npm install @easyui/react";
const STYLES_IMPORT = `import "@easyui/react/styles.css";`;

// ---------------------------------------------------------------- Home

export function HomePage() {
  const picks = ["button", "switch", "progress", "tabs", "table", "dialog"];
  return (
    <>
      <section className="hero">
        <div className="docs-page">
          <p className="docs-eyebrow">React components · Base UI · plain CSS variables</p>
          <h1 className="hero__title">Calm, accessible components you can restyle without fighting them.</h1>
          <p className="docs-lead">
            easyui has {COMPONENTS.length} components. Each one has keyboard and screen reader behavior from Base UI, and its
            color, radius, and type come from a few CSS variables. Install the package, or copy the source with the shadcn CLI.
          </p>
          <div className="docs-actions">
            <Button onClick={() => go("/get-started")}>Get started</Button>
            <Button variant="secondary" onClick={() => go("/components")}>
              Browse components
            </Button>
          </div>
          <div className="install">
            <CodeBlock code={INSTALL} label="Install" />
          </div>
        </div>
      </section>

      <section className="docs-page" aria-labelledby="examples-heading">
        <div className="section-head">
          <h2 id="examples-heading" className="docs-h2">
            Live examples
          </h2>
          <Link href="#/components">All {COMPONENTS.length} components</Link>
        </div>
        <div className="example-grid">
          {picks.map((slug) => {
            const c = findComponent(slug);
            if (!c) return null;
            return (
              <a key={slug} className="example-card" href={`#/components/${slug}`}>
                <span className="example-card__name">{c.name}</span>
                <span className="example-card__preview">{c.preview}</span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="docs-page docs-page--narrow" aria-labelledby="why-heading">
        <h2 id="why-heading" className="docs-h2">
          What it is for
        </h2>
        <ul className="points">
          <li>
            <strong>Restyle by variable.</strong> Accent, radius, and font are CSS variables. Change them in one place, and
            every component follows. Text on the accent color stays readable in every state.
          </li>
          <li>
            <strong>Behavior you do not rebuild.</strong> Focus, keyboard navigation, and ARIA come from Base UI. Each component
            is checked with axe in the test suite.
          </li>
          <li>
            <strong>Motion that stops when asked.</strong> Animations are short and use only transform and opacity. With reduced
            motion on, they turn off.
          </li>
        </ul>
        <Separator />
        <p className="docs-note">
          Looking for a component that is not here? See the <a href="#/registry">registry</a> page, or read{" "}
          <a href="https://github.com/mdadeel/easyui/blob/main/docs/GAP-ANALYSIS.md">the gap analysis</a>.
        </p>
      </section>
    </>
  );
}

// ---------------------------------------------------------------- Get started

export function GetStartedPage() {
  return (
    <section className="docs-page docs-page--narrow">
      <p className="docs-eyebrow">Get started</p>
      <h1 className="docs-h1">Install, import the styles once, then use components.</h1>
      <p className="docs-lead">
        The package ships ES modules, CommonJS, and TypeScript types. It needs React 18.2 or newer. Styles are one CSS file.
      </p>

      <h2 className="docs-h2">1. Install</h2>
      <CodeBlock code={INSTALL} label="Terminal" />

      <h2 className="docs-h2">2. Import the styles once</h2>
      <p>Put this in your app's entry file, before any component renders.</p>
      <CodeBlock code={STYLES_IMPORT} label="main.tsx" />

      <h2 className="docs-h2">3. Use components</h2>
      <CodeBlock
        label="App.tsx"
        code={`import { Button, Field, Input, Switch } from "@easyui/react";

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
}`}
      />

      <h2 className="docs-h2">Optional: set the accent, radius, or font</h2>
      <p>
        The provider sets CSS variables for its subtree. Without it, the default ink accent and the medium radius apply.
      </p>
      <CodeBlock
        label="App.tsx"
        code={`import { EasyUIProvider } from "@easyui/react";

<EasyUIProvider accent="#2563eb" radius="lg" fontFamily="'Inter', sans-serif">
  <App />
</EasyUIProvider>`}
      />

      <h2 className="docs-h2">Accessibility</h2>
      <ul className="points">
        <li>Form controls take a label. Use Field or pass aria-label. Each example in these docs does this.</li>
        <li>Focus rings are visible on every interactive element, and they use the ring token, not the accent.</li>
        <li>Touch targets are at least 24 pixels. Checkbox, radio, and switch hit areas are wider than their visuals.</li>
        <li>Animations respect prefers-reduced-motion. Toasts announce with role status and do not move focus.</li>
      </ul>
      <p className="docs-note">
        Contrast for the accent presets was checked at rest and on hover, in light and dark mode. That check is a one-off audit,
        not yet a test in the repository.
      </p>
    </section>
  );
}

// ---------------------------------------------------------------- Theming

const PRESETS = [
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

const TOKENS: Array<[string, string]> = [
  ["--eui-color-accent", "Brand color. Buttons, checked states, links, and progress fill."],
  ["--eui-color-accent-fg", "Text on the accent. Chosen for contrast with the accent."],
  ["--eui-color-accent-hover", "Accent on hover. Also checked for contrast."],
  ["--eui-color-bg / --eui-color-surface", "Page background and raised surfaces such as cards and menus."],
  ["--eui-color-fg / --eui-color-fg-muted", "Primary and secondary text."],
  ["--eui-color-border / --eui-color-border-strong", "Hairline borders and stronger outlines."],
  ["--eui-color-ring", "Focus ring color."],
  ["--eui-radius-sm / md / lg / full", "Corner radius scale. The radius prop picks the base."],
  ["--eui-font-sans / --eui-font-mono", "Interface and code type families."],
  ["--eui-duration-fast / base, --eui-easing-out", "Motion timing. Shared by every component."],
];

export function ThemingPage() {
  const [accent, setAccent] = useState<string | undefined>(undefined);
  const [draft, setDraft] = useState("#171717");
  const [radius, setRadius] = useState<EasyUIRadius>("md");
  const [font, setFont] = useState<keyof typeof FONTS>("geist");
  const [mode, setMode] = useState<EasyUITheme>("light");
  const [sliderValue, setSliderValue] = useState(40);
  const [notify, setNotify] = useState(true);

  return (
    <section className="docs-page">
      <p className="docs-eyebrow">Theming</p>
      <h1 className="docs-h1">Change the look in one place.</h1>
      <p className="docs-lead">
        Every component reads the same variables. Try the controls below. Only the preview changes, and the rest of this page
        stays the same.
      </p>

      <div className="theme-layout">
        <div className="theme-controls" role="group" aria-label="Theme controls">
          <fieldset className="control">
            <legend className="control__label">Accent</legend>
            <div className="swatches">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="swatch"
                  aria-label={p.label}
                  aria-pressed={accent === p.accent}
                  data-accent={p.id}
                  style={{ background: p.accent ?? "#171717" }}
                  onClick={() => {
                    setAccent(p.accent);
                    if (p.accent) setDraft(p.accent);
                  }}
                />
              ))}
            </div>
            <Field label="Hex value" description="Any hex color. Text on it is chosen for contrast.">
              <Input
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) setAccent(e.target.value);
                }}
              />
            </Field>
          </fieldset>

          <fieldset className="control">
            <legend className="control__label">Corner radius</legend>
            <div className="segmented">
              {RADII.map((r) => (
                <button key={r} type="button" aria-pressed={radius === r} onClick={() => setRadius(r)}>
                  {r}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="control">
            <legend className="control__label">Font</legend>
            <div className="segmented">
              {(Object.keys(FONTS) as Array<keyof typeof FONTS>).map((k) => (
                <button key={k} type="button" aria-pressed={font === k} onClick={() => setFont(k)}>
                  {FONTS[k].label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="control">
            <legend className="control__label">Mode</legend>
            <div className="segmented">
              {(["light", "dark"] as EasyUITheme[]).map((m) => (
                <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>
                  {m === "light" ? "Light" : "Dark"}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <EasyUIProvider
          className="theme-preview"
          accent={accent}
          radius={radius}
          fontFamily={FONTS[font].value}
          theme={mode}
        >
          <div className="theme-preview__inner">
            <Card>
              <CardHeader>
                <CardTitle>Workspace</CardTitle>
                <CardDescription>Your settings update here as you change the controls.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="demo-row">
                  <Button>Save changes</Button>
                  <Button variant="secondary">Discard</Button>
                  <Badge variant="accent">New</Badge>
                </div>
                <Switch label="Notify on sign-ins" checked={notify} onCheckedChange={setNotify} />
                <Slider
                  label="Volume"
                  showValue
                  value={sliderValue}
                  min={0}
                  max={100}
                  onValueChange={(v) => setSliderValue(typeof v === "number" ? v : v[0])}
                />
              </CardContent>
            </Card>
          </div>
        </EasyUIProvider>
      </div>

      <h2 className="docs-h2">Tokens</h2>
      <p>
        These are the variables a theme sets. Override any of them in your own CSS, on <code>:root</code> or on a subtree.
      </p>
      <div className="token-table" role="table" aria-label="Design tokens">
        <div className="token-table__row token-table__row--head" role="row">
          <span role="columnheader">Variable</span>
          <span role="columnheader">Use</span>
        </div>
        {TOKENS.map(([name, use]) => (
          <div className="token-table__row" role="row" key={name}>
            <code role="cell">{name}</code>
            <span role="cell">{use}</span>
          </div>
        ))}
      </div>

      <h2 className="docs-h2">Override in CSS</h2>
      <CodeBlock
        label="styles.css"
        code={`:root {
  --eui-color-accent: #0f766e;   /* teal brand */
  --eui-radius-md: 4px;          /* sharper corners */
  --eui-font-sans: "Inter", sans-serif;
}`}
      />
    </section>
  );
}

// ---------------------------------------------------------------- Registry

interface RegistryIndexItem {
  name: string;
  title: string;
  description: string;
  dependencies: string[];
}

export function RegistryPage() {
  const [items, setItems] = useState<RegistryIndexItem[] | null>(null);
  const [error, setError] = useState(false);
  const [origin, setOrigin] = useState("https://your-site.example");

  useEffect(() => {
    setOrigin(window.location.origin);
    fetch("./r/index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { items: RegistryIndexItem[] }) => setItems(data.items))
      .catch(() => setError(true));
  }, []);

  return (
    <section className="docs-page">
      <p className="docs-eyebrow">Registry</p>
      <h1 className="docs-h1">Copy the source into your project.</h1>
      <p className="docs-lead">
        The registry follows the shadcn format. Each component is one JSON file with its source, its stylesheet, and every local
        file it imports. The CLI writes them into your project, so you can edit them directly.
      </p>

      <h2 className="docs-h2">Add a component</h2>
      <CodeBlock label="Terminal" code={`npx shadcn@latest add ${origin}/r/button.json`} />
      <p className="docs-note">
        Add <code>easyui-tokens</code> the first time. Every component depends on it, and the CLI installs it for you.
      </p>

      <h2 className="docs-h2">Components in the registry</h2>
      {error && (
        <p role="alert" className="docs-note">
          The registry index did not load. Run <code>pnpm dev</code> in the docs app, or check <code>public/r/index.json</code>.
        </p>
      )}
      {!items && !error && <p className="docs-note">Loading the list…</p>}
      {items && (
        <ul className="registry-list">
          {items.map((item) => (
            <li key={item.name} className="registry-list__item">
              <div>
                <code>{item.name}</code>
                <p className="registry-list__desc">{item.description}</p>
                {item.dependencies.length > 0 && (
                  <p className="registry-list__deps">Needs npm: {item.dependencies.join(", ")}</p>
                )}
              </div>
              <a href={`./r/${item.name}.json`} className="registry-list__json">
                JSON
              </a>
            </li>
          ))}
        </ul>
      )}

      <h2 className="docs-h2">Where the registry comes from</h2>
      <p>
        <code>packages/react/registry/</code> is generated from <code>src/</code> by a script. Run it with <code>pnpm build</code>,
        and the tests check that every item compiles with strict TypeScript.
      </p>
    </section>
  );
}

// ---------------------------------------------------------------- Changelog

export function ChangelogPage() {
  return (
    <section className="docs-page docs-page--narrow">
      <p className="docs-eyebrow">Changelog</p>
      <h1 className="docs-h1">What changed</h1>
      <pre className="changelog">{changelog}</pre>
    </section>
  );
}

// ---------------------------------------------------------------- Components

export function ComponentsIndexPage() {
  return (
    <section className="docs-page">
      <p className="docs-eyebrow">Components</p>
      <h1 className="docs-h1">{COMPONENTS.length} components, grouped by job.</h1>
      <p className="docs-lead">Each page has a live example, the code that produces it, and notes on how it behaves.</p>
      {GROUPS.map((group) => (
        <div key={group} className="group">
          <h2 className="docs-h2">{group}</h2>
          <ul className="card-grid">
            {COMPONENTS.filter((c) => c.group === group).map((c) => (
              <li key={c.slug}>
                <a className="index-card" href={`#/components/${c.slug}`}>
                  <span className="index-card__name">{c.name}</span>
                  <span className="index-card__summary">{c.summary}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export function ComponentPage({ slug }: { slug: string }) {
  const doc = findComponent(slug);
  if (!doc) {
    return (
      <section className="docs-page docs-page--narrow">
        <h1 className="docs-h1">Component not found</h1>
        <Link href="#/components">Back to components</Link>
      </section>
    );
  }
  const index = COMPONENTS.indexOf(doc);
  const prev = COMPONENTS[index - 1];
  const next = COMPONENTS[index + 1];
  const groupItems = (g: Group) => COMPONENTS.filter((c) => c.group === g);

  return (
    <div className="component-layout">
      <nav aria-label="Components" className="sidebar">
        {GROUPS.map((g) => (
          <div key={g} className="sidebar__group">
            <p className="sidebar__title">{g}</p>
            <ul>
              {groupItems(g).map((c) => (
                <li key={c.slug}>
                  <a href={`#/components/${c.slug}`} aria-current={c.slug === slug ? "page" : undefined}>
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <article className="component-page">
        <p className="docs-eyebrow">{doc.group}</p>
        <h1 className="docs-h1">{doc.name}</h1>
        <p className="docs-lead">{doc.summary}</p>

        <h2 className="docs-h2">Example</h2>
        <div className="preview-surface">{doc.preview}</div>

        <h2 className="docs-h2">Code</h2>
        <CodeBlock code={doc.usage} label="TSX" />

        {doc.notes.length > 0 && (
          <>
            <h2 className="docs-h2">Notes</h2>
            <ul className="points">
              {doc.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </>
        )}

        <nav className="pager" aria-label="Previous and next component">
          {prev ? (
            <a href={`#/components/${prev.slug}`} className="pager__link">
              <span className="pager__hint">Previous</span>
              {prev.name}
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a href={`#/components/${next.slug}`} className="pager__link pager__link--next">
              <span className="pager__hint">Next</span>
              {next.name}
            </a>
          ) : (
            <span />
          )}
        </nav>
        <p className="docs-note">
          Keyboard: <Kbd>Tab</Kbd> moves focus, <Kbd>Enter</Kbd> or <Kbd>Space</Kbd> activates. Props are typed in the package.
        </p>
      </article>
    </div>
  );
}
