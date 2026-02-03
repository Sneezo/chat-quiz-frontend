import type { Message } from "../types/game";
import { useEffect, useRef } from "react";

type Props = {
    messages: Message[];
}

export default function MessageList({ messages } : Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 80;

        if(isNearBottom) bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages])

    return (
        <div ref={containerRef} className="messages" style={{maxHeight:"80vh",minHeight:0,overflowY:"auto"}}>
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
            <div ref={bottomRef}/>
        </div>
    )
}