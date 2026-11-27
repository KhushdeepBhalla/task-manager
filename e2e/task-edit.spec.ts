import { expect, test } from '@playwright/test';

test('creates a task, edits it, and retains the saved values', async ({ page }) => {
  await page.goto('/tasks');

  await page.getByRole('link', { name: /new task/i }).click();
  await expect(page).toHaveURL(/\/tasks\/new$/);
  await expect(page.getByRole('heading', { name: 'New task' })).toBeVisible();
  await page.getByLabel(/^Title/).pressSequentially('E2E task to edit', { delay: 35 });
  await page
    .getByLabel(/^Description$/)
    .pressSequentially('Created by the Playwright E2E test', { delay: 35 });
  await page.getByLabel(/^Due date/).fill('2099-12-31');
  await page.getByRole('button', { name: 'Create task' }).click();

  const taskRow = page.getByRole('row', { name: /E2E task to edit/ });
  await expect(taskRow).toContainText('Created by the Playwright E2E test');
  await taskRow.getByRole('link', { name: /edit/i }).click();
  await expect(page).toHaveURL(/\/tasks\/[^/]+\/edit$/);
  await expect(page.getByRole('heading', { name: 'Edit task' })).toBeVisible();

  const updatedTitle = 'E2E task updated';
  const updatedDescription = 'Updated by the Playwright E2E test';
  const titleField = page.getByLabel(/^Title/);
  const descriptionField = page.getByLabel(/^Description$/);
  await titleField.press('Control+A');
  await titleField.pressSequentially(updatedTitle, { delay: 35 });
  await descriptionField.press('Control+A');
  await descriptionField.pressSequentially(updatedDescription, { delay: 35 });
  await expect(titleField).toHaveValue(updatedTitle);
  await expect(descriptionField).toHaveValue(updatedDescription);
  await page.getByRole('button', { name: 'Save changes' }).click();

  const updatedTaskRow = page.getByRole('row', { name: new RegExp(updatedTitle) });
  await expect(updatedTaskRow).toContainText(updatedDescription);
  await updatedTaskRow.getByRole('link', { name: /edit/i }).click();
  await expect(page.getByRole('heading', { name: 'Edit task' })).toBeVisible();

  await expect(page.getByLabel(/^Title/)).toHaveValue(updatedTitle);
  await expect(page.getByLabel(/^Description$/)).toHaveValue(updatedDescription);
});
