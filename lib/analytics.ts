import {sendGAEvent} from "@next/third-parties/google"
export const analytics = {
    register: () => {
        sendGAEvent("event", "user_registered")
    },

    login: () => {
        sendGAEvent("event", "user_logged_in")
    },

    logout: () => {
        sendGAEvent("event", "user_logged_out")
    },

    postCreated: (postLength: number) => {
        sendGAEvent("event" , "post_created", {
            post_length: postLength
        })
    },

    postCreationFailed: () => {
        sendGAEvent("event", "post_creation_failed")
    },

    postDeletedSuccess: () => {
        sendGAEvent("event" , "post_deleted_success")
    },
    
    postDeletedFailed: () => {
        sendGAEvent("event" , "post_deleted_failed")
    },

    postLiked: () => {
        sendGAEvent("event", "post_liked")
    },

    postUnliked: () => {
        sendGAEvent("event", "post_unliked")
    },

    postDisliked: () => {
        sendGAEvent("event", "post_disliked")
    },

    commentCreated: (commentLength: number) => {
        sendGAEvent("event" , "comment_created", {
            comment_length: commentLength
        })
    },

    commentDeleted: () => {
        sendGAEvent("event" , "comment_deleted")
    },

    commentLiked: () => {
        sendGAEvent("event", "comment_liked")
    },

    commentUnliked: () => {
        sendGAEvent("event", "comment_unliked")
    },

    commentDisliked: () => {
        sendGAEvent("event", "comment_disliked")
    },

    thumbnailUploaded: (fileSize: number) => {
        sendGAEvent("event", "thumbnail_uploaded", {
            file_size_bytes: fileSize
        })
    },

    thumbnailUploadFailed: () => {
        sendGAEvent("event", "thumbnail_upload_failed")
    },

    thumbnailDeleted: () => {
        sendGAEvent("event", "thumbnail_deleted")
    },

    thumbnailDeleteFailed: () => {
        sendGAEvent("event", "thumbnail_delete_failed")
    },

}