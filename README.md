# agent-kit

Install shared `AGENTS.md` instructions and reusable agent skills in a local
project.

## Requirements

- Node.js 20.17 or later
- npm

## Install from Git

Clone the repository and create a local command link:

```bash
git clone <repository-url>
cd agent-kit
npm install
npm link
```

`npm install` builds the CLI automatically. After linking it, run the command
from the project you want to configure:

```bash
cd /path/to/target-project
agent-kit init
```

The `init` command can install:

- `AGENTS.md` in the project root
- selected skills under `.agents/skills/`

Existing files and skill directories are left unchanged.

To use the CLI without `npm link`, run its built entry point from the target
project:

```bash
cd /path/to/target-project
node /path/to/agent-kit/dist/cli.js init
```

## Development

Run the test suite:

```bash
npm test
```

Rebuild after changing source code:

```bash
npm run build
```

Remove the global command link when it is no longer needed:

```bash
npm unlink --global agent-kit
```
