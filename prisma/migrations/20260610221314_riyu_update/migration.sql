-- CreateTable
CREATE TABLE "Hanyu" (
    "id" TEXT NOT NULL,
    "hanzi" TEXT NOT NULL,
    "pinyin" TEXT NOT NULL,
    "xinbanya" TEXT NOT NULL,
    "riyu" TEXT,
    "tone" TEXT,
    "img" TEXT,
    "source" TEXT DEFAULT 'form-hanyu',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hanyu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hanyu_id_key" ON "Hanyu"("id");
