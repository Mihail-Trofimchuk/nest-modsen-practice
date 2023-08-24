/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Organizer');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL;

-- CreateTable
CREATE TABLE "user_meetup" (
    "user_id" INTEGER NOT NULL,
    "meetup_id" INTEGER NOT NULL,

    CONSTRAINT "user_meetup_pkey" PRIMARY KEY ("user_id","meetup_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "user_id" INTEGER NOT NULL,
    "refresh_token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_user_id_key" ON "sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user_meetup" ADD CONSTRAINT "user_meetup_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_meetup" ADD CONSTRAINT "user_meetup_meetup_id_fkey" FOREIGN KEY ("meetup_id") REFERENCES "meetup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
