import { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "../types/events";
import type { Message, RoomSnapshot } from "../types/game";

type Status = "disconnected" | "connecting" | "connected" | "error";

const DEFAULT_URL = "http://localhost:3000";

export function useSocket(roomId: string, username: string) {
    const [ status, setStatus ] = useState<Status>("disconnected");
    const [ error, setError ] = useState<string | null>(null);
    const [ snapshot, setSnapshot ] = useState<RoomSnapshot | null>(null);
    const [ messages, setMessages ] = useState<Message[]>([]);

    const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

    const serverUrl = useMemo(() => {
        return import.meta.env.VITE_WS_URL ?? DEFAULT_URL;
    }, []);

    useEffect(() => {
        if(!roomId || !username) return;

        setStatus("connecting");
        setError(null);

        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(serverUrl, {
            transports: ["websocket"],
        });

        socketRef.current = socket;
        socket.on("connect", () => {
            setStatus("connected");
            socket.emit("room:join", { roomId, username });
        });

        socket.on("disconnect", () => {
        setStatus("disconnected");
        });

        socket.on("room:snapshot", (snap) => {
            setSnapshot(snap);
            setMessages(snap.messages);
        })

        socket.on("chat:message", (msg) => {
            setMessages((prev) => [...prev, msg])
        });

        return () => {
            socket.off();
            socket.disconnect();
            socketRef.current = null;
        };
    }, [roomId, username, serverUrl]);

    function sendMessage(content: string){
        const sock = socketRef.current;
        if(!sock || status !== "connected") return;
        sock.emit("chat:send", { roomId, content });
    }

    function submitQuestion(text: string, answer: string) {
        const sock = socketRef.current;
        if (!sock || status !== "connected") return;
        sock.emit("question:submit", { roomId, text, answer });
    }

    return {
        status,
        error,
        snapshot,
        messages,
        sendMessage,
        submitQuestion,
    }
}