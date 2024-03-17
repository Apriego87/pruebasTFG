CREATE TABLE IF NOT EXISTS "tasks" (
	"userID" uuid NOT NULL,
	"description" varchar NOT NULL,
	"checked" boolean DEFAULT false
);
