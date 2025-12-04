#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs-extra/esm';

import createCommand from './commands/create.js';

const packageJson = await fs.readJSON(new URL('../package.json', import.meta.url));

// Initialize the main CLI program
const program = new Command();
program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

// Register the 'create' command for creating new serverless functions
program.addCommand(createCommand);

// Parse command-line arguments and execute
program.parse(process.argv);

/**
 * Handle uncaught exceptions globally.
 *
 * ExitPromptError is thrown when a user cancels an interactive prompt.
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
