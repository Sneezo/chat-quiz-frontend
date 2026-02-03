import { useMemo, useState } from "react";

type Props = {
    disabled?: boolean;
    onSubmit: (text: string, answers: string[]) => void;
}

    
export default function SubmitQuestion({ disabled, onSubmit }: Props) {
    const [text, setText] = useState("");
    const [answers, setAnswers] = useState<string[]>([""]);

    const cleanedAnswers = useMemo(
        () => answers.map((a) => a.trim()).filter(Boolean),
        [answers]
    )

    function setAnswerAt(index: number, value: string){
        setAnswers((prev) => prev.map((a,i) => (i === index ? value : a)));
    }

    function addAnswerField() {
        setAnswers((prev) => [...prev, ""]);
    }

    function removeAnswerField(index: number) {
        setAnswers((prev) => {
            if(prev.length <= 1) return prev;
            return prev.filter((_,i) => i !== index);
        })
    }

    function submit() {
        const t = text.trim();
        const a = cleanedAnswers;
        if (!t || a.length === 0) return;
        onSubmit(t, a);
        setText("");
        setAnswers([""]);
    }

    return (
    <div className="card" style={{ marginTop: 12 }}>
        <h3 style={{ marginTop: 0 }}>Submit a question</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>Question</div>
            <input
            disabled={disabled}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. What is 9 * 9?"
            style={{ width: "100%" }}
            />
        </div>

        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Accepted answers</div>
            <button
                type="button"
                onClick={addAnswerField}
                disabled={disabled}
                title="Add another accepted answer"
                style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                border: "1px solid #ddd",
                background: "white",
                cursor: "pointer",
                lineHeight: "26px",
                padding: 0,
                }}
            >
                +
            </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {answers.map((value, i) => (
                <div key={i} style={{ display: "flex", gap: 8 }}>
                <input
                    disabled={disabled}
                    value={value}
                    onChange={(e) => setAnswerAt(i, e.target.value)}
                    placeholder={i === 0 ? "Primary answer (required)" : "Alternative answer"}
                    style={{ flex: 1 }}
                />
                <button
                    type="button"
                    onClick={() => removeAnswerField(i)}
                    disabled={disabled || answers.length <= 1}
                    title="Remove this answer"
                    style={{
                    width: 36,
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    background: "white",
                    cursor: answers.length <= 1 ? "not-allowed" : "pointer",
                    }}
                >
                    −
                </button>
                </div>
            ))}
            </div>

            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
            Tip: add common variations (case doesn’t matter).
            </div>
        </div>

        <button
            disabled={disabled || text.trim().length === 0 || cleanedAnswers.length === 0}
            onClick={submit}
        >
            Add to queue
        </button>
        </div>
    </div>
    );
}