# Copilot Instructions for do-functions-cli

## Project Overview

This is a CLI tool for managing DigitalOcean Serverless Functions. It helps users create new function packages with support for multiple languages (JavaScript and TypeScript).

## Technology Stack

- **Language**: TypeScript (ESM modules)
- **Runtime**: Node.js 18+
- **CLI Framework**: Commander.js
- **Interactive Prompts**: @inquirer/prompts
- **Schema Validation**: Zod
- **Configuration Format**: YAML (project.yml)
- **Formatting**: Prettier

## Project Structure

```
src/
├── cli.ts              # Main CLI entry point
├── commands/           # CLI command implementations
│   └── create.ts       # Create command for new functions
├── constants.ts        # Shared constants (runtime, regex patterns)
├── schemas/            # Zod schemas for validation
│   ├── createOptions.ts
│   ├── doFunction.ts
│   ├── doPackage.ts
│   └── doProjectYml.ts
└── utils/              # Utility functions
    ├── util.ts         # Scaffolding and config utilities
    └── validators.ts   # Input validation functions
templates/
└── functions/          # Function templates
    ├── javascript/
    └── typescript/
```

## Build and Development Commands

- `npm run build` - Compile TypeScript to JavaScript (output to `dist/`)
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run watch` - Watch mode for TypeScript compilation

## Coding Conventions

### TypeScript

- Use ESM module syntax (`import`/`export`)
- File extensions must be `.js` in imports (e.g., `import { foo } from './bar.js'`)
- Use `type` imports for type-only imports: `import type { Foo } from './types.js'`
- Enable strict mode TypeScript features

### Zod Schemas

- Schema names follow the pattern `<Name>Schema` (e.g., `DOFunctionSchema`)
- Export both schema and inferred type
- Use `.optional().default()` for optional fields with defaults

Example:
```typescript
import * as z from 'zod';

export const ExampleSchema = z.object({
  name: z.string(),
  enabled: z.boolean().optional().default(true),
});

export type Example = z.infer<typeof ExampleSchema>;
```

### Formatting

- Single quotes for strings
- 2 spaces for indentation
- Trailing commas in ES5 contexts
- 100 character line width
- Semicolons required
- LF line endings

### Documentation

- Use JSDoc comments for exported functions and types
- Include `@param` and `@returns` tags where applicable

## Constants

Define shared constants in `src/constants.ts` instead of hardcoding values. Current constants:
- `DEFAULT_RUNTIME`: Default Node.js runtime for functions
- `FUNCTION_NAME_REGEX`: Validation pattern for function names

## Templates

Function templates are stored in `templates/functions/<language>/`. Each template includes:
- `.include` file for build configuration
- `index.js` or `index.ts` entry point
- `package.json` for dependencies

When adding new templates, ensure they follow DigitalOcean Functions conventions.

## Testing the CLI

Since there are no automated tests, manually test CLI changes:
```bash
npm run build
node dist/cli.js --help
node dist/cli.js create
```

Note: `packages/` and `project.yml` are gitignored for local testing.
