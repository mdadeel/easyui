import { useMemo, useState, type ReactNode } from "react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Checkbox,
  EasyUIProvider,
  Field,
  Input,
  Link,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Separator,
  ToastProvider,
  toast,
} from "@easyui/react";

/* ------------------------------------------------------------------ data */

const SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "members", label: "Members" },
  { id: "billing", label: "Billing" },
  { id: "settings", label: "Settings" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

type Project = {
  name: string;
  owner: string;
  status: "Shipping" | "In review" | "Draft" | "Blocked";
  updated: string;
  updatedRank: number;
  members: number;
};

const PROJECTS: Project[] = [
  { name: "Checkout redesign", owner: "Maya Rahman", status: "Shipping", updated: "2 hours ago", updatedRank: 1, members: 6 },
  { name: "Mobile onboarding", owner: "Tanvir Hasan", status: "In review", updated: "Yesterday", updatedRank: 2, members: 4 },
  { name: "Pricing experiments", owner: "Ayesha Siddika", status: "Draft", updated: "3 days ago", updatedRank: 4, members: 2 },
  { name: "Support macros", owner: "Rafi Ahmed", status: "Shipping", updated: "Last week", updatedRank: 6, members: 3 },
  { name: "Invoice exports", owner: "Nusrat Jahan", status: "Blocked", updated: "Last week", updatedRank: 7, members: 5 },
  { name: "Driver app sign-in", owner: "Sabbir Khan", status: "In review", updated: "5 days ago", updatedRank: 5, members: 7 },
];

const STATUS_VARIANT: Record<Project["status"], "accent" | "neutral" | "outline" | "danger"> = {
  Shipping: "accent",
  "In review": "neutral",
  Draft: "outline",
  Blocked: "danger",
};

/* ----------------------------------------------------------- app shell */

/**
 * Sidebar on wide screens. Below 900px it becomes a left sheet opened from the
 * header, so the content gets the full width on phones.
 */
function NavList({ active, onSelect }: { active: SectionId; onSelect: (id: SectionId) => void }) {
  return (
    <nav aria-label="Workspace" className="nav">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          className="nav__item"
          aria-current={active === s.id ? "page" : undefined}
          onClick={() => onSelect(s.id)}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}

function AppShell({
  active,
  onSelect,
  children,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  children: ReactNode;
}) {
  const label = SECTIONS.find((s) => s.id === active)?.label ?? "";
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="shell">
      <header className="shell__header">
        <div className="shell__start">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="sm" className="shell__menu" aria-label="Open navigation">
                  Menu
                </Button>
              }
            />
            <SheetContent side="left" className="shell__sheet">
              <SheetTitle>Northwind</SheetTitle>
              <SheetDescription>Choose a section.</SheetDescription>
              <NavList
                active={active}
                onSelect={(id) => {
                  onSelect(id);
                  setMenuOpen(false);
                }}
              />
            </SheetContent>
          </Sheet>
          <span className="shell__brand">Northwind</span>
        </div>
        <Avatar size="sm">
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
      </header>

      <div className="shell__body">
        <aside className="shell__sidebar" aria-label="Sections">
          <NavList active={active} onSelect={onSelect} />
        </aside>
        <main className="shell__main" id="main">
          <p className="shell__crumb">Northwind / {label}</p>
          {children}
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- table */

type SortKey = "name" | "updated";

function ProjectsPanel({ loading }: { loading: boolean }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("updated");
  const [descending, setDescending] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 4;

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = PROJECTS.filter(
      (p) => !q || p.name.toLowerCase().includes(q) || p.owner.toLowerCase().includes(q),
    );
    const sorted = [...filtered].sort((a, b) => {
      const diff =
        sortKey === "name" ? a.name.localeCompare(b.name) : a.updatedRank - b.updatedRank;
      return descending ? -diff : diff;
    });
    return sorted;
  }, [query, sortKey, descending]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pageCount - 1);
  const visible = rows.slice(current * pageSize, current * pageSize + pageSize);

  function sortBy(key: SortKey) {
    if (key === sortKey) setDescending((d) => !d);
    else {
      setSortKey(key);
      setDescending(false);
    }
  }

  const ariaSort = (key: SortKey) =>
    sortKey === key ? (descending ? "descending" : "ascending") : "none";

  return (
    <section className="panel" aria-labelledby="projects-title" aria-busy={loading || undefined}>
      <div className="panel__head">
        <div>
          <h2 id="projects-title" className="panel__title">All projects</h2>
          <p className="panel__meta">{rows.length} of {PROJECTS.length} shown</p>
        </div>
        <Button size="sm" onClick={() => toast({ title: "New project", description: "Give it a name to start." })}>
          New project
        </Button>
      </div>

      <Field label="Search projects" className="panel__search">
        <Input
          type="search"
          placeholder="Name or owner"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
        />
      </Field>

      {loading ? (
        <div className="panel__loading" role="status">
          <span className="sr-only">Loading projects</span>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="skeleton-row">
              <Skeleton style={{ width: "40%" }} />
              <Skeleton style={{ width: "25%" }} />
            </div>
          ))}
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          title="No projects match"
          description="Try a different name or owner, or clear the search."
          action={<Button variant="secondary" size="sm" onClick={() => setQuery("")}>Clear search</Button>}
        />
      ) : (
        <>
          <table className="data">
            <caption className="sr-only">Projects, sortable by name or last update</caption>
            <thead>
              <tr>
                <th scope="col" aria-sort={ariaSort("name")}>
                  <button type="button" className="data__sort" onClick={() => sortBy("name")}>
                    Name
                  </button>
                </th>
                <th scope="col">Owner</th>
                <th scope="col">Status</th>
                <th scope="col" aria-sort={ariaSort("updated")}>
                  <button type="button" className="data__sort" onClick={() => sortBy("updated")}>
                    Updated
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p.name}>
                  <td data-label="Name" className="data__name">
                    {p.name}
                    <span className="data__sub">{p.members} members</span>
                  </td>
                  <td data-label="Owner">{p.owner}</td>
                  <td data-label="Status">
                    <Badge variant={STATUS_VARIANT[p.status]}>{p.status}</Badge>
                  </td>
                  <td data-label="Updated">{p.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pager">
            <span className="pager__status" aria-live="polite">
              Page {current + 1} of {pageCount}
            </span>
            <div className="pager__buttons">
              <Button
                variant="secondary"
                size="sm"
                disabled={current === 0}
                onClick={() => setPage(current - 1)}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={current >= pageCount - 1}
                onClick={() => setPage(current + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

/* ---------------------------------------------------------- feedback */

function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty">
      <h3 className="empty__title">{title}</h3>
      <p className="empty__text">{description}</p>
      {action}
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="empty" role="alert">
      <p className="eyebrow">Error 503</p>
      <h2 className="empty__title">We could not load billing</h2>
      <p className="empty__text">
        The billing service is slow to respond. Your data is safe. Try again in a moment, or check the status page.
      </p>
      <div className="row">
        <Button onClick={onRetry}>Try again</Button>
        <Link href="#">Status page</Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- forms */

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const emailError =
    submitted && !/^\S+@\S+\.\S+$/.test(email) ? "Enter an email like name@company.com." : undefined;
  const passwordError = submitted && password.length < 8 ? "Use at least 8 characters." : undefined;

  return (
    <form
      className="login"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!emailError && !passwordError) {
          toast({ title: "Signed in", description: "Welcome back to Northwind.", type: "success" });
        }
      }}
    >
      <div className="login__head">
        <h2 className="panel__title">Sign in to Northwind</h2>
        <p className="panel__meta">
          New here? <Link href="#">Create an account</Link>
        </p>
      </div>

      <Field label="Work email" error={emailError}>
        <Input
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="maya@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>

      <Field label="Password" error={passwordError}>
        <Input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>

      <div className="login__row">
        <Checkbox label="Keep me signed in" checked={remember} onCheckedChange={setRemember} />
        <Link href="#" underline="hover">Forgot password?</Link>
      </div>

      <Button type="submit" fullWidth>Sign in</Button>
      <Separator />
      <p className="panel__meta">Single sign-on is available on the Business plan.</p>
    </form>
  );
}

/* --------------------------------------------------------------- page */

export function BlocksPage() {
  const [section, setSection] = useState<SectionId>("projects");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  function refresh() {
    setLoading(true);
    setFailed(false);
    window.setTimeout(() => setLoading(false), 900);
  }

  return (
    <EasyUIProvider className="blocks-root">
      <ToastProvider>
        <AppShell active={section} onSelect={setSection}>
          {section === "projects" && (
            <>
              <div className="shell__title-row">
                <h1 className="shell__title">Projects</h1>
                <Button variant="secondary" size="sm" onClick={refresh} disabled={loading}>
                  {loading ? "Refreshing" : "Refresh"}
                </Button>
              </div>
              <ProjectsPanel loading={loading} />
            </>
          )}

          {section === "members" && (
            <EmptyState
              title="Invite your first teammate"
              description="Members see the projects they are added to. You can change roles at any time."
              action={<Button size="sm">Invite member</Button>}
            />
          )}

          {section === "billing" &&
            (failed ? (
              <ErrorState onRetry={refresh} />
            ) : (
              <section className="panel">
                <h2 className="panel__title">Billing</h2>
                <p className="panel__meta">Pro plan, billed monthly. Next invoice on 1 November.</p>
                <Button variant="secondary" size="sm" onClick={() => setFailed(true)}>
                  Simulate a failed load
                </Button>
              </section>
            ))}

          {section === "settings" && (
            <div className="grid-2">
              <LoginForm />
            </div>
          )}
        </AppShell>
      </ToastProvider>
    </EasyUIProvider>
  );
}
