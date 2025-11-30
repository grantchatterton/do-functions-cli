/**
 * Command module for creating new DigitalOcean serverless functions.
 *
 * This module provides an interactive CLI command that guides users through:
 * 1. Selecting a packages directory
 * 2. Creating a new function with package/name structure
 * 3. Choosing between different language templates
 * 4. Installing dependencies (optional)
 * 5. Adding the function to project.yml configuration (optional)
 */
import { confirm, input, select } from '@inquirer/prompts';
import { Command } from 'commander';
import fs from 'fs-extra';
import * as child_process from 'node:child_process';
import * as path from 'node:path';
import * as util from 'node:util';
import ora from 'ora';
import { scaffoldFunction, updateProjectConfig } from '../utils/util.js';
import type { LanguageChoice, UpdateStatus } from '../utils/util.js';
import { validateFunctionName } from '../utils/validators.js';

// Promisify exec to use async/await syntax
const exec = util.promisify(child_process.exec);

const createCommand = new Command('create');
createCommand
  .description('create a new serverless function')
  .option('-y, --yes', 'skip all optional prompts and use defaults')
  .option('--packages-dir <dir>', 'specify the root packages directory')
  .action(async (options) => {
    const userPackagesDir =
      options.packagesDir ||
      (await input({
        message: 'Enter the root function packages directory:',
        default: './packages',
      }));

    const userFuncPath = await input({
      message: 'Enter the package/function name to create:',
      default: 'sample/hello',
      validate: validateFunctionName,
    });

    const [pkgName, funcName] = userFuncPath.split('/') as [string, string];

    const resolvedFuncDir = path.resolve(userPackagesDir, userFuncPath);
    if (await fs.exists(resolvedFuncDir)) {
      const overwrite = await confirm({
        message: `The directory "${resolvedFuncDir}" already exists. Do you want to overwrite it?`,
        default: false,
      });
      if (!overwrite) {
        ora('Operation cancelled. No changes were made.').fail();
        return;
      }
    }

    const funcLanguage = (await select({
      message: 'Choose a language for the function:',
      choices: [
        { name: 'JavaScript', value: 'javascript' },
        { name: 'TypeScript', value: 'typescript' },
      ],
      default: 'javascript',
    })) as LanguageChoice;

    // Initialize a spinner to show progress to the user
    const spinner = ora(`Creating function '${userFuncPath}'...`).start();
    try {
      await scaffoldFunction({
        targetDir: resolvedFuncDir,
        funcPath: userFuncPath,
        funcLanguage,
      });
      spinner.succeed(`Function "${userFuncPath}" successfully created at "${resolvedFuncDir}"`);
    } catch (error) {
      spinner.fail('An error occurred while creating the function');
      throw error;
    }

    // Offer to install dependencies in the new function directory
    const installDeps =
      options.yes ||
      (await confirm({
        message: 'Do you want to install dependencies now?',
        default: true,
      }));
    if (installDeps) {
      spinner.start('Installing dependencies...');

      try {
        // Run npm install in the function directory
        await exec('npm install', { cwd: resolvedFuncDir });
        spinner.succeed('Dependencies installed successfully');
      } catch (error) {
        spinner.fail('An error occurred while installing dependencies');
        throw error;
      }
    }

    // Offer to add the new function to the project configuration file
    const addToProject =
      options.yes ||
      (await confirm({
        message: 'Do you want to add this function automatically to the project.yml config?',
        default: true,
      }));
    if (addToProject) {
      const projectYmlPath = path.resolve('project.yml');
      const createIfMissing = !(await fs.exists(projectYmlPath))
        ? options.yes ||
          (await confirm({
            message: 'A project.yml file was not found. Would you like to create one?',
            default: true,
          }))
        : true;
      if (!createIfMissing) {
        spinner.info('Skipping creating the project.yml file...');
      } else {
        spinner.start('Updating project.yml configuration...');

        const result = await updateProjectConfig(projectYmlPath, pkgName, funcName);
        const resultStatusMessageMap: Record<UpdateStatus, string> = {
          'created-new-config': `Created project.yml with package "${pkgName}" and function "${userFuncPath}"`,
          'added-package': `Added new package "${pkgName}" with function "${userFuncPath}" to project.yml`,
          'added-function': `Added function "${userFuncPath}" to existing package "${pkgName}" in project.yml`,
          'function-exists': `Function "${userFuncPath}" already exists in package "${pkgName}". Skipping update.`,
          error: 'Failed to update project.yml configuration',
        };

        const resultStatusMessage = resultStatusMessageMap[result.status];
        if (result.status === 'error') {
          spinner.fail(resultStatusMessage);
        } else if (result.status === 'function-exists') {
          spinner.info(resultStatusMessage);
        } else {
          spinner.succeed(resultStatusMessage);
        }
      }
    }
  });

// Export the create command for registration in the CLI
export default createCommand;
