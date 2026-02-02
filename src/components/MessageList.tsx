import type { Message } from "../types/game";

export default function MessageList({ messages }:{ messages: Message[] }) {
    return (
        <div className="messages">
            {messages.map((m) => {
                const isSystem = m.userId === "system";
                return(
                    <div key={m.id} className="message" style={isSystem?{opacity: 0.8, fontStyle: "italic", backgroundColor: "rgba(0,0,0,0.1)"}:undefined}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <strong>{m.username}</strong>
                            <span>{new Date(m.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div>{m.content}</div>
                        {m.isCorrect && <div style={{fontSize: 12, marginTop: 6}}>✅ Correct Answer</div>}
                </div>
                )
})}
        </div>
    )
}