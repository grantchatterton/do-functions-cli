import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import fs from 'fs-extra';
import YAML from 'yaml';

import type { DOFunction } from '../schemas/doFunction.js';
import { DOProjectYmlSchema } from '../schemas/doProjectYml.js';
import { functionTemplateService } from '../services/functionTemplateService.js';

/**
 * Get the template directory for a function depending on language choice.
 */
export function getTemplateDir(funcLanguage: string): string {
  return path.join(
    fileURLToPath(new URL('../../', import.meta.url)),
    'templates',
    'functions',
    funcLanguage
  );
}

export type ScaffoldOptions = {
  targetDir: string;
  funcPath: string; // package/function
  funcLanguage: string;
};

/**
 * Scaffolds a function directory by emptying target and copying template, then updating package.json name.
 */
export async function scaffoldFunction({
  targetDir,
  funcPath,
  funcLanguage,
}: ScaffoldOptions): Promise<void> {
  await fs.emptyDir(targetDir);
  const templateDir = getTemplateDir(funcLanguage);
  await fs.copy(templateDir, targetDir);

  const packageJsonPath = path.join(targetDir, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  await fs.writeJson(packageJsonPath, { name: `@${funcPath}`, ...packageJson }, { spaces: 2 });
}

export type UpdateStatus =
  | 'created-new-config'
  | 'added-package'
  | 'added-function'
  | 'function-exists'
  | 'error';

export type UpdateResult = {
  status: UpdateStatus;
};

/**
 * Update or create the project.yml configuration with the given package and function.
 * Uses early returns for clarity. Returns a status describing the performed action.
 */
export async function updateProjectConfig(
  projectYmlPath: string,
  pkgName: string,
  funcName: string,
  funcLanguage: string
): Promise<UpdateResult> {
  try {
    const funcLanguageObj = functionTemplateService.getTemplateByDirName(funcLanguage);
    if (!funcLanguageObj) {
      throw new Error(`Unsupported function language: ${funcLanguage}`);
    }

    const functionObj: DOFunction = { name: funcName, runtime: funcLanguageObj.runtime, web: true };

    const exists = await fs.exists(projectYmlPath);
    if (!exists) {
      const initial = { packages: [{ name: pkgName, functions: [functionObj] }] };
      await fs.writeFile(projectYmlPath, YAML.stringify(initial));
      return { status: 'created-new-config' };
    }

    const parsed = DOProjectYmlSchema.parse(YAML.parse(await fs.readFile(projectYmlPath, 'utf-8')));

    const pkg = parsed.packages.find((p) => p.name === pkgName);
    if (!pkg) {
      parsed.packages.push({ name: pkgName, functions: [functionObj] });
      await fs.writeFile(projectYmlPath, YAML.stringify(parsed));
      return { status: 'added-package' };
    }

    if (pkg.functions.find((f) => f.name === funcName)) {
      return { status: 'function-exists' }; // No write needed
    }

    pkg.functions.push(functionObj);
    await fs.writeFile(projectYmlPath, YAML.stringify(parsed));
    return { status: 'added-function' };
  } catch (e) {
    console.error(e);
    return { status: 'error' };
  }
}
