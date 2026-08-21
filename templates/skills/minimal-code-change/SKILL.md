---
name: minimal-code-change
description: Enforces minimal, evidence-driven code changes and prevents unnecessary defensive programming, fallbacks, compatibility branches, speculative edge-case handling, and unrelated refactoring.
---

# Minimal Code Change

Apply this skill whenever modifying existing code.

## Core principle

Implement only what is necessary to satisfy the explicit requirement.

Prefer the simplest correct change that fits the existing codebase.

Correctness comes first. Minimalism comes second.

Do not expand the scope of the task.

## Evidence before code

Do not add logic merely because a situation might happen.

When uncertain, investigate the repository.

Check:

1. type definitions
2. API implementation
3. callers
4. tests
5. existing usages
6. database or API schemas when relevant

Do not convert uncertainty into code.

## Avoid unnecessary defensive programming

Do NOT add the following unless there is concrete evidence that it is required:

- unnecessary null checks
- unnecessary undefined checks
- fallback values
- optional chaining for values guaranteed by contract
- multiple alternative data shapes
- compatibility branches
- speculative edge-case handling
- silent failure handling
- unnecessary try/catch
- retries
- timeout logic
- redundant validation
- redundant type checks
- redundant existence checks

## Fix root causes, not symptoms

Before modifying code, identify the actual cause of the problem.

Do not add guards, retries, delays, fallback values, timers, extra state, or additional branches merely to hide incorrect behavior.

Prefer fixing the source of the problem over compensating for it downstream.

## Preserve existing contracts

Treat established contracts as authoritative unless the task explicitly requires changing them.

This includes:

- TypeScript types and interfaces
- function signatures
- component props
- API request parameters
- API response shapes
- event names
- route parameters
- database schemas
- documented business rules
- tests that represent established behavior

Do not weaken a contract merely to make new code easier to implement.
