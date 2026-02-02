import type { RoomState, Question } from "../types/game";
import { useEffect, useState } from "react";

type Props = {
    state: RoomState;
    question: Question | null;
    winnerName?: string;
    nextRoundAt?: number;
};

export default function QuestionBanner({ state, question, winnerName, nextRoundAt }: Props) {
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        if(state !== "finished" || !nextRoundAt) return;
        const id = window.setInterval(() => setNow(Date.now()), 200);
        return () => window.clearInterval(id);
    }, [state, nextRoundAt]);

    const secsLeft = 
        state === "finished" && nextRoundAt
            ? Math.max(0,Math.ceil((nextRoundAt - now) / 1000))
            : null;

    return (
        <div className="question">
            {state === "waiting" && <div>Waiting for the next question...</div>}

            {state === "active" && (
                <>
                <div>Question</div>
                <div>{question?.text ?? "-"}</div>
                </>
            )}

            {state === "finished" && (
                <div>
                    Round finished {" "}
                    {winnerName ? (
                        <strong>{winnerName} got it first!</strong>
                    ) : (
                        "No winner"
                    )}
                    {secsLeft !== null ? (
                        <div>Next round in {secsLeft} seconds</div>
                    ) : null}
                </div>
            )}
        </div>
    );
}