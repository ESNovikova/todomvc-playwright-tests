import { test, expect, TODO_ITEMS } from './fixtures/base-todo.ts';

test.describe('6.2 Добавление задач', () => {
    test('TC-ADD-01 Добавить одну задачу @smoke', async ({ todoPage }) => {
        //	Ввести «buy some cheese», нажать Enter
        await todoPage.addTodo(TODO_ITEMS[0]);

        // Задача появилась в списке, она не выполнена

        await expect(todoPage.todoItems).toHaveCount(1);
        await expect(todoPage.todoItems.getByTestId('todo-title')).toHaveText(TODO_ITEMS[0]);
        await expect(todoPage.todoItems).not.toContainClass('completed');
        await expect(todoPage.todoItems.getByRole('checkbox', { name: 'Toggle Todo' })).not.toBeChecked();
    });

    test('TC-ADD-02 Добавить несколько задач @smoke', async ({ todoPage, page }) => {
        // Добавить 3 задачи
        for (const value of TODO_ITEMS) {
            await todoPage.addTodo(value);
        }

        // Задачи отображаются в порядке добавления, новые идут в конец
        await expect(todoPage.todoItems).toHaveCount(TODO_ITEMS.length);
        await expect(todoPage.todoItems.getByTestId('todo-title')).toHaveText(TODO_ITEMS);

        await expect(todoPage.todoItems.and(page.locator('.completed'))).toHaveCount(0);
    });
});
