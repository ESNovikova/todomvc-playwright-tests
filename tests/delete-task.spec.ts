import { test, expect } from '@playwright/test';

test('TC-DEL-02 Deleting the task @smoke', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

    const inputTask = page.getByPlaceholder('What needs to be done?');

    for (const value of TODO_ITEMS) {
        await inputTask.fill(value);
        await inputTask.press('Enter');
    }

    // Навести курсор, нажать Delete
    const task = page.getByTestId('todo-item').filter({ hasText: 'feed the cat' });
    await task.hover();
    await task.getByRole('button', { name: 'Delete' }).click();

    // Задача удалена, остальные на месте
    const TODO_DELETE_ITEMS = TODO_ITEMS.filter(function(element, index, array) {
        return (element  !== 'feed the cat');
    });

    const taskUndeleted = page.getByTestId('todo-item');
    await expect(taskUndeleted).toHaveCount(TODO_DELETE_ITEMS.length);

    await expect(taskUndeleted.getByTestId('todo-title')).toHaveText(TODO_DELETE_ITEMS);

});

test('TC-DEL-05 Clear completed @smoke', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    // Добавить 3 задачи, отметить 2, нажать «Clear completed»
    const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

    const inputTask = page.getByPlaceholder('What needs to be done?');

    for (const value of TODO_ITEMS) {
        await inputTask.fill(value);
        await inputTask.press('Enter');
    }

    const task = page.getByTestId('todo-item');
    await task.first().getByRole('checkbox', { name: 'Toggle Todo' }).click();
    await task.last().getByRole('checkbox', { name: 'Toggle Todo' }).click();
    await page.getByRole('button', { name: 'Clear completed' }).click();

    // Осталась 1 активная задача, кнопка скрылась
    await expect(page.getByTestId('todo-count')).toHaveText('1 item left');
    await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();

    const TODO_DELETE_ITEMS = TODO_ITEMS.slice(1, TODO_ITEMS.length-1);
    const taskUndeleted = page.getByTestId('todo-item');
    await expect(taskUndeleted).toHaveCount(TODO_DELETE_ITEMS.length);
    await expect(taskUndeleted.getByTestId('todo-title')).toHaveText(TODO_DELETE_ITEMS);
});
