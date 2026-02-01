import { useMemo, useState } from "react";
import QuestionBanner from "../components/QuestionBanner";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import Scoreboard from "../components/Scoreboard";
import type { RoomSnapshot } from "../types/game";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";

const LS_USERNAME = "chatquiz.username";



function fallback(roomId: string, username: string): RoomSnapshot {
    return {
        roomId,
        state: "waiting",
        question: null,
        players: [{ userId: "local", username, points: 0 }],
        messages: [],
    }
}

export default function RoomPage() {
    const { roomId: roomIdParam } = useParams();
    const navigate = useNavigate();

    const roomId = roomIdParam ?? "demo";
    const username = localStorage.getItem(LS_USERNAME) ?? "";
    if(!username) {
        navigate("/");
        return null;
    }

    const { status, error, snapshot, messages, sendMessage } = useSocket(roomId, username);

    const snap = snapshot ?? fallback(roomId, username);

    const winnerName = useMemo(() => {
        const w = snap.players.find((p) => p.userId === snap.winnerUserId);
        return w?.username;
    }, [snap.players, snap.winnerUserId]);


    return (
        <div className="app">
            <div className="main">
                <div>
                    Room: <strong>{snap.roomId}</strong> | Status: <strong>{status}</strong>
                    {error ? <span>{error}</span> : null}
                </div>
                <QuestionBanner state={snap.state} question={snap.question} winnerName={winnerName} nextRoundAt={snap.nextRoundAt} />
                <MessageList messages={messages} />
                <MessageInput onSend={sendMessage} disabled={snap.state !== "active"} />
            </div>
            <div className="sidebar">
                <Scoreboard players={snap.players} />
            </div>
        </div>
    );
}