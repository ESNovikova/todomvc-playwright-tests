import { test, expect } from '@playwright/test';

test('TC-TOG-01 Mark the task as completed @smoke', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    // Добавить задачу, отметить чекбокс
    const inputTask = page.getByPlaceholder('What needs to be done?');

    await inputTask.fill('buy some cheese');
    await inputTask.press('Enter');

    const task = page.getByTestId('todo-item');
    await task.getByRole('checkbox', { name: 'Toggle Todo' }).click();

    // У <li> появился класс completed, чекбокс отмечен
    await expect(task).toHaveClass('completed');
    await expect(task.getByRole('checkbox', { name: 'Toggle Todo' })).toBeChecked();

});

test('TC-ADD-02 Remove the mark @smoke', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    // Отметить задачу, снять отметку
    const inputTask = page.getByPlaceholder('What needs to be done?');

    await inputTask.fill('feed the cat');
    await inputTask.press('Enter');

    const task = page.getByTestId('todo-item');
    await task.getByRole('checkbox', { name: 'Toggle Todo' }).click();
    await task.getByRole('checkbox', { name: 'Toggle Todo' }).click();

    // Класс completed снят
    await expect(task).not.toHaveClass('completed');
    await expect(task.getByRole('checkbox', { name: 'Toggle Todo' })).not.toBeChecked();

});

test('TC-TOG-04 Mark all as complete @smoke', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    // Добавить 3 задачи, нажать «Mark all as complete»
    const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

    const inputTask = page.getByPlaceholder('What needs to be done?');

    for (const value of TODO_ITEMS) {
        await inputTask.fill(value);
        await inputTask.press('Enter');
    }

    await page.getByLabel('Mark all as complete').click();

    // Все 3 задачи выполнены, счётчик «0 items left»
    const task = page.getByTestId('todo-item');

    for (const li of await task.all()) {
        await expect(li).toHaveClass('completed');
        await expect(li.getByRole('checkbox', { name: 'Toggle Todo' })).toBeChecked();
    }

});