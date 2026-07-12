// Ambient module declarations for side-effect asset imports (e.g. `import
// './globals.css'`). `next`'s own shipped types declare these too, but a
// standalone `tsc --noEmit` run (unlike `next build`, which uses its own
// program setup) can fail to pick that up depending on the environment, so
// declare it explicitly to make `pnpm typecheck` resolve reliably everywhere.
declare module '*.css'
declare module '*.scss'
declare module '*.sass'
