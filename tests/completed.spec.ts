import { test, expect, TODO_ITEMS } from './fixtures/base-todo.ts';

test.describe('6.3 Отметка выполнения', () => {
    test('TC-TOG-01 Отметить задачу выполненной @smoke', async ({ todoPage }) => {
        // Добавить задачу, отметить чекбокс
        await todoPage.addTodo(TODO_ITEMS[0]);
        await todoPage.toggleTodo(TODO_ITEMS[0]);

        // У <li> появился класс completed, чекбокс отмечен
        await expect(todoPage.todoItems).toContainClass('completed');
        await expect(todoPage.todoToggle).toBeChecked();
    });

    test('TC-TOG-02 Снять отметку @smoke', async ({ todoPage }) => {
        // Отметить задачу, снять отметку
        await todoPage.addTodo(TODO_ITEMS[1]);
        await todoPage.toggleTodo(TODO_ITEMS[1]);
        await expect(todoPage.todoToggle).toBeChecked();
        await todoPage.toggleTodo(TODO_ITEMS[1]);

        // Класс completed снят
        await expect(todoPage.todoItems).not.toContainClass('completed');
        await expect(todoPage.todoToggle).not.toBeChecked();
    });

    test('TC-TOG-04 «Mark all as complete» @smoke', async ({ todoPageWithItems: todoPage }) => {
        // Добавить 3 задачи (сделано в фикстуре), нажать «Mark all as complete»
        await todoPage.todoMarkAllAsComplete.click();

        // Все 3 задачи выполнены, счётчик «0 items left»

        await expect(todoPage.todoItems).toHaveCount(TODO_ITEMS.length);
        for (const li of await todoPage.todoItems.all()) {
            await expect(li).toContainClass('completed');
            await expect(li.getByRole('checkbox', { name: 'Toggle Todo' })).toBeChecked();
        }

        await expect(todoPage.todoCount).toHaveText('0 items left');
    });
});
