export function PreferenceScript() {
  const script = `
    (() => {
      const root = document.documentElement;
      const body = document.body;
      const storedTheme = window.localStorage.getItem("tiny-link-theme") || "light";
      const storedReadMode = window.localStorage.getItem("tiny-link-read-mode") || "off";
      root.dataset.theme = storedTheme;
      root.dataset.readMode = storedReadMode;
      body.dataset.readMode = storedReadMode;
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
