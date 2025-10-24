-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE EXTENSION IF NOT EXISTS "citext";

-- Tables
CREATE TABLE
    "users" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid (),
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "name" TEXT,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "users_pkey" PRIMARY KEY ("id")
    );

CREATE TABLE
    "projects" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid (),
        "name" TEXT NOT NULL,
        "description" TEXT,
        "owner_id" UUID NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "projects_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "projects_name_not_blank" CHECK (btrim (name) <> '')
    );

CREATE TABLE
    "issues" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid (),
        "title" TEXT NOT NULL,
        "description" TEXT,
        "project_id" UUID NOT NULL,
        "author_id" UUID NOT NULL,
        "custom" JSONB NOT NULL DEFAULT '{}',
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "issues_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "issues_title_not_blank" CHECK (btrim (title) <> '')
    );

CREATE TABLE
    "comments" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid (),
        "content" TEXT NOT NULL,
        "issue_id" UUID NOT NULL,
        "author_id" UUID NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
    );

-- Indexes
CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");

CREATE INDEX "issues_custom_idx" ON "issues" USING GIN ("custom");

CREATE INDEX "issues_project_id_id_idx" ON "issues" ("project_id", "id");

CREATE INDEX "projects_owner_id_updated_at_idx" ON "projects" ("owner_id", "updated_at");

CREATE INDEX "issues_author_id_created_at_idx" ON "issues" ("author_id", "created_at");

CREATE INDEX "issues_project_id_updated_at_idx" ON "issues" ("project_id", "updated_at");

CREATE INDEX "comments_issue_id_created_at_idx" ON "comments" ("issue_id", "created_at");

CREATE INDEX "comments_author_id_idx" ON "comments" ("author_id");

-- Foreign Keys
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "issues" ADD CONSTRAINT "issues_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "issues" ADD CONSTRAINT "issues_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "comments" ADD CONSTRAINT "comments_issue_id_fkey" FOREIGN KEY ("issue_id") REFERENCES "issues" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;