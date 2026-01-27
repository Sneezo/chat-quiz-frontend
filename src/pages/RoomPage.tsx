import { useMemo, useState } from "react";
import QuestionBanner from "../components/QuestionBanner";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import Scoreboard from "../components/Scoreboard";
import type { RoomSnapshot } from "../types/game";
import { useParams, useNavigate } from "react-router-dom";

const LS_USERNAME = "chatquiz.username";

function mockInitial(roomId: string, username: string): RoomSnapshot {
    return {
        roomId,
        state: "active",
        question: {id: "q1", text: "What is 2+3?"},
        winnerUserId: undefined,
        players: [
            { userId: "u1", username, points: 0 },
            { userId: "u2", username: "Ava", points: 2 },
            { userId: "u3", username: "Noah", points: 1 },
        ],
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


    const [snap, setSnap] = useState<RoomSnapshot>(() => mockInitial(roomId, username));

    const winnerName = useMemo(() => {
        const w = snap.players.find((p) => p.userId === snap.winnerUserId);
        return w?.username;
    }, [snap.players, snap.winnerUserId]);

    function onSend(text:string) {
        const msg = {
            id: crypto.randomUUID(),
            userId: "u1",
            username,
            content: text,
            timestamp: Date.now(),
            isCorrect: text.trim() === "5",
        }

        setSnap((prev) => ({
            ...prev,
            messages: [...prev.messages, msg],
            ...(msg.isCorrect && !prev.winnerUserId ? {
                winnerUserId: "u1",
                state: "finished" as const,
                players: prev.players.map((p) => p.userId === "u1" ? {...p, points: p.points + 1 } : p),
            } : {})
        }))
    }

    return (
        <div className="app">
            <div className="main">
                <QuestionBanner state={snap.state} question={snap.question} winnerName={winnerName} />
                <MessageList messages={snap.messages} />
                <MessageInput onSend={onSend} disabled={snap.state !== "active"} />
            </div>
            <div className="sidebar">
                <Scoreboard players={snap.players} />
            </div>
        </div>
    );
}