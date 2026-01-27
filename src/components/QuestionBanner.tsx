import type { RoomState, Question } from "../types/game";

type Props = {
    state: RoomState;
    question: Question | null;
    winnerName?: string;
};

export default function QuestionBanner({ state, question, winnerName }: Props) {
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
                </div>
            )}
        </div>
    );
}