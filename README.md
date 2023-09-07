# NEXTJS-APP-ROUTER-BOILERPLATE

Welcome to our all-in-one Next.js project with app router!

## Features

- ⚡ [Next.js](https://nextjs.org) with App Router support
- 🔥 Type checking [TypeScript](https://www.typescriptlang.org)
- 💎 Integrate with [Tailwind CSS](https://tailwindcss.com)
- 🧰 Statem management with [Valtio](https://valtio.pmnd.rs/) and [React Query](https://tanstack.com/query/latest/)
- ✅ Strict Mode for TypeScript and React 18
- 📏 Linter with [ESLint](https://eslint.org) (default NextJS, NextJS Core Web Vitals, Tailwind CSS
- 💖 Code Formatter with [Prettier](https://prettier.io)
- 🦊 Husky for Git Hooks
- 🚫 Lint-staged for running linters on Git staged files
- 🚓 Lint git commit with Commitlint
- 🧪 E2E Testing with [Playwright](https://playwright.dev/)
- 🎁 Automatic changelog generation with Semantic Release
- 💡 Absolute Imports using `@` prefix
- 🗂 VSCode configuration: Debug, Settings, Tasks and extension for PostCSS, ESLint, Prettier, TypeScript, Jest
- 🤖 SEO metadata with Next generateMetadata
- ⚙️ [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- 💯 Maximize lighthouse score

## Requirements
 - Node.js 18.17.1 and pnpm

## Getting started

To install the dependencies, run the following command:

```bash
pnpm install
```

## Local Configuration

Before starting the development server, make sure to add the local configuration file `.env.local` with the following content:

```plaintext
# GENERATE_SOURCEMAP=false
NEXT_PUBLIC_VERSION=$npm_package_version
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_ENV_NAME=local
```

## Start Development Server

To start the development server, use the following command:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. You can edit the pages by modifying the corresponding files in the `pages` directory. The changes will be automatically updated in the browser.

## Start Production Server

To start the production server, follow these steps:

```bash
pnpm build
pnpm start
```

## Run Playwright testings

```bash
pnpm test
```

## Bundle Analyzer

To analyze the bundle size, run the following command:

```plaintext
ANALYZE=true pnpm build
```

## Docker Commands

To build and run the application using Docker, you can use the following commands:

For local environment:

```plaintext
docker-compose -f docker-compose.local.yml build
docker-compose -f docker-compose.local.yml up
```

For development environment:

```plaintext
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
```

For staging environment:

```plaintext
docker-compose -f docker-compose.stage.yml build
docker-compose -f docker-compose.stage.yml up
```

# VSCode Developer Setup

To get started with development in Visual Studio Code, open the workspace file named `nextjs-app-router-boilerplate.code-workspace`.

We recommend installing the following extensions for a better development experience:

- [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Tabnine AI Autocomplete](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Console Ninja](https://console-ninja.com/)

For Console Ninja, add the following settings to your `settings.json` file in VSCode:

```json
{
  "console-ninja.toolsToEnableSupportAutomaticallyFor": {
    "live-server-extension": true,
    "live-preview-extension": true
  },
  "console-ninja.allowedHosts": ["localhost:3000", "localhost"]
}
```

## Project Structure

Here's an overview of the project structure:

```plaintext
- public
  - assets
- src
  - app
  - components
    - layout
  - hooks
  - model
  - services
  - styles
  - script
  - config
  - utils
  - store
```

## Development Rules

### File Naming

- Use camel case for file names.

### Creating New Pages

To create a new page, follow this structure:

```
📁 nextjs-app-router-boilerplate
    📁 app
        💾 page.tsx
        💾 globals.css
        💾 _error.tsx 
        💾 index.tsx
        💾 about.tsx
        📁 <= place new page files here
```

### Images

**Note: Avoid using next/image as it consumes server CPU usage. If necessary, set up an image loader like img proxy.**

**Note: Avoid excessive DOM size.**

## I18n with next-intl

For internationalization (i18n), we use the `next-intl` package. It provides comprehensive support for localization in Next.js applications.

### Tailwind CSS

We use Tailwind CSS for styling. Here are some useful features:

- [Responsive design](https://tailwindcss.com/docs/responsive-design): Use breakpoint prefixes such as `mobile`, `tablet`, and `desktop` to apply styles based on different screen sizes.
- [Arbitrary values](https://tailwindcss.com/docs/adding-custom-styles): Customize your classes with arbitrary values.
- [Changing opacity](https://tailwindcss.com/docs/ring-color#changing-the-opacity): Adjust the opacity of elements.

### SEO

We recommend using the Next.js [generate-metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).