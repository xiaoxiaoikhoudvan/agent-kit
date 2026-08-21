# Codex Project Instructions

## Mandatory code modification workflow

For every task that modifies existing code, you MUST apply the `minimal-code-change` skill before editing.

This applies to:

- bug fixes
- feature changes
- UI changes
- API changes
- refactoring
- performance optimizations
- code cleanup

Before editing code:

1. Inspect the relevant existing implementation.
2. Identify the actual cause or exact requirement.
3. Determine the smallest correct change.
4. Preserve existing architecture, contracts, conventions, and behavior.
5. Apply the `minimal-code-change` skill.
6. Then modify the code.

Do NOT add speculative defensive logic, fallback behavior, compatibility branches, extra abstractions, or unrelated refactoring.

Uncertainty is not justification for adding code. Investigate the repository first.

## Scope control

Only modify files and code necessary for the explicit task.

Do not perform unrelated cleanup, refactoring, renaming, reformatting, or modernization.

## Root cause first

Fix the actual cause of the problem rather than masking symptoms with guards, fallback values, retries, timers, or extra state.

## Repository-first reasoning

For questions about existing behavior, inspect the repository before making assumptions.

Do not guess API shapes, business rules, data structures, or existing behavior when the repository can provide the answer.

After editing, review the diff and remove anything that is not necessary for the requested behavior.
