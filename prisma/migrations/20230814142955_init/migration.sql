/*
  Warnings:

  - You are about to drop the `_MeetupToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meetup_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MeetupToTag" DROP CONSTRAINT "_MeetupToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_MeetupToTag" DROP CONSTRAINT "_MeetupToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "meetup_tags" DROP CONSTRAINT "meetup_tags_meetup_id_fkey";

-- DropForeignKey
ALTER TABLE "meetup_tags" DROP CONSTRAINT "meetup_tags_tag_id_fkey";

-- DropTable
DROP TABLE "_MeetupToTag";

-- DropTable
DROP TABLE "meetup_tags";

-- CreateTable
CREATE TABLE "meetup_tag" (
    "meetup_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "meetup_tag_pkey" PRIMARY KEY ("meetup_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "meetup_tag" ADD CONSTRAINT "meetup_tag_meetup_id_fkey" FOREIGN KEY ("meetup_id") REFERENCES "meetup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetup_tag" ADD CONSTRAINT "meetup_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
