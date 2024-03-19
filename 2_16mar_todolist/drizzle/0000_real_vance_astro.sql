CREATE TABLE IF NOT EXISTS "tasks" (
	"taskID" serial PRIMARY KEY NOT NULL,
	"userID" uuid NOT NULL,
	"description" varchar NOT NULL,
	"checked" boolean DEFAULT false
);
