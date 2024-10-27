export type UserId = string;

export interface Chat
{
    id: string;
    userId:UserId;
     name:string;
     message: string;
     upvote: UserId[];
}
export abstract class Store{
    constructor()
    {

    }
    initRoom(roomId: String)
    {

    }
    getChat(room: string, limit: number, offset: number)
    {

    }
    addChat(userId:UserId,name:string, roomId: string, message: string)
    {

    }
    Upvote(userId:UserId, room: string, chatId: string)
    {

    }
}