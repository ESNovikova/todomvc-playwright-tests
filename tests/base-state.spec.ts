import { test, expect } from '@playwright/test';

test('TC-INIT-01 Empty list upon initial opening @smoke', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    // Заголовок «todos».
    await expect(page).toHaveTitle(/React • TodoMVC/);

    // Задач нет.
    await expect(page.getByTestId('todo-item')).toHaveCount(0);
    await expect(page.getByRole('heading')).toHaveText('todos');
    // Блоки .main и .footer скрыты
    const locator = page.locator('.main, .footer');
    await expect(locator).toBeHidden();

});