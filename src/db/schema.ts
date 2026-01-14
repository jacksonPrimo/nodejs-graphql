import { text, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7'
export const users = pgTable("users", {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const posts = pgTable("posts", {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 255 }).notNull().unique(),
  ownerId: text("owner_id")
    .references(()=>users.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});