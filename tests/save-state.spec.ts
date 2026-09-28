import { test, expect } from '@playwright/test';

test('TC-PER-01 Data is preserved after a reboot @smoke', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    // Добавить 2 задачи, отметить 1, перезагрузить страницу
    const TODO_ITEMS = ['buy some cheese', 'book a doctors appointment'];

    const inputTask = page.getByPlaceholder('What needs to be done?');

    for (const value of TODO_ITEMS) {
        await inputTask.fill(value);
        await inputTask.press('Enter');
    }

    const task = page.getByTestId('todo-item');
    const completedTask = TODO_ITEMS[1];
    await task.filter({ hasText: completedTask }).getByRole('checkbox', { name: 'Toggle Todo' }).click();
    
    await expect.poll(async () => {
         return await page.evaluate(([todo_items]) => {
            const localData = localStorage.getItem('react-todos');
            if (!localData) return false;
            
            const list = JSON.parse(localData);
            
            const item1 = list.find((i: any) => i.title === todo_items[0]);
            const item2 = list.find((i: any) => i.title === todo_items[1]);

            return list.length === todo_items.length && item1?.completed === false && item2?.completed === true;
        }, [TODO_ITEMS]);
    }, { timeout: 5000 }).toBe(true);

    await page.goto('https://demo.playwright.dev/todomvc');

    // Обе задачи на месте, статусы сохранены
    const taskReloadPage = page.getByTestId('todo-item');
    await expect(task).toHaveCount(TODO_ITEMS.length);
    await expect(task.getByTestId('todo-title')).toHaveText(TODO_ITEMS);

    await expect(task.filter({ hasText: completedTask })).toContainClass('completed');
    await expect(task.filter({ hasNotText: completedTask })).toHaveText(TODO_ITEMS[0]);
});

