-- CreateTable
CREATE TABLE "meetup" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "meeting_time" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "meetup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MeetupToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MeetupToTag_AB_unique" ON "_MeetupToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MeetupToTag_B_index" ON "_MeetupToTag"("B");

-- AddForeignKey
ALTER TABLE "_MeetupToTag" ADD CONSTRAINT "_MeetupToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "meetup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetupToTag" ADD CONSTRAINT "_MeetupToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
