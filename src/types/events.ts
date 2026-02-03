import type { Message, RoomSnapshot } from "./game";

export type ClientToServerEvents = {
    "room:join": (payload: {roomId: string; username: string}) => void;
    "chat:send": (payload: {roomId: string; content: string}) => void;
     "question:submit": (payload: { roomId: string; text: string; answers: string[] }) => void;
};

export type ServerToClientEvents = {
    "room:snapshot": (snapshot: RoomSnapshot) => void;
    "chat:message": (message: Message) => void;
    "room:error": (payload: {message: string}) => void;
    "question:queued": (payload: { roomId: string; count: number }) => void;
}