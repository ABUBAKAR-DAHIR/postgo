/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `CommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `CommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `CommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `metaDescription` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `metaKeywords` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `metaTag` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PostLike` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `PostLike` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `PostLike` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PostLike` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PostLike` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `parentReplyId` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ReplyLike` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `ReplyLike` table. All the data in the column will be lost.
  - You are about to drop the column `replyId` on the `ReplyLike` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ReplyLike` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ReplyLike` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Subscriber` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `Subscriber` table. All the data in the column will be lost.
  - You are about to drop the column `subscriberId` on the `Subscriber` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Subscriber` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `kindeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kinde_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `post_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_id` to the `CommentLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `CommentLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `CommentLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meta_description` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meta_keywords` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meta_tag` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `PostLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `PostLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `PostLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_id` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reply_id` to the `ReplyLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ReplyLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ReplyLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `Share` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Share` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Share` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator_id` to the `Subscriber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriber_id` to the `Subscriber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Subscriber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kinde_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_parentReplyId_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReplyLike" DROP CONSTRAINT "ReplyLike_replyId_fkey";

-- DropForeignKey
ALTER TABLE "ReplyLike" DROP CONSTRAINT "ReplyLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_postId_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subscriber" DROP CONSTRAINT "Subscriber_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Subscriber" DROP CONSTRAINT "Subscriber_subscriberId_fkey";

-- DropIndex
DROP INDEX "User_kindeId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "postId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CommentLike" DROP COLUMN "commentId",
DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "comment_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "metaDescription",
DROP COLUMN "metaKeywords",
DROP COLUMN "metaTag",
DROP COLUMN "publishedAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "meta_description" TEXT NOT NULL,
ADD COLUMN     "meta_keywords" TEXT NOT NULL,
ADD COLUMN     "meta_tag" TEXT NOT NULL,
ADD COLUMN     "published_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostLike" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "postId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "commentId",
DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "parentReplyId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "comment_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "parent_reply_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReplyLike" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "replyId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "reply_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Share" DROP COLUMN "createdAt",
DROP COLUMN "postId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscriber" DROP COLUMN "createdAt",
DROP COLUMN "creatorId",
DROP COLUMN "subscriberId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creator_id" TEXT NOT NULL,
ADD COLUMN     "subscriber_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "fullName",
DROP COLUMN "kindeId",
DROP COLUMN "phoneNumber",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "full_name" TEXT,
ADD COLUMN     "kinde_id" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_kinde_id_key" ON "User"("kinde_id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_parent_reply_id_fkey" FOREIGN KEY ("parent_reply_id") REFERENCES "Reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyLike" ADD CONSTRAINT "ReplyLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyLike" ADD CONSTRAINT "ReplyLike_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "Reply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
