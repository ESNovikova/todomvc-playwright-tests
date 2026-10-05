import { test, expect } from './fixtures/base-todo.ts';

test.describe('6.1 Начальное состояние', () => {
    test('TC-INIT-01 Пустой список при первом открытии @smoke', async ({ todoPage, page }) => {
        // Заголовок «todos».
        await expect(page).toHaveTitle(/React • TodoMVC/);

        // Задач нет.
        await expect(todoPage.todoItems).toHaveCount(0);
        await expect(page.getByRole('heading', { name: 'todos' })).toHaveText('todos');
        // Блоки .main и .footer скрыты
        const mainAndFooter = page.locator('.main, .footer');
        await expect(mainAndFooter).toBeHidden();
    });
});
