import { test, expect } from '@playwright/test';

test('all static routes load directly, refresh, and expose valid internal links', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const path of ['/', '/life/', '/study/', '/projects/', '/about/']) {
    expect((await page.goto(path))?.status()).toBe(200);
    await expect(page.getByRole('navigation', { name: 'Main menu' })).toBeVisible();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.locator('nav a[aria-current="page"]')).toHaveAttribute('href', path);
    expect((await page.reload())?.status()).toBe(200);
    const urls = await page.locator('a[href^="/"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')!));
    for (const url of new Set(urls)) expect((await request.get(url)).status(), url).toBe(200);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('console toggles, executes safe commands, handles history and restores focus', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'CONSOLE ~', exact: true });
  await trigger.click();
  const input = page.getByRole('textbox', { name: 'Console command' });
  await expect(input).toBeFocused();
  await input.fill('status'); await input.press('Enter');
  await expect(page.getByRole('log')).toContainText('User: Jiayuan Zhang');
  await input.fill('<img src=x onerror=alert(1)>'); await input.press('Enter');
  await expect(page.getByRole('log')).toContainText('Unknown command: <img');
  await expect(page.getByRole('log').locator('img')).toHaveCount(0);
  await input.fill('clear'); await input.press('Enter');
  await expect(page.getByRole('log')).toHaveText('');
  await input.press('ArrowUp'); await expect(input).toHaveValue('clear');
  await input.fill('help'); await input.press('Enter');
  await expect(page.getByRole('log')).toContainText('Commands:');
  await input.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Developer Console' })).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.keyboard.press('Backquote'); await expect(input).toBeVisible();
  await page.keyboard.press('Backquote'); await expect(input).toHaveCount(0);
});

test('content controls, navigation, empty states, and window close work', async ({ page }) => {
  await page.goto('/life/');
  await page.getByRole('button', { name: /网站上线/ }).click();
  await expect(page.getByRole('button', { name: 'Back to archive' })).toBeVisible();
  await page.getByRole('button', { name: 'Back to archive' }).click();
  await page.getByRole('button', { name: '照片', exact: true }).click();
  await expect(page.getByText('暂无照片记录')).toBeVisible();
  await page.getByRole('link', { name: 'STUDY', exact: true }).click();
  await page.getByRole('button', { name: '当前任务', exact: true }).click();
  await page.getByRole('checkbox').first().check();
  await expect(page.getByText('1 / 3 completed')).toBeVisible();
  await page.getByRole('link', { name: 'PROJECTS', exact: true }).click();
  await page.getByRole('button', { name: 'WIP', exact: true }).click();
  await expect(page.getByText('No wip projects')).toBeVisible();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('link', { name: 'HOME', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('unknown routes have a real 404 and a recovery link', async ({ page }) => {
  expect((await page.goto('/missing-record/'))?.status()).toBe(404);
  await expect(page.getByText('That record does not exist.')).toBeVisible();
  await page.getByRole('link', { name: 'Return to HOME' }).click();
  await expect(page).toHaveURL('/');
});

test('window title can be dragged within the desktop stage', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  await page.goto('/');
  const dialog = page.getByRole('dialog');
  const before = (await dialog.boundingBox())!;
  const handle = (await page.locator('.window-drag-handle').boundingBox())!;
  await page.mouse.move(handle.x + 100, handle.y + 10);
  await page.mouse.down(); await page.mouse.move(handle.x + 140, handle.y + 40, { steps: 6 }); await page.mouse.up();
  const after = (await dialog.boundingBox())!;
  expect(after.x).toBeGreaterThan(before.x + 10);
  expect(after.y).toBeGreaterThan(before.y + 10);
});
