/*
  Warnings:

  - Added the required column `created_by` to the `meetup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meetup" ADD COLUMN     "created_by" INTEGER NOT NULL;
