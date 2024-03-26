DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('jefe', 'encargado', 'programador');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"taskID" serial PRIMARY KEY NOT NULL,
	"userID" varchar NOT NULL,
	"description" varchar NOT NULL,
	"checked" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userArea" (
	"id" serial NOT NULL,
	"name" varchar,
	"surname" varchar,
	"email" varchar,
	"role" "role",
	"location" varchar,
	"pfp" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"username" varchar NOT NULL,
	"hashed_password" text NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
