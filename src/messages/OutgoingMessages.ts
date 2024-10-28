export enum SupportedMesasge{
    Addchat = "ADD_CHAT",
    Updatechat = "UPDATE_CHAT",
}

type MessagePayload = {
    roomId: string;
    message: string;
    name: string;
    upvotes: number;
    chatId: string;
}

export type OutgoingMessage = {
    type: SupportedMesasge.Addchat,
    payload: MessagePayload
} | {
    type: SupportedMesasge.Updatechat,
    payload: Partial<MessagePayload>
}