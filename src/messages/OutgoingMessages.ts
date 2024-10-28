export enum SupportMesasge{
    Add_chat = "ADD_CHAT",
    Update_chat = "UPDATE_CHAT",
}

type MessagePayload = {
    payload: {
        roomId: string;
        message: string;
        name: string;
        upvotes: number;
        chatId: string;
    }
}

export type OutgoingMessages = {
    type: SupportMesasge.Add_chat,
    payload: MessagePayload
} | {
    type: SupportMesasge.Update_chat,
    payload: Partial<MessagePayload>
}