-- DropForeignKey
ALTER TABLE "meetup_tag" DROP CONSTRAINT "meetup_tag_meetup_id_fkey";

-- AddForeignKey
ALTER TABLE "meetup_tag" ADD CONSTRAINT "meetup_tag_meetup_id_fkey" FOREIGN KEY ("meetup_id") REFERENCES "meetup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
