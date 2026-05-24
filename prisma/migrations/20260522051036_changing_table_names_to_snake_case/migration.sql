/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Share` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscriber` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_post_id_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_parent_reply_id_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ReplyLike" DROP CONSTRAINT "ReplyLike_reply_id_fkey";

-- DropForeignKey
ALTER TABLE "ReplyLike" DROP CONSTRAINT "ReplyLike_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Subscriber" DROP CONSTRAINT "Subscriber_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "Subscriber" DROP CONSTRAINT "Subscriber_subscriber_id_fkey";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "CommentLike";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostLike";

-- DropTable
DROP TABLE "Reply";

-- DropTable
DROP TABLE "ReplyLike";

-- DropTable
DROP TABLE "Share";

-- DropTable
DROP TABLE "Subscriber";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "kinde_id" TEXT NOT NULL,
    "email" TEXT,
    "full_name" TEXT,
    "phone_number" TEXT,
    "address" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "meta_tag" TEXT NOT NULL,
    "meta_keywords" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'DRAFT',
    "thumbnail" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "published_at" TIMESTAMP(3),
    "categories" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reply" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "parent_reply_id" TEXT,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post-like" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "post-like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment-like" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "comment-like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reply-like" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reply_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "reply-like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriber" (
    "id" TEXT NOT NULL,
    "subscriber_id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "share" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "share_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_kinde_id_key" ON "user"("kinde_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "post-like_user_id_post_id_key" ON "post-like"("user_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "comment-like_user_id_comment_id_key" ON "comment-like"("user_id", "comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "reply-like_user_id_reply_id_key" ON "reply-like"("user_id", "reply_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriber_subscriber_id_creator_id_key" ON "subscriber"("subscriber_id", "creator_id");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_parent_reply_id_fkey" FOREIGN KEY ("parent_reply_id") REFERENCES "reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post-like" ADD CONSTRAINT "post-like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post-like" ADD CONSTRAINT "post-like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment-like" ADD CONSTRAINT "comment-like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment-like" ADD CONSTRAINT "comment-like_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply-like" ADD CONSTRAINT "reply-like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply-like" ADD CONSTRAINT "reply-like_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "reply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriber" ADD CONSTRAINT "subscriber_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriber" ADD CONSTRAINT "subscriber_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "share" ADD CONSTRAINT "share_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "share" ADD CONSTRAINT "share_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
