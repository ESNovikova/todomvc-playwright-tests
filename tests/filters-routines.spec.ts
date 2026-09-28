import { test, expect } from '@playwright/test';

test('TC-FLT-01 Acive Filter @smoke', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    // 3 задачи, 2-я выполнена, нажать Active
    const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

    const inputTask = page.getByPlaceholder('What needs to be done?');

    for (const value of TODO_ITEMS) {
        await inputTask.fill(value);
        await inputTask.press('Enter');
    }

    const task = page.getByTestId('todo-item');
    const completedTask = TODO_ITEMS[1];
    await task.filter({ hasText: completedTask }).getByRole('checkbox', { name: 'Toggle Todo' }).click();
    
    await page.getByRole('link', { name: 'Active' }).click();

    // Видны 1-я и 3-я задачи, URL `#/active`
    const TODO_ACTIVE_ITEMS = TODO_ITEMS.filter(function(element, index, array) {
        return (element  !== completedTask);
    });

    const activeTask = page.getByTestId('todo-item');
    await expect(activeTask).toHaveCount(TODO_ACTIVE_ITEMS.length);
    await expect(activeTask.getByTestId('todo-title')).toHaveText(TODO_ACTIVE_ITEMS);
    await expect(page).toHaveURL(/#\/active/);
});

test('TC-FLT-02 Completed Filter @smoke', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    // 3 задачи, 2-я выполнена, нажать Completed
    const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

    const inputTask = page.getByPlaceholder('What needs to be done?');

    for (const value of TODO_ITEMS) {
        await inputTask.fill(value);
        await inputTask.press('Enter');
    }

    const task = page.getByTestId('todo-item');
    const completedTask = TODO_ITEMS[1];
    await task.filter({ hasText: completedTask }).getByRole('checkbox', { name: 'Toggle Todo' }).click();
    
    await page.getByRole('link', { name: 'Completed' }).click();

    // Видна только 2-я задача, URL `#/completed`
    const TODO_COMPLETE_ITEMS = TODO_ITEMS.filter(function(element, index, array) {
        return (element === completedTask);
    });

    const activeTask = page.getByTestId('todo-item');
    await expect(activeTask).toHaveCount(TODO_COMPLETE_ITEMS.length);
    await expect(activeTask.getByTestId('todo-title')).toHaveText(TODO_COMPLETE_ITEMS);
    await expect(page).toHaveURL(/#\/completed/);
});


