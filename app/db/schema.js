import { integer, pgTable, varchar, serial, numeric } from "drizzle-orm/pg-core";

export const Expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount".notNull),
  budgetId: integer("budgetId").references(() => Budgets.id),
  createdBy: varchar("createdBy").notNull(),
});

export const Budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount ").notNull(),
  createdBy: varchar("createdBy ").notNull(),
});
