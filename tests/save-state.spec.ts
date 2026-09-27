import { test, expect } from '@playwright/test';

test('TC-PER-01 Active Filter @smoke', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    // Добавить 2 задачи, отметить 1, перезагрузить страницу
    const TODO_ITEMS = ['buy some cheese', 'book a doctors appointment'];

    const inputTask = page.getByPlaceholder('What needs to be done?');

    for (const value of TODO_ITEMS) {
        await inputTask.fill(value);
        await inputTask.press('Enter');
    }

    const task = page.getByTestId('todo-item');
    const completedTask = TODO_ITEMS[1];
    await task.filter({ hasText: completedTask }).getByRole('checkbox', { name: 'Toggle Todo' }).click();
    
    await page.goto('https://demo.playwright.dev/todomvc');

    // Обе задачи на месте, статусы сохранены
    const taskReloadPage = page.getByTestId('todo-item');
    await expect(task).toHaveCount(TODO_ITEMS.length);
    await expect(task.getByTestId('todo-title')).toHaveText(TODO_ITEMS);

    await expect(task.filter({ hasText: completedTask })).toHaveClass('completed');
    for (const li of await task.filter({ hasNotText: completedTask }).all())
        await expect(li).not.toHaveClass('completed');

});

