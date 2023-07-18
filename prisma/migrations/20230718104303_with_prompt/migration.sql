-- CreateTable
CREATE TABLE "Prompt" (
    "id" SERIAL NOT NULL,
    "creatorId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
