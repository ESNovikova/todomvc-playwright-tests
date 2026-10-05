import { test as base, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo-page.ts';

export const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

type TodoFixtures = {
    todoPage: TodoPage;
    todoPageWithItems: TodoPage;
}

export const test = base.extend<TodoFixtures>({
    todoPage: async ({ page }, use) => {
      const todoPage = new TodoPage(page);
      await todoPage.goto();
      await use(todoPage);
    },

    todoPageWithItems: async ({ todoPage }, use) => {
      for (const value of TODO_ITEMS) {
        await todoPage.addTodo(value);
      }
      await expect(todoPage.todoItems).toHaveCount(TODO_ITEMS.length);
      await use(todoPage);
    }
});

export { expect } from '@playwright/test';
