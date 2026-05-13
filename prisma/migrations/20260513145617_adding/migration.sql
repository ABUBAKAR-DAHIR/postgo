/*
  Warnings:

  - A unique constraint covering the columns `[user_id,comment_id]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,post_id]` on the table `PostLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,reply_id]` on the table `ReplyLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscriber_id,creator_id]` on the table `Subscriber` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "status" SET DEFAULT 'DRAFT',
ALTER COLUMN "thumbnail" DROP NOT NULL,
ALTER COLUMN "views" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_user_id_comment_id_key" ON "CommentLike"("user_id", "comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "PostLike_user_id_post_id_key" ON "PostLike"("user_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "ReplyLike_user_id_reply_id_key" ON "ReplyLike"("user_id", "reply_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_subscriber_id_creator_id_key" ON "Subscriber"("subscriber_id", "creator_id");
