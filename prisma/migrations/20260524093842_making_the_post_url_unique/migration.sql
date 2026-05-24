/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "post_url_key" ON "post"("url");
