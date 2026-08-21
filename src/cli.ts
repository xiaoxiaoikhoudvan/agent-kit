#!/usr/bin/env node

import { Command } from "commander";
import { checkbox, confirm } from "@inquirer/prompts";
import { access, cp, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const program = new Command();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJson = createRequire(import.meta.url)("../package.json") as {
  version: string;
};

const AVAILABLE_SKILLS = [
  {
    name: "minimal-code-change",
    value: "minimal-code-change",
  },
];

async function exists(targetPath: string): Promise<boolean> {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function installAgentsFile(
  templatesDir: string,
  cwd: string,
): Promise<void> {
  const source = path.join(templatesDir, "AGENTS.md");
  const target = path.join(cwd, "AGENTS.md");

  if (await exists(target)) {
    console.log("- AGENTS.md skipped (already exists)");
    return;
  }

  await cp(source, target);

  console.log("✓ AGENTS.md installed");
}

async function installSkill(
  templatesDir: string,
  skillsTargetDir: string,
  skillName: string,
): Promise<void> {
  const source = path.join(templatesDir, "skills", skillName);

  const target = path.join(skillsTargetDir, skillName);

  if (await exists(target)) {
    console.log(`- ${skillName} skipped (already exists)`);
    return;
  }

  await cp(source, target, {
    recursive: true,
  });

  console.log(`✓ ${skillName} installed`);
}

async function init(): Promise<void> {
  const cwd = process.cwd();

  const templatesDir = path.resolve(__dirname, "../templates");

  const skillsTargetDir = path.join(cwd, ".agents", "skills");

  const installAgents = await confirm({
    message: "Install AGENTS.md?",
    default: true,
  });
  const selectedSkills = await checkbox({
    message: "Select skills to install",
    choices: AVAILABLE_SKILLS,
    required: true,
  });

  await mkdir(skillsTargetDir, {
    recursive: true,
  });

  if (installAgents) {
    await installAgentsFile(templatesDir, cwd);
  }
  for (const skill of selectedSkills) {
    await installSkill(templatesDir, skillsTargetDir, skill);
  }

  console.log("\nAgent rules initialized.");
}

program
  .name("agent-kit")
  .description("Install shared AI agent rules and skills")
  .version(packageJson.version);

program
  .command("init")
  .description("Initialize agent rules in the current project")
  .action(async () => {
    try {
      await init();
    } catch (error) {
      console.error("Failed to initialize agent rules.");
      console.error(error);

      process.exitCode = 1;
    }
  });

program.parse();
