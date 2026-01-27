import type { Player } from "../types/game";

export default function Scoreboard({ players }: { players: Player[] }) {
    const sorted = [...players].sort((a,b) => b.points - a.points);

    return (
        <div className="card">
            <h3>Scoreboard</h3>
            <ol>
                {sorted.map((p) => (
                    <li key={p.userId}>
                        {p.username} - <strong>{p.points}</strong>
                    </li>
                ))}
            </ol>
        </div>
    );
}