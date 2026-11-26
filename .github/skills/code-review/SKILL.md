
---
name: code-review
description: Provides a reusable code review workflow for Angular and TypeScript code, including bugs, security, maintainability, performance and test coverage.
user-invocable: true
---

# Code Review Workflow

Use this workflow whenever a code review is requested.

## Step 1: Identify Changes

- Identify currently modified files.
- Check Git changes and the relevant diff.
- Understand the purpose of the changes.

## Step 2: Review Functionality

- Look for functional bugs.
- Identify potential regressions.
- Check edge cases and error handling.
- Verify that existing functionality is preserved.

## Step 3: Review Code Quality

- Check Angular and TypeScript best practices.
- Identify unnecessary use of `any`.
- Check component and service responsibilities.
- Look for duplicate or unnecessarily complex code.
- Identify potential memory leaks and subscription issues.

## Step 4: Review Security and Performance

- Look for common security weaknesses.
- Check for unnecessary processing or performance concerns.
- Identify unsafe handling of user input or sensitive data.

## Step 5: Review Tests

- Identify missing unit tests.
- Check whether existing tests cover important scenarios.
- Suggest additional test cases where necessary.

## Step 6: Prepare Review Report

Group findings using these severity levels:

- Critical: Serious issue requiring immediate attention.
- High: Significant bug, security or functional concern.
- Medium: Maintainability, performance or test coverage concern.
- Low: Minor improvement.

For every finding, include:

- Severity
- File and line number, where available
- Description of the issue
- Why it matters
- Recommended fix

Finish with an overall review summary.

## Review Guidelines

- Focus on actual problems, not personal coding preferences.
- Avoid unnecessary style-related comments.
- Do not assume an issue without sufficient evidence.
- Do not modify files or automatically apply fixes.
- If no significant issues are found, explicitly state that.
