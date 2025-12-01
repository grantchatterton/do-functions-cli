# do-functions-cli

![npm version](https://img.shields.io/npm/v/do-functions-cli.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

A CLI tool to streamline working with DigitalOcean Serverless Functions.

### NOTE: This project has no affiliation with [do-functions](https://github.com/mrbrianevans/do-functions), but was heavily inspired by it. I will likely end up incorporating some of the features of that project into this one.

## Features

- Create new function packages via an interactive `create` command
- Support for multiple languages (JavaScript, TypeScript, more to come)
- Auto-install dependencies in the generated package (optional)
- Automatically update the root `project.yml` with the new package/function (optional)

## Installation

Global:

```bash
npm i -g do-functions-cli
```

Local:

```bash
npm i -D do-functions-cli
```

## Usage

Run the CLI and follow the prompts:

```bash
# Show help
npx do-functions-cli --help

# Create a new function
npx do-functions-cli create
```

## Roadmap / Ideas

- Non-interactive flags for commands (see below)
- Additional commands: `validate`, `deploy`, etc.

## Planned CLI Flags

- `--<language>`: Choose template language (e.g., `--javascript`, `--typescript`).
- `--install` / `--no-install`: Control dependency installation step.
- `--add-project` / `--no-add-project`: Control `project.yml` auto-update.
- `--dry-run`: Show intended actions without any file changes.
- `--verbose`: Print detailed logs for troubleshooting.

## Troubleshooting

- If `project.yml` parsing fails, ensure the file is valid YAML and matches the expected schema:

```yaml
packages:
  - name: sample
    functions:
      - name: hello
        runtime: nodejs:18
        web: true
  ...
```

- Ensure Node.js 18+ for best compatibility with templates and runtime.
