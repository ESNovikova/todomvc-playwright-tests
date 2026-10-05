import { test, expect, TODO_ITEMS } from './fixtures/base-todo.ts';

test.describe('6.7 Фильтры и маршрутизация', () => {
    test('TC-FLT-01 Фильтр Active @smoke', async ({ todoPageWithItems: todoPage, page }) => {
        // 3 задачи (сделано в фикстуре), 2-я выполнена, нажать Active
        const completedTask = TODO_ITEMS[1];
        await todoPage.toggleTodo(completedTask);

        await page.getByRole('link', { name: 'Active' }).click();

        // Видны 1-я и 3-я задачи, URL `#/active`
        const ACTIVE_ITEMS = TODO_ITEMS.filter(element => element !== completedTask);

        await expect(todoPage.todoItems).toHaveCount(ACTIVE_ITEMS.length);
        await expect(todoPage.todoItems.getByTestId('todo-title')).toHaveText(ACTIVE_ITEMS);
        await expect(page).toHaveURL(/#\/active$/);
    });

    test('TC-FLT-02 Фильтр Completed @smoke', async ({ todoPageWithItems: todoPage, page }) => {
        // 3 задачи (сделано в фикстуре), 2-я выполнена, нажать Completed
        const completedTask = TODO_ITEMS[1];
        await todoPage.toggleTodo(completedTask);

        await page.getByRole('link', { name: 'Completed' }).click();

        // Видна только 2-я задача, URL `#/completed`

        await expect(todoPage.todoItems).toHaveCount(1);
        await expect(todoPage.todoItems.getByTestId('todo-title')).toHaveText(completedTask);
        await expect(page).toHaveURL(/#\/completed$/);
    });
});


