import z from "zod";

export enum SupportMesasge{
    JoinRoom = "JOIN_ROOM",
    SendMessage = "SEND_MESSAGE",
    UpvoteMessage = "UPVOTE_MESSAGE"
}

export type IncomingMessages = {
    type: SupportMesasge.JoinRoom,
    payload: InitMessagetype
} | {
    type: SupportMesasge.SendMessage,
    payload: UserMessagetype
} | {
    type: SupportMesasge.UpvoteMessage,
    payload: UpvoteMessagetype
}

export const Initialized_message = z.object({
    name : z.string(),
    userId: z.string(),
    roomId: z.string()
})

export type InitMessagetype = z.infer<typeof Initialized_message>;

export const User_message = z.object({
    userId: z.string(),
    roomId: z.string(),
    message: z.string()
})

export type UserMessagetype = z.infer<typeof User_message>;


export const UpvoteMessage = z.object({
    chatId: z.string(),
    userId: z.string(),
    roomId: z.string()
})

export type UpvoteMessagetype = z.infer<typeof UpvoteMessage>;

