import { test, expect } from '@playwright/test';

test('TC-CNT-03 Only active ones are counted @smoke', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    //  Добавить 3 задачи, отметить 1
    const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

    const inputTask = page.getByPlaceholder('What needs to be done?');

    for (const value of TODO_ITEMS) {
        await inputTask.fill(value);
        await inputTask.press('Enter');
    }

    const task = page.getByTestId('todo-item');
    await task.first().getByRole('checkbox', { name: 'Toggle Todo' }).click();

    // «2 items left»
    await expect(page.getByTestId('todo-count')).toHaveText('2 items left');
});
