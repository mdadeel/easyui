import { Highlight, themes } from "prism-react-renderer";

/** Render the exact source text, including empty lines, with accessible plain-text tokens. */
export default function CodeViewer({ code, title }: { code: string; title: string }) {
  return <Highlight theme={themes.nightOwl} code={code} language="tsx">{({ tokens, getLineProps, getTokenProps }) =>
    <pre className="component-modal__code" tabIndex={0} aria-label={`${title} example source`}><code>{tokens.map((line, i) =>
      <span key={i} {...getLineProps({ line })}>{line.map((token, j) => token.empty ? null : <span key={j} {...getTokenProps({ token })} />)}{i < tokens.length - 1 ? "\n" : null}</span>,
    )}</code></pre>
  }</Highlight>;
}
