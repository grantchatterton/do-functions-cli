# do-functions-cli

[![npm version](https://img.shields.io/npm/v/do-functions-cli.svg)](https://www.npmjs.com/package/do-functions-cli)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A CLI tool for scaffolding [DigitalOcean Serverless Functions](https://docs.digitalocean.com/products/functions/). Quickly create new functions with JavaScript or TypeScript templates, install dependencies, and automatically update your `project.yml` configuration.

> **Note:** This project is not affiliated with DigitalOcean or [do-functions](https://github.com/mrbrianevans/do-functions), but was inspired by the latter.

## Features

- **Interactive function creation** — Guided prompts walk you through creating new functions
- **JavaScript & TypeScript templates** — Choose your preferred language
- **Automatic dependency installation** — Optionally run `npm install` in the generated function directory
- **Auto-update project.yml** — Automatically add new functions to your project configuration
- **Non-interactive mode** — Use CLI flags and `--yes` for scripted workflows

## Installation

```bash
# Global installation
npm install -g do-functions-cli

# Or use directly with npx
npx do-functions-cli create
```

## Quick Start

Create a new function interactively:

```bash
do-functions-cli create
```

You'll be prompted to:

1. Enter the packages directory (default: `./packages`)
2. Enter the package/function name (e.g., `api/hello`)
3. Choose a language (JavaScript or TypeScript)
4. Install dependencies (optional)
5. Add the function to `project.yml` (optional)

## Usage

### Interactive Mode

```bash
do-functions-cli create
```

### Non-Interactive Mode

Use flags to skip prompts:

```bash
do-functions-cli create --packages-dir ./packages --func api/hello --yes
```

### CLI Options

| Option | Description |
| --- | --- |
| `--packages-dir <dir>` | Root packages directory (default: prompted, or `./packages`) |
| `-f, --func <name>` | Package/function name in `package/function` format |
| `-y, --yes` | Skip optional prompts and use defaults |
| `--help` | Show help information |
| `--version` | Show version number |

## Project Structure

After creating a function, your project will look like:

```
your-project/
├── packages/
│   └── api/                    # Package name
│       └── hello/              # Function name
│           ├── index.js        # Function entry point (or index.ts)
│           ├── package.json
│           └── .include        # DigitalOcean include file
└── project.yml                 # DigitalOcean project configuration
```

## project.yml Configuration

The CLI automatically manages your `project.yml` file:

```yaml
packages:
  - name: api
    functions:
      - name: hello
        runtime: nodejs:18
        web: true
```

## Requirements

- Node.js 18 or later
- npm or compatible package manager

## Roadmap

- Additional language templates (Python, Go)
- `validate` command for project configuration
- `deploy` command integration with DigitalOcean CLI
- Dry-run mode for previewing changes

## License

MIT
