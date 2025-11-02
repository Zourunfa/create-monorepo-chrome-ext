# Create Monorepo Chrome Extension

A CLI tool to scaffold monorepo-based Chrome extensions with Vue/React support in JavaScript/TypeScript.

## Features

- 🎯 **Monorepo Architecture**: Each Chrome extension entry point (popup, content-script, background, options) as a separate package
- ⚡ **Multiple Frameworks**: Support for Vue and React
- 📝 **Language Options**: JavaScript or TypeScript
- 🔧 **Modern Tooling**: Vite for fast development and building
- 📦 **PNPM Workspaces**: Efficient dependency management

## Usage

```bash
npm create monorepo-chrome-ext@latest my-extension
# or
pnpm create monorepo-chrome-ext my-extension
# or
yarn create monorepo-chrome-ext my-extension
```

Then follow the prompts!

## Project Structure

```
my-extension/
├── packages/
│   ├── popup/          # Extension popup UI
│   ├── content-script/ # Content script injected into pages
│   ├── background/     # Background service worker
│   ├── options/        # Options page
│   └── shared/         # Shared utilities and types
├── public/             # Static assets and manifest
├── pnpm-workspace.yaml
└── package.json
```

## Development

```bash
cd my-extension
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

The built extension will be in the `dist` folder, ready to load into Chrome.

## License

MIT
