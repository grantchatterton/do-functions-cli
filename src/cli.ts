#!/usr/bin/env node
import { Command } from 'commander';
import createCommand from './commands/create.js';
import fs from 'fs-extra/esm';

const packageJson = await fs.readJSON(new URL('../package.json', import.meta.url));
const cliVersion = packageJson.version;

// Initialize the main CLI program
const program = new Command();
program
  .name('do-functions-cli')
  .description('CLI tool for managing DigitalOcean serverless functions')
  .version(cliVersion);

// Register the 'create' command for creating new serverless functions
program.addCommand(createCommand);

// Parse command-line arguments and execute
program.parse(process.argv);

/**
 * Handle uncaught exceptions globally.
 *
 * ExitPromptError is thrown when a user cancels an interactive prompt,
 * so we handle it gracefully. Other errors are re-thrown for proper error reporting.
 */
process.on('uncaughtException', (error) => {
  if (error instanceof Error && error.name === 'ExitPromptError') {
    console.log('👋 until next time!');
    process.exit(0);
  } else {
    console.error(error);
    process.exit(1);
  }
});
