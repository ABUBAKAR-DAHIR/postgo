/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_id]` on the table `comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `comment-like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[comment_id]` on the table `comment-like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `post-like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_id]` on the table `post-like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `reply` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[comment_id]` on the table `reply` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `reply-like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reply_id]` on the table `reply-like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `share` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_id]` on the table `share` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subscriber_id]` on the table `subscriber` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[creator_id]` on the table `subscriber` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "comment_user_id_key" ON "comment"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "comment_post_id_key" ON "comment"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "comment-like_user_id_key" ON "comment-like"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "comment-like_comment_id_key" ON "comment-like"("comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "post_user_id_key" ON "post"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "post-like_user_id_key" ON "post-like"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "post-like_post_id_key" ON "post-like"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "reply_user_id_key" ON "reply"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "reply_comment_id_key" ON "reply"("comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "reply-like_user_id_key" ON "reply-like"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "reply-like_reply_id_key" ON "reply-like"("reply_id");

-- CreateIndex
CREATE UNIQUE INDEX "share_user_id_key" ON "share"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "share_post_id_key" ON "share"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriber_subscriber_id_key" ON "subscriber"("subscriber_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriber_creator_id_key" ON "subscriber"("creator_id");
