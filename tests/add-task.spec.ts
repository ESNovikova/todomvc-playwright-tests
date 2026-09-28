import { test, expect } from '@playwright/test';

test('TC-ADD-01 Add one task @smoke', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    //	Ввести «buy some cheese», нажать Enter
    const inputTask = page.getByPlaceholder('What needs to be done?');

    await inputTask.fill('buy some cheese');
    await inputTask.press('Enter');

    // Задача появилась в списке, она не выполнена
    const task = page.getByTestId('todo-item');

    await expect(task).toHaveCount(1);
    await expect(task.getByTestId('todo-title')).toHaveText('buy some cheese');
    await expect(task).not.toHaveClass('completed');
});

test('TC-ADD-02 Add multiple tasks @smoke', async({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Добавить 3 задачи
    const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

    const inputTask = page.getByPlaceholder('What needs to be done?');

    for (const value of TODO_ITEMS) {
        await inputTask.fill(value);
        await inputTask.press('Enter');
    }

    // Задачи отображаются в порядке добавления, новые идут в конец
    const task = page.getByTestId('todo-item');
    await expect(task).toHaveCount(TODO_ITEMS.length);
    await expect(task.getByTestId('todo-title')).toHaveText(TODO_ITEMS);

    for (const li of await task.all()) {
        await expect(li).not.toContainClass('completed');
        await expect(li.getByRole('checkbox', { name: 'Toggle Todo' })).not.toBeChecked();
    }
});