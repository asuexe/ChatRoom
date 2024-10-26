import { Chat,Store, UserId } from "./Store/Store";

export interface Room{
    roomId: string;
    chats: Chat[]

}
export class inMemoryStore implements Store{

    private store: Map<string,Room>;
    constructor()
    {
        this.store = new Map<string,Room>();
    }
    initRoom(roomId: string)
    {
        this.store.set(roomId, {
            roomId,
            chats: []
        });
    }
    getChat(roomId: string, limit: number, offset: number)
    {
        const room = this.store.get(roomId);
        if(!room){
            return []
        }
        return room.chats.reverse().slice(0, offset).slice(-1 * limit);

    }
    addChat(userId:UserId, roomId: string, limit: number, offset: number)
    {
        const room = this.store.get(roomId);
        if(!room){
            return 
        }
        return room.chats.push({
            userId,
            name:string;
            message: string;
            upvote: UserID;
        });
    }
    Upvote(room: string, chatId: string)
    {

    }
}