import { test, expect, TODO_ITEMS } from './fixtures/base-todo.ts';

test.describe('6.5 Удаление', () => {
    test('TC-DEL-02 Удаление задачи @smoke', async ({ todoPage }) => {
        // Навести курсор, нажать Delete
        for (const value of TODO_ITEMS) {
            await todoPage.addTodo(value);
        }

        await todoPage.removeTodo(TODO_ITEMS[1]);

        // Задача удалена, остальные на месте
        const REMAINING_ITEMS = TODO_ITEMS.filter(element => element !== TODO_ITEMS[1]);

        await expect(todoPage.todoItems).toHaveCount(REMAINING_ITEMS.length);
        await expect(todoPage.todoItems.getByTestId('todo-title')).toHaveText(REMAINING_ITEMS);
    });

    test('TC-DEL-05 «Clear completed» @smoke', async ({ todoPage }) => {
        // Добавить 3 задачи, отметить 2, нажать «Clear completed»
        for (const value of TODO_ITEMS) {
            await todoPage.addTodo(value);
        }

        await todoPage.toggleTodo(TODO_ITEMS[0]);
        await todoPage.toggleTodo(TODO_ITEMS[TODO_ITEMS.length - 1]);

        await todoPage.todoClearComplete.click();

        // Осталась 1 активная задача, кнопка скрылась
        await expect(todoPage.todoCount).toHaveText('1 item left');
        await expect(todoPage.todoClearComplete).toBeHidden();

        const REMAINING_ITEMS = TODO_ITEMS.slice(1, TODO_ITEMS.length - 1);
        await expect(todoPage.todoItems).toHaveCount(REMAINING_ITEMS.length);
        await expect(todoPage.todoItems.getByTestId('todo-title')).toHaveText(REMAINING_ITEMS);
    });
});
