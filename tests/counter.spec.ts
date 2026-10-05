import { test, expect, TODO_ITEMS } from './fixtures/base-todo.ts';

test.describe('6.6 Счётчик', () => {
    test('TC-CNT-03 Считаются только активные @smoke', async ({ todoPage }) => {
        //  Добавить 3 задачи, отметить 1
        for (const value of TODO_ITEMS) {
            await todoPage.addTodo(value);
        }
        await expect(todoPage.todoCount).toHaveText('3 items left');
        await todoPage.toggleTodo(TODO_ITEMS[0]);

        // «2 items left»
        await expect(todoPage.todoCount).toHaveText('2 items left');
    });
});

