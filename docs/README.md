# @aryanjain/ui — Documentation Site

This is the documentation website for the `@aryanjain/ui` component library, living inside the same monorepo.

## Running the docs

```bash
cd docs
npm install
npm run dev      # → http://localhost:5173
```

## Building for production

```bash
npm run build    # → docs/dist/
npm run preview  # preview the production build
```

## Structure

```
docs/
├── src/
│   ├── components/       # Shared docs UI (sidebar, navbar, code preview, props table)
│   ├── data/
│   │   └── components.ts # Full registry of 105 components with props metadata
│   ├── hooks/
│   │   └── useTheme.ts   # Dark mode hook
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── GettingStartedPage.tsx
│   │   └── components/
│   │       ├── ComponentPage.tsx   # Slug router
│   │       ├── InputPages.tsx      # Input component demos
│   │       └── OtherPages.tsx      # All other demos
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
└── index.html
```

## Adding a new component demo

1. Add the component metadata to `src/data/components.ts`
2. Create a demo page in `src/pages/components/InputPages.tsx` or `OtherPages.tsx`
3. Register the page in `src/pages/components/ComponentPage.tsx`'s `PAGE_MAP`

That's it — the sidebar updates automatically from the metadata registry.
