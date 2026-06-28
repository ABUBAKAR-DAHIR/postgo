-- DropIndex
DROP INDEX "comment_post_id_key";

-- DropIndex
DROP INDEX "comment_user_id_key";

-- DropIndex
DROP INDEX "comment-like_comment_id_key";

-- DropIndex
DROP INDEX "comment-like_user_id_key";

-- DropIndex
DROP INDEX "post_user_id_key";

-- DropIndex
DROP INDEX "post-like_post_id_key";

-- DropIndex
DROP INDEX "post-like_user_id_key";

-- DropIndex
DROP INDEX "reply_comment_id_key";

-- DropIndex
DROP INDEX "reply_user_id_key";

-- DropIndex
DROP INDEX "reply-like_reply_id_key";

-- DropIndex
DROP INDEX "reply-like_user_id_key";

-- DropIndex
DROP INDEX "share_post_id_key";

-- DropIndex
DROP INDEX "share_user_id_key";

-- DropIndex
DROP INDEX "subscriber_creator_id_key";

-- DropIndex
DROP INDEX "subscriber_subscriber_id_key";

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "trashed_at" TIMESTAMP(3);
