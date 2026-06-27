import { useState } from "react";
import { Link } from "react-router-dom";

const CodeBlock = ({ code, lang = "bash" }: { code: string; lang?: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 dark:bg-gray-800 border-b border-gray-800 dark:border-gray-700">
        <span className="text-xs text-gray-500 font-mono">{lang}</span>
        <button onClick={copy} className="text-xs text-gray-400 hover:text-gray-100 px-2 py-0.5 rounded hover:bg-gray-700 transition-colors">{copied ? "✓ Copied" : "Copy"}</button>
      </div>
      <pre className="p-4 bg-gray-950 overflow-x-auto"><code className="text-sm text-gray-100 font-mono leading-relaxed">{code}</code></pre>
    </div>
  );
};

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-5">
    <div className="flex flex-col items-center">
      <div className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm shrink-0">{n}</div>
      <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-2" />
    </div>
    <div className="pb-10">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-1.5">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  </div>
);

export const GettingStartedPage = () => (
  <div className="max-w-3xl mx-auto py-6">
    <div className="mb-10">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">Getting Started</h1>
      <p className="text-lg text-gray-500 dark:text-gray-400">Get @aryanjain/ui up and running in your Next.js or React project in minutes.</p>
    </div>

    {/* Prerequisites */}
    <div className="mb-10 p-5 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
      <p className="font-semibold text-amber-800 dark:text-amber-400 mb-2">Prerequisites</p>
      <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 list-disc list-inside">
        <li>React 18+ or Next.js 13+</li>
        <li>Tailwind CSS 3.4+</li>
        <li>TypeScript 5+ (recommended)</li>
      </ul>
    </div>

    {/* Steps */}
    <div>
      <Step n={1} title="Install the package">
        <CodeBlock code="npm install @aryanjain/ui" lang="bash" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Or using yarn / pnpm:</p>
        <CodeBlock code="yarn add @aryanjain/ui\n# or\npnpm add @aryanjain/ui" lang="bash" />
      </Step>

      <Step n={2} title="Configure Tailwind CSS">
        <p className="text-sm text-gray-600 dark:text-gray-400">Add the library to your Tailwind content paths so its classes aren't purged:</p>
        <CodeBlock lang="js" code={`// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    // ↓ Required: scan the library's output
    "./node_modules/@aryanjain/ui/dist/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // Optional: share design tokens from the library
      colors: {
        brand: {
          50: "#eff6ff",
          // ... (copy from library's tailwind.config.js)
        },
      },
    },
  },
  plugins: [],
};`} />
      </Step>

      <Step n={3} title="Import the CSS">
        <p className="text-sm text-gray-600 dark:text-gray-400">Add the global styles to your app entry (Next.js: <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">app/layout.tsx</code> or <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">pages/_app.tsx</code>):</p>
        <CodeBlock lang="tsx" code={`import "@aryanjain/ui/dist/styles.css";`} />
      </Step>

      <Step n={4} title="Start using components">
        <p className="text-sm text-gray-600 dark:text-gray-400">Import any component from the package and use it in your project:</p>
        <CodeBlock lang="tsx" code={`import { Button, Input, Card, Badge, Toast, ToastProvider } from "@aryanjain/ui";

export default function MyPage() {
  return (
    <Card shadow>
      <Badge variant="success" dot>Live</Badge>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary" fullWidth label="Submit" />
    </Card>
  );
}`} />
      </Step>

      <Step n={5} title="Set up Toast notifications (optional)">
        <p className="text-sm text-gray-600 dark:text-gray-400">Wrap your app with <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">ToastProvider</code> to enable the <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">useToast</code> hook anywhere:</p>
        <CodeBlock lang="tsx" code={`// app/layout.tsx
import { ToastProvider } from "@aryanjain/ui";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider position="top-right">
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

// Any component
import { useToast } from "@aryanjain/ui";

function SaveButton() {
  const { toast } = useToast();
  return (
    <Button
      label="Save"
      onClick={() => toast({ message: "Saved!", variant: "success" })}
    />
  );
}`} />
      </Step>
    </div>

    {/* TypeScript note */}
    <div className="mt-4 p-5 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30">
      <p className="font-semibold text-brand-800 dark:text-brand-400 mb-2">TypeScript Support</p>
      <p className="text-sm text-brand-700 dark:text-brand-300">All component props are fully typed. Every variant, size, color, and callback is exported as a named type:</p>
      <div className="mt-3">
        <CodeBlock lang="tsx" code={`import type { ButtonVariant, AvatarSize, ToastVariant } from "@aryanjain/ui";

const myVariant: ButtonVariant = "primary";
const mySize: AvatarSize = "lg";`} />
      </div>
    </div>

    {/* Next steps */}
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Next Steps</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { to: "/components/button", icon: "🔘", title: "Button", desc: "Start with the most-used component." },
          { to: "/components/data-table", icon: "📊", title: "DataTable", desc: "Sortable, paginated, selectable table." },
          { to: "/components/aurora-background", icon: "✨", title: "Aurora", desc: "Animated hero backgrounds." },
        ].map(item => (
          <Link
            key={item.to}
            to={item.to}
            className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-brand-400 dark:hover:border-brand-600 hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{item.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
