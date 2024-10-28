import {connection, server as WebSocketServer} from "websocket";
import http from 'http';
import { SupportMesasge } from "../src/messages/IncomingMessages";
import { IncomingMessages } from "../src/messages/IncomingMessages"
import { UserManager } from "./UserManager";
import { inMemoryStore } from "./Store/inMemoryStore";
import { OutgoingMessages, SupportMesasge as OutgoingSupportedMessage } from "./messages/OutgoingMessages";
const server = http.createServer(function(request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

const userManager = new UserManager();
const store = new inMemoryStore();

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin: string) {

    return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {

      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {

        //TODO: rate limitting logic here
        if (message.type === 'utf8') {
            try
            {
                messageHandler(connection,JSON.parse(message.utf8Data));
            }
            catch(e)
            {

            }
            // console.log('Received Message: ' + message.utf8Data);
            // connection.sendUTF(message.utf8Data);
        }

    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

function messageHandler(ws: connection, message: IncomingMessages){
    if(message.type == SupportMesasge.JoinRoom){
        const payload = message.payload;
        userManager.addUser(payload.name,payload.userId,payload.roomId,ws);

    }
    if(message.type === SupportMesasge.SendMessage)
    {
        const payload = message.payload;
        const user  = userManager.getUser(payload.roomId, payload.userId)
        if(!user){
            console.error("user not found!");
            return
        }
        let chat = store.addChat(payload.userId,user.name, payload.roomId, payload.message)
        // TODO: broadCast Logic
        if(!chat){
            return;
        }
        const OutgoingPayload: OutgoingMessages = {
            type: OutgoingSupportedMessage.Add_chat,
            payload:{
                chatId: chat.id,
                roomId:payload.roomId,
                message: payload.message,
                name:user.name,
                upvotes: 0
            }     
        }
        userManager.broadcast(payload.roomId,payload.userId,OutgoingPayload)
    }

    if(message.type === SupportMesasge.UpvoteMessage)
    {
        const payload = message.payload;
        store.Upvote(payload.userId, payload.roomId, payload.chatId);

        const OutgoingPayload: OutgoingMessages = {
            type: OutgoingSupportedMessage.Update_chat,
            payload:{
                chatId: payload.chatId,
                roomId:payload.roomId,
                upvotes: 0
            }            
        }
        userManager.broadcast(payload.roomId,payload.userId,OutgoingPayload)
    }
}