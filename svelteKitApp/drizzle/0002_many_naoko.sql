ALTER TABLE "user" ADD COLUMN "name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");