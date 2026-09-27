import { test, expect } from '@playwright/test';

test('TC-EDIT-01 Enter edit mode @smoke', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    const inputTask = page.getByPlaceholder('What needs to be done?');

    await inputTask.fill('buy some cheese');
    await inputTask.press('Enter');

    // Двойной клик по задаче
    const task = page.getByTestId('todo-item');
    await task.dblclick();

    // У <li> класс editing, поле Edit видимо и содержит текущий текст
    await expect(task).toHaveClass('editing');
    await expect(task.getByRole('textbox', { name: 'Edit' })).toBeVisible();
    await expect(task.getByRole('textbox', { name: 'Edit' })).toHaveValue('buy some cheese');
});

test('TC-EDIT-02 Save on Enter @smoke', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    const inputTask = page.getByPlaceholder('What needs to be done?');

    await inputTask.fill('buy some cheese');
    await inputTask.press('Enter');

    // Двойной клик → новый текст → Enter
    const task = page.getByTestId('todo-item');
    await task.dblclick();
    await task.getByRole('textbox', { name: 'Edit' }).fill('feed the cat');
    await task.getByRole('textbox', { name: 'Edit' }).press('Enter');

    // Текст задачи обновлён, режим редактирования закрыт
    await expect(task).not.toHaveClass('editing');
    await expect(task.getByRole('textbox', { name: 'Edit' })).toBeHidden();
    await expect(task.getByTestId('todo-title')).toHaveText('feed the cat');
});