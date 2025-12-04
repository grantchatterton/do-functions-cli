# DigitalOcean Functions CLI

**Last Updated:** December 4, 2025

## Overview

This is a CLI tool for managing DigitalOcean Serverless Functions. It streamlines the creation of new function packages with support for multiple languages (JavaScript, TypeScript) and handles dependency installation and project configuration.

**Current Version:** 1.4.0

## Project Architecture

### Tech Stack
- **Language:** TypeScript (Node.js 20.12.0+)
- **CLI Framework:** Commander.js
- **Interactive Prompts:** @inquirer/prompts
- **File Operations:** fs-extra
- **Configuration:** YAML for DigitalOcean project files
- **Validation:** Zod schemas

### Directory Structure
```
src/
  commands/      - CLI commands (create, etc.)
  schemas/       - Zod validation schemas
  utils/         - Utility functions and validators
  cli.ts         - Main CLI entry point
templates/
  functions/     - Template files for different languages
dist/            - Compiled TypeScript output (gitignored)
```

## Features

1. **Create Command** - Interactive wizard to create new serverless functions
2. **Multi-language Support** - JavaScript and TypeScript templates
3. **Auto-install Dependencies** - Optional dependency installation for generated packages
4. **Project.yml Management** - Automatic updates to root project configuration

## Development

### Build Process
```bash
npm run build      # Compile TypeScript
npm run watch      # Watch mode for development
npm run format     # Format code with Prettier
```

### Testing the CLI
The CLI Tool workflow runs `node dist/cli.js --help` to verify the build is working.

### Usage
```bash
# Show help
node dist/cli.js --help

# Create a new function (interactive)
node dist/cli.js create
```

## Roadmap

- Non-interactive flags for commands
- Additional commands: `validate`, `deploy`, etc.
- Planned flags: `--function`, `--language`, `--install`, `--add-project`, `--dry-run`, `--verbose`

## Recent Changes

- **December 4, 2025:** npm SEO optimization and Node.js compatibility verification
  - Added description, homepage, bugs, and engines fields to package.json
  - Expanded keywords from 8 to 15 for better npm discoverability
  - Verified dependency compatibility - requires Node.js 20.12.0+ (not Node 18)
  - Updated README.md and package.json to reflect correct Node version requirement

- **December 4, 2025:** Completed project import to Replit
  - Reinstalled all npm dependencies
  - Successfully built TypeScript project
  - Verified CLI Tool workflow is working correctly
  - Project is ready for development and use

- **December 1, 2025:** Initial Replit setup
  - Installed all dependencies
  - Built TypeScript project successfully
  - Configured CLI Tool workflow for testing
