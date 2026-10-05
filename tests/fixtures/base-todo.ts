import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todo-page.ts';

export const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

export const test = base.extend<{ todoPage: TodoPage }>({
    todoPage: async ({ page }, use) => {
      const todoPage = new TodoPage(page);
      await todoPage.goto();
      await use(todoPage);
    }
});

export { expect } from '@playwright/test';
