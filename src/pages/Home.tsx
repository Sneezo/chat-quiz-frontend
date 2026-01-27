import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LS_USERNAME = "chatquiz.username";

export default function Home(){
    const navigate = useNavigate();
    const [username, setUsername] = useState(() => localStorage.getItem(LS_USERNAME) ?? "");
    const [roomId, setRoomId] = useState("demo");

    function join(e: React.FormEvent) {
        e.preventDefault();
        const u = username.trim();
        const r = roomId.trim();
        if(!u || !r) return;

        localStorage.setItem(LS_USERNAME, u);
        navigate(`/room/${encodeURIComponent(r)}`);
    }

    return (
        <div>
            <div className="card">
                <h2>Join a Room</h2>
                <form onSubmit={join}>
                    <label>
                        Username
                        <input 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. veblix"
                        />
                    </label>
                    <label>
                        Room ID
                        <input 
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            placeholder="e.g. general"
                        />
                    </label>
                    <button type="submit" >Join</button>
                </form>
            </div>
        </div>
    )
}
