CREATE TABLE "posts" (
	"id" text PRIMARY KEY,
	"title" varchar(255) NOT NULL,
	"content" varchar(255) NOT NULL UNIQUE,
	"owner_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_owner_id_users_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id");