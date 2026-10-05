import { test, expect, TODO_ITEMS } from './fixtures/base-todo.ts';

test.describe('6.4 Редактирование', () => {
    test('TC-EDIT-01 Вход в режим редактирования @smoke', async ({ todoPage }) => {
        // Двойной клик по задаче
        await todoPage.addTodo(TODO_ITEMS[0]);
        await todoPage.todoItems.dblclick();

        // У <li> класс editing, поле Edit видимо и содержит текущий текст
        await expect(todoPage.todoItems).toContainClass('editing');
        await expect(todoPage.todoEdit).toBeVisible();
        await expect(todoPage.todoEdit).toHaveValue(TODO_ITEMS[0]);
    });

    test('TC-EDIT-02 Сохранение по Enter @smoke', async ({ todoPage }) => {
        // Двойной клик → новый текст → Enter
        await todoPage.addTodo(TODO_ITEMS[0]);
        await todoPage.todoItems.dblclick();

        await todoPage.todoEdit.fill(TODO_ITEMS[1]);
        await todoPage.todoEdit.press('Enter');

        // Текст задачи обновлён, режим редактирования закрыт
        await expect(todoPage.todoItems).not.toContainClass('editing');
        await expect(todoPage.todoEdit).toBeHidden();
        await expect(todoPage.todoItems.getByTestId('todo-title')).toHaveText(TODO_ITEMS[1]);
    });
});
