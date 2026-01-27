import { useState } from "react";

type Props = {
    disabled?: boolean;
    onSend: (text: string) => void;
};

export default function MessageInput({ disabled, onSend }: Props) {
    const [text, setText] = useState("");

    function send() {
        const trimmed = text.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setText("");
    }

    return (
        <div className="inputRow">
            <input
                value = {text}
                disabled = {disabled}
                placeholder = {disabled ? "Round ended.." : "Type your answer..."}
                onChange = {(e) => setText(e.target.value)}
                onKeyDown = {(e) => e.key === "Enter" && send()}
            />
            <button onClick={send} disabled={disabled}>
                Send
            </button>
        </div>
    );
}