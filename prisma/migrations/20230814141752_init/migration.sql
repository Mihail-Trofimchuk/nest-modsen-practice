-- CreateTable
CREATE TABLE "meetup_tags" (
    "meetup_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "meetup_tags_pkey" PRIMARY KEY ("meetup_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "meetup_tags" ADD CONSTRAINT "meetup_tags_meetup_id_fkey" FOREIGN KEY ("meetup_id") REFERENCES "meetup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetup_tags" ADD CONSTRAINT "meetup_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
