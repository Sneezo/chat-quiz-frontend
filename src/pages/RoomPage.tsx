import { useMemo, useState, useEffect, useRef } from "react";
import QuestionBanner from "../components/QuestionBanner";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import Scoreboard from "../components/Scoreboard";
import type { RoomSnapshot } from "../types/game";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import SubmitQuestion from "../components/SubmitQuestion";

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

    const { status, error, snapshot, messages, sendMessage, submitQuestion } = useSocket(roomId, username);

    const snap = snapshot ?? fallback(roomId, username);

    const winnerName = useMemo(() => {
        const w = snap.players.find((p) => p.userId === snap.winnerUserId);
        return w?.username;
    }, [snap.players, snap.winnerUserId]);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const prevStateRef = useRef(snap.state);

    useEffect(() => {
        const prev = prevStateRef.current;
        const next = snap.state;
        prevStateRef.current = next;
        if(prev !== "active" && next === "active") {
            inputRef.current?.focus();
        }
    },[snap.state]);

    return (
        <div className="app" style={{height:"95%"}}>
            <div className="main" style={{maxHeight:"95%"}}>
                <div>
                    Room: <strong>{snap.roomId}</strong> | Status: <strong>{status}</strong>
                    {error ? <span>{error}</span> : null}
                </div>
                <QuestionBanner state={snap.state} question={snap.question} winnerName={winnerName} nextRoundAt={snap.nextRoundAt} />
                <MessageList messages={messages} />
                <MessageInput ref={inputRef} onSend={sendMessage} disabled={snap.state !== "active"} />
            </div>
            <div className="sidebar">
                <Scoreboard players={snap.players} />
                <div style={{ marginTop: 12, fontSize: 12, opacity: 0.75 }}>
                    Queued questions: <strong>{snap.queuedQuestionCount ?? "—"}</strong>
                </div>
                <SubmitQuestion disabled={status !== "connected"} onSubmit={submitQuestion} />
            </div>
        </div>
    );
}