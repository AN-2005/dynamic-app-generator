-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "collection" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);
