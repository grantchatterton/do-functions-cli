import type { FunctionTemplate } from '../schemas/functionTemplate.js';

/**
 * Service class for managing function templates.
 * Provides methods to retrieve and manage available function templates.
 */
class FunctionTemplateService {
  /** Array to store available function templates */
  private templates: FunctionTemplate[] = [
    {
      name: 'JavaScript',
      dirName: 'javascript',
      runtime: 'nodejs:18',
    },
    {
      name: 'TypeScript',
      dirName: 'typescript',
      runtime: 'nodejs:18',
    },
  ];

  /** Retrieves all available function templates */
  getTemplates(): FunctionTemplate[] {
    return this.templates.map((template) => ({ ...template }));
  }

  /** Retrieves the default function template */
  getDefaultTemplate(): FunctionTemplate {
    return { ...this.templates[0]! };
  }

  /** Retrieves a function template by its directory name */
  getTemplateByDirName(dirName: string): FunctionTemplate | undefined {
    const template = this.templates.find((template) => template.dirName === dirName);
    return template ? { ...template } : undefined;
  }

  /** Adds a new function template to the list */
  addTemplate(template: FunctionTemplate): void {
    this.templates.push({ ...template });
  }
}

/** Singleton instance for managing function templates */
export const functionTemplateService = new FunctionTemplateService();
