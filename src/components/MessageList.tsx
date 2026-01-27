import type { Message } from "../types/game";

export default function MessageList({ messages }:{ messages: Message[] }) {
    return (
        <div className="messages">
            {messages.map((m) => (
                <div key={m.id} className="message">
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <strong>{m.username}</strong>
                        <span>{new Date(m.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div>{m.content}</div>
                    {m.isCorrect && <div>✅ Correct Answer</div>}
                </div>
            ))}
        </div>
    )
}