import { test, expect, TODO_ITEMS } from './fixtures/base-todo.ts';

test.describe('6.8 Сохранение состояния', () => {
    test('TC-PER-01 Данные сохраняются после перезагрузки @smoke', async ({ todoPage, page }) => {
        // Добавить 2 задачи, отметить 1, перезагрузить страницу
        const TODO_ITEMS_MIN = TODO_ITEMS.slice(0, TODO_ITEMS.length - 1);
        for (const value of TODO_ITEMS_MIN) {
            await todoPage.addTodo(value);
        }

        const completedTask = TODO_ITEMS_MIN[1];
        await todoPage.toggleTodo(completedTask);

        await expect.poll(async () => {
            return await page.evaluate(([todo_items]) => {
                const localData = localStorage.getItem('react-todos');
                if (!localData) return false;

                const list = JSON.parse(localData);

                const item1 = list.find((i: any) => i.title === todo_items[0]);
                const item2 = list.find((i: any) => i.title === todo_items[1]);

                return list.length === todo_items.length && item1?.completed === false && item2?.completed === true;
            }, [TODO_ITEMS_MIN]);
        }, { timeout: 5000 }).toBe(true);

        await page.reload();

        // Обе задачи на месте, статусы сохранены
        await expect(todoPage.todoItems.filter({ hasText: TODO_ITEMS_MIN[0] })).not.toContainClass('completed');
        await expect(todoPage.todoItems).toHaveCount(TODO_ITEMS_MIN.length);
        await expect(todoPage.todoItems.getByTestId('todo-title')).toHaveText(TODO_ITEMS_MIN);

        await expect(todoPage.todoItems.filter({ hasText: completedTask })).toContainClass('completed');
        await expect(todoPage.todoItems.filter({ hasText: completedTask }).getByRole('checkbox', { name: 'Toggle Todo' })).toBeChecked();
    });
});
