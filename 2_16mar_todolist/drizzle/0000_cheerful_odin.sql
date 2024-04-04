DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('jefe', 'encargado', 'programador');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chats" (
	"id" serial NOT NULL,
	"senderID" varchar NOT NULL,
	"receiverID" varchar NOT NULL,
	"message" text NOT NULL,
	"timestamp" timestamp with time zone NOT NULL,
	CONSTRAINT "chats_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"surname" varchar NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"email" varchar NOT NULL,
	"role" "role" NOT NULL,
	"department" varchar NOT NULL,
	"location" varchar NOT NULL,
	"pfp" varchar,
	CONSTRAINT "employees_id_unique" UNIQUE("id"),
	CONSTRAINT "employees_username_unique" UNIQUE("username"),
	CONSTRAINT "employees_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" serial NOT NULL,
	"creatorID" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"dueDate" timestamp NOT NULL,
	"participants" varchar[],
	"department" varchar,
	CONSTRAINT "events_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" serial NOT NULL,
	"creatorID" varchar NOT NULL,
	"name" varchar NOT NULL,
	"mime" varchar NOT NULL,
	"url" varchar NOT NULL,
	CONSTRAINT "files_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notes" (
	"id" serial NOT NULL,
	"creatorID" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"category" varchar,
	CONSTRAINT "notes_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial NOT NULL,
	"creatorID" varchar NOT NULL,
	"description" varchar NOT NULL,
	"checked" boolean DEFAULT false NOT NULL,
	CONSTRAINT "tasks_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userArea" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"surname" varchar,
	"email" varchar,
	"role" "role",
	"location" varchar,
	"pfp" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chats" ADD CONSTRAINT "chats_senderID_employees_id_fk" FOREIGN KEY ("senderID") REFERENCES "employees"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chats" ADD CONSTRAINT "chats_receiverID_employees_id_fk" FOREIGN KEY ("receiverID") REFERENCES "employees"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_creatorID_employees_id_fk" FOREIGN KEY ("creatorID") REFERENCES "employees"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_creatorID_employees_id_fk" FOREIGN KEY ("creatorID") REFERENCES "employees"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notes" ADD CONSTRAINT "notes_creatorID_employees_id_fk" FOREIGN KEY ("creatorID") REFERENCES "employees"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_employees_id_fk" FOREIGN KEY ("user_id") REFERENCES "employees"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_creatorID_employees_id_fk" FOREIGN KEY ("creatorID") REFERENCES "employees"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
