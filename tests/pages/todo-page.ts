import { Page, Locator } from '@playwright/test';

export class TodoPage {
    private readonly inputBox: Locator;
    public readonly todoItems: Locator;
    public readonly todoCount: Locator;
    public readonly todoClearComplete: Locator;
    public readonly todoMarkAllAsComplete: Locator;
    public readonly todoToggle: Locator;
    public readonly todoEdit: Locator;

    constructor(public readonly page: Page) {
        this.inputBox = this.page.getByPlaceholder('What needs to be done?');
        this.todoItems = this.page.getByTestId('todo-item');
        this.todoCount = this.page.getByTestId('todo-count');
        this.todoClearComplete = this.page.getByRole('button', { name: 'Clear completed' });
        this.todoMarkAllAsComplete = this.page.getByLabel('Mark all as complete');
        this.todoToggle = this.todoItems.getByRole('checkbox', { name: 'Toggle Todo' });
        this.todoEdit = this.todoItems.getByRole('textbox', { name: 'Edit' });
    }

    async goto() {
        await this.page.goto('/todomvc');
    }

    async addTodo(text: string) {
        await this.inputBox.fill(text);
        await this.inputBox.press('Enter');
    }

    async toggleTodo(text: string) {
        const completeItem = this.todoItems.filter({ hasText: text });
        await completeItem.getByRole('checkbox', { name: 'Toggle Todo' }).click();
    }

    async removeTodo(text: string) {
        const todo = this.todoItems.filter({ hasText: text });
        await todo.hover();
        await todo.getByLabel('Delete').click();

    }

    async removeAll() {
        while ((await this.todoItems.count()) > 0) {
            await this.todoItems.first().hover();
            await this.todoItems.getByLabel('Delete').first().click();
        }
    }
}
